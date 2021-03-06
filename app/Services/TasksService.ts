import AlredyExistsExeptionException from 'App/Exceptions/AlredyExistsExeptionException'
import Task from 'App/Models/Task'

export interface ITasks {
  id?: string
  title?: string
  branch?: string
  description?: string
  userId?: string
  projectId?: string
  listId?: string
  startDate?: string
  endDate?: string
  deliveryDate?: string
}

class TaskService {
  public async store(body: ITasks) {
    const data = {
      title: body.title,
      branch: body.branch,
      description: body.description,
      userId: body.userId || null,
      projectId: body.projectId,
      listId: body.listId,
    }

    const titleAlreadyInUse = await Task.findBy('title', data.title)

    if (titleAlreadyInUse?.id) {
      throw new AlredyExistsExeptionException('Esse titulo já está em uso.', 400)
    }

    const { id } = await Task.create(data as any)
    return id
  }

  public async update(body: ITasks, idTask: string) {
    if (body.title) {
      const titleAlreadyInUse = await Task.findBy('title', body.title)

      if (titleAlreadyInUse?.id && titleAlreadyInUse?.id !== idTask) {
        throw new AlredyExistsExeptionException('Esse titulo já está em uso.', 400)
      }
    }
    const task = await Task.findOrFail(idTask)

    task.merge({
      ...body,
      deliveryDate: body.deliveryDate || null,
    })

    await task.save()
    return
  }

  public async show(idTask: string) {
    const data = await Task.query()
      .select([
        'id',
        'title',
        'branch',
        'description',
        'start_date',
        'end_date',
        'user_id',
        'delivery_date',
        'list_id',
      ])
      .preload('labels', (query) => query.select(['id', 'name', 'color']))
      .preload('user', (query) => query.select(['id', 'username']))
      .preload('comments', (query) =>
        query
          .select('comment', 'user_id', 'created_at')
          .orderBy('created_at', 'asc')
          .preload('user', (query) => query.select('id', 'username'))
      )
      .where('id', '=', idTask)
      .first()

    return data
  }

  public async tasks(status: string) {
    const query = Task.query()
      .select(['id', 'title', 'description', 'start_date', 'end_date', 'user_id'])
      .preload('user', (query) => query.select(['username']))

    switch (status) {
      case 'in-progress':
        query.whereNotNull('start_date').andWhereNull('end_date')
        break
      default:
        query.whereNotNull('start_date').andWhereNull('end_date')
    }
    return await query
  }

  public async updatedTaskMoveForList(body: ITasks, idTask: string) {
    const task = await Task.findByOrFail('id', idTask)
    await task.load('list')

    task.merge({
      listId: body.listId,
    })

    await task.save()
  }
}

export default new TaskService()
