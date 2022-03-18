import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Project from 'App/Models/Project'
import { DateTime } from 'luxon'

export default class ProjectsSeeder extends BaseSeeder {
  public async run() {
    await Project.createMany([
      {
        title: 'Winfit',
        description: '# Teste Winfit',
        startDate: DateTime.local(),
        endDate: DateTime.local().plus({ day: 5 }),
        deliveryDate: DateTime.local().plus({ day: 5 }),
        expectedDate: DateTime.local().plus({ day: 10 }),
        status: 'published',
      },
      {
        title: 'Nota Fácil',
        description: '# Teste Nota fácil',
        status: 'draft',
      },
      {
        title: 'Api Compêndio',
        description: '# Teste Api Compendio',
        startDate: DateTime.local(),
        expectedDate: DateTime.local().plus({ day: 15 }),
        status: 'published',
      },
    ])
  }
}
