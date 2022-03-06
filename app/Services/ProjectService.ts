import { DateTime } from 'luxon'
import Project from 'App/Models/Project'

import ProjectUsersService, { IProjectUser } from './ProjectUsersService'
import { IUser } from './UserService'

export enum Status {
  'draft' = 'draft',
  'published' = 'published',
}

interface IProject {
  id?: string
  title: string
  description: string
  startDate?: DateTime | null
  endDate?: DateTime | null
  deliveryDate?: DateTime | null
  status: Status
  users?: IUser[]
}

class ProjectService {
  private projectUsersService: typeof ProjectUsersService

  constructor() {
    this.projectUsersService = ProjectUsersService
  }

  public async create(body: IProject): Promise<string> {
    const { id } = await Project.create({
      title: body.title,
      description: body.description,
      deliveryDate: body.deliveryDate as any,
      status: body.status,
    })

    return id
  }

  public async update(body: IProject): Promise<void> {
    const project = await Project.findOrFail(body.id)

    if (body.status === 'draft' && project.status === 'published') {
      body.status = Status.draft
      body.startDate = null
      body.endDate = null
      body.deliveryDate = null
    }

    if (body.status === 'published' && project.status === 'draft') {
      body.status = Status.published
      body.startDate = DateTime.local()
    }

    body.deliveryDate = body.deliveryDate || null

    project.merge(body as Project)

    const projectUsers: IProjectUser[] = body.users!.map((user) => {
      return {
        userId: user.id,
        projectId: body.id as string,
      }
    })

    await this.projectUsersService.create(projectUsers)
    await project.save()
  }

  public async index() {
    const data = await Project.query()
      .select(['id', 'title', 'description', 'startDate', 'endDate'])
      .preload('users', (query) => query.select(['id', 'username']))
      .withAggregate('tasks', (query) => query.count('*').as('tasksCount'))
      .withAggregate('tasks', (query) => query.count('*').as('tasksEnd').whereNotNull('endDate'))
      .withAggregate('tasks', (query) =>
        query.count('*').as('tasksNotEnd').whereNull('endDate').andWhereNotNull('startDate')
      )

    return data.map((project) => {
      return {
        ...project.toJSON(),
        tasksCount: project.$extras.tasksCount,
        tasksEnd: project.$extras.tasksEnd,
        tasksNotEnd: project.$extras.tasksNotEnd,
      }
    })
  }

  public async show(id: string) {
    const project = await Project.findByOrFail('id', id)

    await project.load('users', (query) => query.select(['id', 'username']))

    return project
  }
}

export default new ProjectService()
