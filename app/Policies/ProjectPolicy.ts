import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Project from 'App/Models/Project'
import { SectorEnum } from '../../utils/SectorEnum'

export default class ProjectPolicy extends BasePolicy {
  public async viewList() {
    return true
  }

  public async view(user: User, project: Project) {
    if (this.isAdmin(user)) {
      return true
    }
    const usersIds = project.users.map((value) => value.id)
    return usersIds.includes(user.id)
  }

  public async create(user: User) {
    if (this.isAdmin(user)) {
      return true
    }
    return user.setor === SectorEnum.Adm
  }

  public async update(user: User, project: Project) {
    if (this.isAdmin(user)) {
      return true
    }
    const usersIds = project.users.map((value) => value.id)
    return usersIds.includes(user.id)
  }

  public async delete(user: User, project: Project) {
    if (this.isAdmin(user)) {
      return true
    }
    const usersIds = project.users.map((value) => value.id)
    return usersIds.includes(user.id) && user.setor === SectorEnum.Adm
  }

  private isAdmin(user: User) {
    return user.setor === 'Adm'
  }
}
