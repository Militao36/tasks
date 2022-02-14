import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
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
      .select(['id', 'title', 'description', 'start_date', 'end_date', 'user_id'])
      .preload('user', (query) => {
        query.select(['id', 'username', 'email'])
      })
      .preload('labels', (query) => {
        query.select(['id', 'name', 'color'])
      })
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
      .select(['id', 'title', 'description', 'start_date', 'end_date', 'user_id'])
      .preload('labels', (query) => query.select(['id', 'name', 'color']))
      .preload('comments', (query) => query.select('comment').preload('user'))
      .where('id', '=', id)
      .first()

    return data
  }

  public async create({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
