import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tasks extends BaseSchema {
  protected tableName = 'tasks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('title', 40).unique().notNullable()
      table.string('branch', 50)
      table.text('description')
      table.string('user_id', 36).references('id').inTable('users')
      table.string('project_id', 36).references('id').inTable('projects')
      table.string('list_id', 36).references('id').inTable('lists')
      table.dateTime('start_date')
      table.dateTime('end_date')
      table.dateTime('delivery_date')


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
