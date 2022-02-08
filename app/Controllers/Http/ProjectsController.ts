import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'

export default class ProjectsController {
  public async index({}: HttpContextContract) {
    const data = await Project.query()
      .select(['id', 'title', 'description', 'startDate', 'endDate'])
      .preload('users', (query) => {
        query.select(['id', 'username'])
      })
      .preload('tasks', (query) => {
        query.select(['id', 'title', 'branch', 'description', 'startDate', 'endDate'])
      })

    return data
  }

  public async show({ params }: HttpContextContract) {
    const project = await Project.findByOrFail('id', params.id)

    await project.load('users', (query) => {
      query.select(['id', 'username'])
    })

    return project
  }

  public async store({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
