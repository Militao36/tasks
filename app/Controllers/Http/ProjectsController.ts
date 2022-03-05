import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'
import ProjectUser from 'App/Models/ProjectUser'
import { DateTime, Duration } from 'luxon'

export default class ProjectsController {
  public async index({}: HttpContextContract) {
    const data = await Project.query()
      .select(['id', 'title', 'description', 'start_date', 'end_date'])
      .preload('users', (query) => {
        query.select(['id', 'username'])
      })
      .withAggregate('tasks', (query) => {
        query.count('*').as('tasks_count')
      })
      .withAggregate('tasks', (query) => {
        query.count('*').as('tasks_end').whereNotNull('end_date')
      })
      .withAggregate('tasks', (query) => {
        query.count('*').as('tasks_not_end').whereNull('end_date').andWhereNotNull('start_date')
      })

    return data.map((project) => {
      return {
        ...project.serialize(),
        tasks_count: project.$extras.tasks_count,
        tasks_end: project.$extras.tasks_end,
        tasks_not_end: project.$extras.tasks_not_end,
      }
    })
  }

  public async show({ params }: HttpContextContract) {
    const project = await Project.findByOrFail('id', params.id)

    await project.load('users', (query) => {
      query.select(['id', 'username'])
    })

    const startDate = DateTime.fromJSDate(project.startDate as any)
    const endDate = DateTime.fromJSDate(project.endDate as any)

    const deliveryDate = DateTime.fromJSDate(project.deliveryDate as any)

    const date = DateTime.local()

    let timePast: Duration = <any>null

    if (startDate.isValid && endDate.isValid) {
      timePast = endDate.diff(startDate, ['day', 'hour'])
    }

    if (startDate.isValid && !endDate.isValid) {
      timePast = date.diff(startDate, ['day', 'hour', 'minute'])
    }

    console.log(DateTime.fromJSDate(project.startDate as any).toFormat('dd/MM/yyyy'))
    return {
      ...project.serialize(),
      start_date: DateTime.fromJSDate(project.startDate as any).toFormat('dd/MM/yyyy HH:mm'),
      timePast: timePast?.toObject() ?? {},
      deliveryDate: date.diff(deliveryDate, ['day', 'hour', 'minute']).toObject(),
    }
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['title', 'description', 'users'])

    const project = new Project()

    project.fill({
      title: data.title,
      description: data.description,
    })

    const { id } = await project.save()

    const users = data.users?.map((userId: string) => {
      return {
        user_id: userId,
        project_id: id,
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
