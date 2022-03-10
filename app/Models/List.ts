import { randomUUID } from 'crypto'

import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { CamelCaseNamingStrategy } from 'App/NamingStrategy/CamelCaseNamingStrategy'

export default class List extends BaseModel {
  public static table = 'lists'

  public static namingStrategy = new CamelCaseNamingStrategy()

  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  public taskId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUUID(list: List) {
    list.id = randomUUID()
  }
}
