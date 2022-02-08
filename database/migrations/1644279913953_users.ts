import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { SectorEnum } from '../../utils/SectorEnum'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 36).primary()
      table.string('username')
      table.string('email', 255)
      table.string('password')
      table.enum('setor', [
        SectorEnum.Adm,
        SectorEnum.Suporte,
        SectorEnum.Vendas,
        SectorEnum.Finaceiro,
      ])
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
