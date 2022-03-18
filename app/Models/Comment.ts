import { randomUUID } from 'crypto'

import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Task from './Task'
import Project from './Project'
import User from './User'
import { CamelCaseNamingStrategy } from 'App/NamingStrategy/CamelCaseNamingStrategy'

export default class Comment extends BaseModel {
  public static table = 'comments'

  public static namingStrategy = new CamelCaseNamingStrategy()

  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public projectId?: string

  @column()
  public taskId?: string

  @column()
  public userId: string

  @column()
  public comment: string

  @belongsTo(() => Task)
  public task: BelongsTo<typeof Task>

  @belongsTo(() => User, { foreignKey: 'userId' })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Project, { foreignKey: 'projectId' })
  public project: BelongsTo<typeof Project>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUUID(comment: Comment) {
    comment.id = randomUUID()
  }
}
