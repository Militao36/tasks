import ProjectUser from 'App/Models/ProjectUser'

export interface IProjectUser {
  id?: string
  projectId: string
  userId: string
}

class ProjectUsersService {
  public async create(body: IProjectUser | IProjectUser[]): Promise<void> {
    if (Array.isArray(body)) {
      await ProjectUser.fetchOrCreateMany(['projectId', 'userId'], body)
      return
    }

    await ProjectUser.fetchOrCreateMany(['projectId', 'userId'], [body])
  }

  public async delete(projectId: string, userId: string) {
    await ProjectUser.query().delete().where({
      projectId,
      userId,
    })
  }
}

export default new ProjectUsersService()
