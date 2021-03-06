import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TasksLabels extends BaseSchema {
  protected tableName = 'tasks_labels'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 36).primary()
      table.string('task_id', 36).references('id').inTable('tasks')
      table.string('label_id', 36).references('id').inTable('labels')

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
