import Project from 'App/Models/Project'
import { DateTime } from 'luxon'
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
  expectedDate?: DateTime | null
  status?: Status
  users?: IUser[]
}

class ProjectService {
  public async create(body: IProject): Promise<string> {
    const { id } = await Project.create({
      title: body.title,
      description: body.description,
      deliveryDate: body.deliveryDate || (null as any),
      status: Status.draft,
    })

    return id
  }

  public async update(body: IProject): Promise<void> {
    const project = await Project.findOrFail(body.id)

    if (body.deliveryDate === ('' as any)) {
      body.deliveryDate = null
    }

    project.merge(body as Project)

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

  public async show(id: string): Promise<IProject> {
    const project = await Project.findByOrFail('id', id)

    await project.load('users', (query) => query.select(['id', 'username']))

    return {
      id: project.id,
      title: project.title,
      description: project.description,
      deliveryDate: project.deliveryDate,
      expectedDate: project.expectedDate,
      startDate: project.startDate,
      endDate: project.endDate,
      status: Status[project.status],
      users: project.users.map((value) => {
        return {
          id: value.id,
          username: value.username,
        }
      }),
    }
  }
}

export default new ProjectService()
