import { randomUUID } from 'crypto'

import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeSave,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Task from './Task'

export default class Project extends BaseModel {
  public static table = 'projects'

  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public startDate: DateTime

  @column()
  public endDate: DateTime

  @manyToMany(() => User, {
    pivotTable: 'projects_users',
  })
  public users: ManyToMany<typeof User>

  @hasMany(() => Task)
  public tasks: HasMany<typeof Task>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async generateUUID(project: Project) {
    project.id = randomUUID()
  }
}
