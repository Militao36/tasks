import { randomUUID } from 'crypto'

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Project from 'App/Models/Project'
import { DateTime } from 'luxon'

export default class ProjectsSeeder extends BaseSeeder {
  public async run() {
    Project.createMany([
      {
        id: randomUUID(),
        title: 'Winfit',
        description: '# Teste Winfit',
        startDate: DateTime.local().setZone('America/Sao_Paulo'),
        endDate: DateTime.local().setZone('America/Sao_Paulo'),
      },
      {
        id: randomUUID(),
        title: 'Nota Fácil',
        description: '# Teste Nota fácil',
        startDate: DateTime.local().setZone('America/Sao_Paulo'),
        endDate: DateTime.local().setZone('America/Sao_Paulo'),
      },
      {
        id: randomUUID(),
        title: 'Api Compêndio',
        description: '# Teste Api Compendio',
        startDate: DateTime.local().setZone('America/Sao_Paulo'),
        endDate: DateTime.local().setZone('America/Sao_Paulo'),
      },
    ])
  }
}
