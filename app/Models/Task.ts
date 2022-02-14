import { randomUUID } from 'crypto'

import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Label from './Label'
import User from './User'
import Comment from './Comment'

export default class Task extends BaseModel {
  public static table = 'tasks'

  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  public branch: string

  @column()
  public description: string

  @column()
  public userId: string

  @column()
  public projectId: string

  @column()
  public startDate: DateTime

  @column()
  public endDate: DateTime

  @belongsTo(() => User, { foreignKey: 'userId' })
  public user: BelongsTo<typeof User>

  @manyToMany(() => Label, {
    pivotTable: 'tasks_labels',
  })
  public labels: ManyToMany<typeof Label>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUUID(task: Task) {
    task.id = randomUUID()
  }
}
