import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import { DateTime } from 'luxon'
import { MessagesResponses } from '../../../utils/messages/MessagesResponse'
import TasksService from 'App/Services/TasksService'
import ProjectService from 'App/Services/ProjectService'
import Project from 'App/Models/Project'

export default class TasksController {
  public async index({ request, bouncer, response }: HttpContextContract) {
    const { projectId } = request.qs()

    if (!projectId) {
      return response.notFound({
        message: MessagesResponses.NOT_FOUND,
      })
    }

    const project = await ProjectService.show(projectId)
    await bouncer.with('ProjectPolicy').authorize('view', project as Project)

    const data = await Task.query()
      .select(['id', 'title', 'description', 'start_date', 'end_date', 'user_id', 'listId'])
      .preload('user', (query) => query.select(['id', 'username', 'email']))
      .preload('labels', (query) => query.select(['id', 'name', 'color']))
      .where('project_id', '=', projectId)

    return data
  }

  public async store({ request, bouncer, response }: HttpContextContract) {
    const data = request.only(['title', 'branch', 'description', 'userId', 'projectId', 'listId'])

    const project = await ProjectService.show(data.projectId)
    await bouncer.with('ProjectPolicy').authorize('view', project as Project)

    const id = await TasksService.store(data)

    return response.status(201).json({ id })
  }

  public async update({ request, response, bouncer, params }: HttpContextContract) {
    const { id } = params

    const data = request.only([
      'title',
      'branch',
      'description',
      'userId',
      'listId',
      'projectId',
      'startDate',
      'endDate',
      'deliveryDate',
    ])

    const project = await ProjectService.show(data.projectId)
    await bouncer.with('ProjectPolicy').authorize('view', project as Project)

    await TasksService.update(data, id)
    return response.noContent()
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params
    const data = TasksService.show(id)
    if (!data) {
      return response.notFound()
    }
    return data
  }

  public async tasks({ params }: HttpContextContract) {
    const { status = 'in-progress' } = params

    const query = await TasksService.tasks(status)
    return query.map((task) => {
      return {
        ...task.serialize(),
        start_date: DateTime.fromJSDate(task.startDate as any).toFormat('dd/MM/yyyy HH:mm'),
      }
    })
  }

  public async updatedTaskMoveForList({ request }: HttpContextContract) {
    const data = request.only(['listId', 'taskId', 'type'])
    await TasksService.updatedTaskMoveForList(data, data.taskId)
  }

  public async create({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
