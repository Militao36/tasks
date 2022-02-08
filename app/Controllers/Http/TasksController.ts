import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

export default class TasksController {
  public async index({}: HttpContextContract) {
    const data = await Task.query()
      .select(['id', 'title', 'description', 'startDate', 'endDate'])
      .preload('labels', (query) => {
        query.select(['id', 'name', 'color'])
      })

    return data
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
