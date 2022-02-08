import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'
import ProjectUser from 'App/Models/ProjectUser'

export default class ProjectsController {
  public async index({}: HttpContextContract) {
    const data = await Project.query()
      .select(['id', 'title', 'description', 'startDate', 'endDate'])
      .preload('users', (query) => {
        query.select(['id', 'username'])
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

  public async store({ request }: HttpContextContract) {
    const data = request.only(['title', 'description', 'users'])

    const project = new Project()

    project.fill({
      title: data.title,
      description: data.description,
    })

    await project.save()

    const { id } = await Project.findByOrFail('title', data.title)

    const users = data.users?.map((userId: string) => {
      return {
        userId,
        projectId: id,
      }
    })

    await ProjectUser.createMany(users)

    return id
  }

  public async create({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
