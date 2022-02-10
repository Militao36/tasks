import { randomUUID } from 'crypto'

import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

export default class TasksLabel extends BaseModel {
  public static table = 'tasks_labels'

  public static selfAssignPrimaryKey = true

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

  @beforeCreate()
  public static async generateUUID(taskLabel: TasksLabel) {
    taskLabel.id = randomUUID()
  }
}
