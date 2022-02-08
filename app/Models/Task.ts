import { randomUUID } from 'crypto'

import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeSave,
  column,
  hasOne,
  HasOne,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Label from './Label'
import User from './User'

export default class Task extends BaseModel {
  public static table = 'tasks'

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

  @hasOne(() => User, { localKey: 'userId', foreignKey: 'userId' })
  public user: HasOne<typeof User>

  @manyToMany(() => Label, {
    pivotTable: 'tasks_labels',
  })
  public labels: ManyToMany<typeof Label>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async generateUUID(task: Task) {
    task.id = randomUUID()
  }
}
