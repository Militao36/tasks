import { randomUUID } from 'crypto'
import { DateTime } from 'luxon'

import {
  BaseModel,
  beforeCreate,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'

import { CamelCaseNamingStrategy } from 'App/NamingStrategy/CamelCaseNamingStrategy'

import User from './User'
import Task from './Task'

export default class Project extends BaseModel {
  public static table = 'projects'

  public static namingStrategy = new CamelCaseNamingStrategy()

  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  public description: string

  @column.dateTime()
  public startDate: DateTime

  @column.dateTime()
  public endDate: DateTime

  @column.dateTime()
  public deliveryDate: DateTime

  @column()
  public status: 'draft' | 'published'

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

  @beforeCreate()
  public static async generateUUID(project: Project) {
    project.id = randomUUID()
  }
}
