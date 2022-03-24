import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProjectService, { Status } from 'App/Services/ProjectService'
import ProjectUsersService from 'App/Services/ProjectUsersService'

export default class ProjectsController {
  private projectService: typeof ProjectService
  private projectUsersService: typeof ProjectUsersService

  constructor() {
    this.projectService = ProjectService
    this.projectUsersService = ProjectUsersService
  }

  public async index({}: HttpContextContract) {
    const data = await this.projectService.index()
    return data
  }

  public async show({ params }: HttpContextContract) {
    const project = await this.projectService.show(params.id)

    return project
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['title', 'description', 'deliveryDate', 'users'])

    const id = await this.projectService.create({
      title: data.title,
      description: data.description,
      status: Status.draft,
      deliveryDate: data.deliveryDate,
    })

    await this.projectUsersService.create(id, data.users)

    return id
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { id } = params
    const data = request.only([
      'title',
      'description',
      'deliveryDate',
      'status',
      'users',
      'startDate',
      'endDate',
      'expectedDate',
    ])

    await this.projectService.update({
      id,
      ...data,
    })

    await this.projectUsersService.create(id, data.users)

    return response.noContent()
  }

  public async removeUserOfProject({ params, response }: HttpContextContract) {
    const { projectId, userId } = params
    await this.projectUsersService.delete(projectId, userId)
    return response.noContent()
  }

  public async create({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
