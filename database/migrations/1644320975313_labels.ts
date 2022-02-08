import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Labels extends BaseSchema {
  protected tableName = 'labels'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 36).primary()
      table.string('name', 40).unique().notNullable()
      table.string('color', 10).notNullable()
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
