import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Project from 'App/Models/Project'
import ProjectUser from 'App/Models/ProjectUser'
import User from 'App/Models/User'

export default class ProjectsUsersSeeder extends BaseSeeder {
  public async run() {
    const projects = await Project.all()
    const users = await User.all()

    const data: Array<any> = []

    for (let index = 0; index < projects.length; index++) {
      data.push({
        projectId: projects[index].id,
        userId: users[index].id,
      })
    }

    await ProjectUser.createMany(data)
  }
}
