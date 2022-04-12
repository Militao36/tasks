import ProjectUser from 'App/Models/ProjectUser'

export interface IProjectUser {
  id?: string
  projectId: string
  userId: string
}

class ProjectUsersService {
  public async create(projectId: string, body: any[]): Promise<void> {
    const projectUsers: IProjectUser[] =
      body?.map((user: { id: string }) => {
        return {
          userId: user.id,
          projectId,
        }
      }) || []

    await ProjectUser.fetchOrCreateMany(['projectId', 'userId'], projectUsers)
  }

  public async delete(projectId: string, userId: string) {
    await ProjectUser.query().delete().where({
      projectId,
      userId,
    })
  }
}

export default new ProjectUsersService()
