import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tasks extends BaseSchema {
  protected tableName = 'tasks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('title', 20).unique().notNullable()
      table.string('branch', 50)
      table.text('description')
      table.string('user_id', 36).references('users.id')
      table.string('project_id', 36).references('projects.id')
      table.dateTime('start_date')
      table.dateTime('end_date')

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
