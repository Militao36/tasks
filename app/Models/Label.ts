import { randomUUID } from 'crypto'

import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'

export default class Label extends BaseModel {
  public static table = 'labels'

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public color: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async generateUUID(label: Label) {
    label.id = randomUUID()
  }
}
