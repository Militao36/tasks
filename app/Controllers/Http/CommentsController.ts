import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CommentService from 'App/Services/CommentService'

export default class CommentsController {
  private commentService: typeof CommentService

  constructor() {
    this.commentService = CommentService
  }

  public async index({ response, request }: HttpContextContract) {
    const { type, id } = request.qs()
    const comments = await this.commentService.index(id, type)

    return response.status(200).json(comments)
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const data = request.only(['projectId', 'taskId', 'comment'])

    const id = await this.commentService.store(
      {
        projectId: data.projectId,
        taskId: data.taskId,
        comment: data.comment,
      },
      auth.user!
    )
    return response.status(201).json({ id })
  }

  public async update({ request, response, params, auth }: HttpContextContract) {
    const { id } = params
    const data = request.only(['projectId', 'taskId', 'comment', 'userId'])

    await this.commentService.update(
      {
        id,
        projectId: data.projectId,
        taskId: data.taskId,
        comment: data.comment,
      },
      auth.user!
    )

    return response.noContent()
  }

  public async delete({ response, params }: HttpContextContract) {
    const { id } = params

    await this.commentService.delete(id)
    return response.noContent()
  }
}
