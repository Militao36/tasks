import { randomUUID } from 'crypto'

import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

export default class LabelsTask extends BaseModel {
  public static table = 'tasks_labels'
  // para não da problema o id de não retornar
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public labelId?: string

  @column()
  public taskId?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUUID(LabelsTask: LabelsTask) {
    LabelsTask.id = randomUUID()
  }
}
