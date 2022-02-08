import { randomUUID } from 'crypto'

import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'

export default class TasksLabel extends BaseModel {
  public static table = 'tasks_labels'

  @column({ isPrimary: true })
  public id: string

  @column()
  public taskId: string

  @column()
  public labelId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async generateUUID(taskLabel: TasksLabel) {
    taskLabel.id = randomUUID()
  }
}
