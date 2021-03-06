import { randomUUID } from 'crypto'
import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  beforeSave,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Project from './Project'
import { CamelCaseNamingStrategy } from 'App/NamingStrategy/CamelCaseNamingStrategy'

export default class User extends BaseModel {
  public static table = 'users'

  public static namingStrategy = new CamelCaseNamingStrategy()

  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public setor: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Project, {
    pivotTable: 'projects_users',
  })
  public projects: ManyToMany<typeof Project>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static async generateUUID(user: User) {
    user.id = randomUUID()
  }
}
