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
      query
        .where('project_id', '=', id)
        .preload('user', (query) => query.select(['id', 'username']))
    }

    if (type === 'task') {
      query.where('task_id', '=', id).preload('user', (query) => query.select(['id', 'username']))
    }

    const comments = await query.select().orderBy('created_at', 'asc')

    return comments.map((comment) => {
      return {
        ...comment.serialize(),
        created_at: comment.createdAt.toFormat('dd/MM/yyyy HH:mm'),
      }
    })
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['project_id', 'task_id', 'comment', 'user_id'])

    if (data.project_id && data.task_id) {
      return response.badRequest()
    }

    const comment = new Comment()

    comment.fill({
      projectId: data?.project_id ?? null,
      taskId: data?.task_id ?? null,
      comment: data.comment,
      userId: data.user_id,
    })

    await comment.save()

    return response.status(201).json({ id: comment.id })
  }
}
