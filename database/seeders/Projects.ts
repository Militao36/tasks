import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Project from 'App/Models/Project'
import { DateTime } from 'luxon'

export default class ProjectsSeeder extends BaseSeeder {
  public async run() {
    await Project.createMany([
      {
        title: 'Winfit',
        description: '# Teste Winfit',
        deliveryDate: DateTime.local().plus({ day: 10 }).toSQL({ includeOffset: false }) as any,
      },
      {
        title: 'Nota Fácil',
        description: '# Teste Nota fácil',
        deliveryDate: DateTime.local().plus({ day: 12 }).toSQL({ includeOffset: false }) as any,
      },
      {
        title: 'Api Compêndio',
        description: '# Teste Api Compendio',
        deliveryDate: DateTime.local().plus({ day: 12 }).toSQL({ includeOffset: false }) as any,
      },
    ])
  }
}
