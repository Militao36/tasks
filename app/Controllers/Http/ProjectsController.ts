import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'
import ProjectService from 'App/Services/ProjectService'
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

  public async show({ params, bouncer }: HttpContextContract) {
    const project = await this.projectService.show(params.id)

    await bouncer.with('ProjectPolicy').authorize('view', project as Project)

    return project
  }

  public async store({ request, bouncer, auth }: HttpContextContract) {
    const data = request.only(['title', 'description', 'users'])

    await bouncer.with('ProjectPolicy').authorize('create')

    const id = await this.projectService.create({
      title: data.title,
      description: data.description,
    })

    const users = [...data.users, { id: auth.user!.id }]
    await this.projectUsersService.create(id, users)

    return id
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
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

    const project = await ProjectService.show(id)
    await bouncer.with('ProjectPolicy').authorize('view', project as Project)

    await this.projectService.update({
      id,
      ...data,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      deliveryDate: data.deliveryDate || null,
      expectedDate: data.expectedDate || null,
    })

    await this.projectUsersService.create(id, data.users)

    return response.noContent()
  }

  public async removeUserOfProject({ params, response, bouncer }: HttpContextContract) {
    const { projectId, userId } = params

    const project = await ProjectService.show(projectId)
    await bouncer.with('ProjectPolicy').authorize('delete', project as Project)

    if (project.users?.length === 1) {
      return response
        .status(400)
        .json({ message: 'Não é posssível deletar todos usuários do projeto.' })
    }

    await this.projectUsersService.delete(projectId, userId)

    return response.noContent()
  }

  public async create({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
