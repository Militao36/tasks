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
}
class tasksService {
  public async store(body: ITasks) {
    const data = {
      title: body.title,
      branch: body.branch,
      description: body.description,
      userId: body.userId,
      projectId: body.projectId,
      listId: body.listId,
    }
    const { id } = await Task.create(data)
    return id
  }

  public async update(body: ITasks, idTask: string) {
    const data = {
      title: body.title,
      branch: body.branch,
      description: body.description,
      userId: body.userId,
      projectId: body.projectId,
      listId: body.listId,
    }
    if (data.title) {
      const titleAlreadyInUse = await Task.findBy('title', data.title)

      if (titleAlreadyInUse?.id && titleAlreadyInUse?.id !== idTask) {
        return {
          message: 'Esse titulo já está em uso.',
        }
      }
    }
    const task = await Task.findOrFail(idTask)

    task.merge(data)

    await task.save()
    return
  }

  public async show(idTask: string) {
    const data = await Task.query()
      .select(['id', 'title', 'description', 'start_date', 'end_date', 'user_id'])
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
  public async
}

export default new tasksService()
