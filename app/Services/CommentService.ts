import BadRequestException from 'App/Exceptions/BadRequestException'
import NotFoundException from 'App/Exceptions/NotFoundException'
import Comment from 'App/Models/Comment'

export interface IComments {
  id?: string
  projectId?: string
  taskId?: string
  userId: string
  comment: string
}

class CommentService {
  public async store(body: IComments) {
    if (body.projectId && body.taskId) {
      throw new BadRequestException(
        'Deve passar o id do projeto ou da task, não pode passar os dois',
        400,
        'BAD_REQUEST'
      )
    }

    const data = {
      projectId: body?.projectId ?? undefined,
      taskId: body?.taskId ?? undefined,
      comment: body.comment,
      userId: body.userId,
    }

    const { id } = await Comment.create(data)
    return id
  }

  public async index(id: string, type: 'project' | 'task') {
    const query = Comment.query()

    if (!id || !type) {
      throw new NotFoundException('Comentarios não encontrado.', 404, 'NOT_FOUND')
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
        ...comment.toJSON(),
        createdAt: comment.createdAt.toFormat('dd/MM/yyyy HH:mm'),
      }
    })
  }

  public async update(body: IComments) {
    const comment = await Comment.findByOrFail('id', body.id)

    comment.merge(body)
    await comment.save()
  }

  public async delete(id: string) {
    const comment = await Comment.findByOrFail('id', id)
    await comment.delete()
  }
}

export default new CommentService()
