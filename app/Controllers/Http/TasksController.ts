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
      .preload('labels', (query) => {
        query.select(['id', 'name', 'color'])
      })
      .preload('list', (query) => query.select(['id', 'title']))
      .where('project_id', '=', projectId)

    return data
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only([
      'title',
      'branch',
      'description',
      'user_id',
      'project_id',
      'start_date',
      'end_date',
      'time_days',
    ])

    const { id } = await Task.create(data)

    return response.status(201).json({ id })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { id } = params

    const data = request.only([
      'title',
      'branch',
      'description',
      'user_id',
      'project_id',
      'start_date',
      'end_date',
      'time_days',
    ])

    const titleAlreadyInUse = await Task.findBy('title', data.title)

    if (titleAlreadyInUse?.id && titleAlreadyInUse?.id !== id) {
      return response.status(422).json({
        message: 'Esse titulo já está em uso.',
      })
    }

    const task = await Task.findOrFail(id)

    task.merge({
      ...data,
    })

    await task.save()

    return response.status(204).json({})
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params

    const data = await Task.query()
      .select(['id', 'title', 'description', 'start_date', 'end_date', 'time_days', 'user_id'])
      .preload('labels', (query) => query.select(['id', 'name', 'color']))
      .preload('comments', (query) =>
        query
          .select('comment', 'user_id', 'created_at')
          .orderBy('created_at', 'asc')
          .preload('user', (query) => query.select('id', 'username'))
      )
      .where('id', '=', id)
      .first()

    return data
  }

  public async tasks({ params }: HttpContextContract) {
    const { status = 'in-progress' } = params

    const query = Task.query()
      .select(['id', 'title', 'description', 'start_date', 'end_date', 'time_days', 'user_id'])
      .preload('user', (query) => query.select(['username']))

    switch (status) {
      case 'in-progress':
        query.whereNotNull('start_date').andWhereNull('end_date')
        break
      default:
        query.whereNotNull('start_date').andWhereNull('end_date')
    }

    console.log(query.toQuery())
    const tasks = await query
    return tasks.map((task) => {
      return {
        ...task.serialize(),
        start_date: DateTime.fromJSDate(task.startDate as any).toFormat('dd/MM/yyyy HH:mm'),
      }
    })
  }

  public async create({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
