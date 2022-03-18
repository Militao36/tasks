import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterTableListsAddColumnProjectIds extends BaseSchema {
  protected tableName = 'lists'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('project_id').notNullable().after('title')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('project_id')
    })
  }
}
