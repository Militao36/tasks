import { randomUUID } from 'crypto'

import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Label from './Label'

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

  @manyToMany(() => Label)
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
