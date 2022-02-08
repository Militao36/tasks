import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

export default class TasksController {
  public async index({ request }: HttpContextContract) {
    const { projectId } = request.qs()

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

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const data = request.only([
      'title',
      'branch',
      'description',
      'userId',
      'projectId',
      'startDate',
      'endDate',
    ])

    await Task.create(data)

    return response.status(201).json({})
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
