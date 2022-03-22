import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import { DateTime } from 'luxon'
import { MessagesResponses } from '../../../utils/messages/MessagesResponse'

export default class TasksController {
  public async index({ request, response }: HttpContextContract) {
    const { projectId } = request.qs()

    if (!projectId) {
      return response.notFound({
        message: MessagesResponses.NOT_FOUND,
      })
    }

    const data = await Task.query()
      .select(['id', 'title', 'description', 'start_date', 'end_date', 'user_id', 'listId'])
      .preload('user', (query) => query.select(['id', 'username', 'email']))
      .preload('labels', (query) => query.select(['id', 'name', 'color']))
      .where('project_id', '=', projectId)

    return data
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['title', 'branch', 'description', 'userId', 'projectId', 'listId'])

    const { id } = await Task.create(data)

    return response.status(201).json({ id })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { id } = params

    const data = request.only(['title', 'branch', 'description', 'userId', 'projectId', 'startDate', 'endDate'])

    const titleAlreadyInUse = await Task.findBy('title', data.title)

    if (titleAlreadyInUse?.id && titleAlreadyInUse?.id !== id) {
      return response.status(422).json({
        message: 'Esse titulo já está em uso.',
      })
    }

    const task = await Task.findOrFail(id)
    
    task.merge(data)

    await task.save()

    return response.status(204).json({})
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params

    const data = await Task.query()
      .select([
        'id',
        'title',
        'description',
        'delivery_date',
        'end_date',
        'user_id',
        'branch',
        'delivery_date',
      ])
      .preload('labels', (query) => query.select(['id', 'name', 'color']))
      .preload('user', (query) => query.select(['id', 'username']))
      .preload('comments', (query) =>
        query
          .select('comment', 'user_id', 'created_at')
          .orderBy('created_at', 'asc')
          .preload('user', (query) => query.select('id', 'username'))
      )
      .where('id', '=', id)
      .first()

    if (!data) {
      return response.notFound()
    }

    return data
  }

  public async tasks({ params }: HttpContextContract) {
    const { status = 'in-progress' } = params

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

    const tasks = await query
    return tasks.map((task) => {
      return {
        ...task.serialize(),
        start_date: DateTime.fromJSDate(task.startDate as any).toFormat('dd/MM/yyyy HH:mm'),
      }
    })
  }

  public async updatedTaskMoveForList({ request }: HttpContextContract) {
    const data = request.only(['listId', 'taskId', 'type'])

    const task = await Task.findByOrFail('id', data.taskId)
    await task.load('list')

    task.merge({
      listId: data.listId,
    })

    await task.save()
  }

  public async create({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
