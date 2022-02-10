import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'

export default class CommentsController {
  public async index({ response, request }: HttpContextContract) {
    const { type, id } = request.qs() as { type: 'project' | 'task'; id: string }

    const query = Comment.query()

    if (!id || !type) {
      return response.notFound()
    }

    if (type === 'project') {
      query.where('project_id', '=', id)
    }

    if (type === 'task') {
      query.where('task_id', '=', id)
    }

    const comments = await query.select().orderBy('created_at', 'asc')

    return response.status(200).json(comments)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['projectId', 'taskId', 'comment'])

    if (data.projectId && data.taskId) {
      return response.badRequest()
    }

    const comment = new Comment()

    comment.fill({
      projectId: data?.projectId,
      taskId: data?.taskId,
      comment: data.comment,
    })

    await comment.save()

    return response.status(201).json({ id: comment.id })
  }
}
