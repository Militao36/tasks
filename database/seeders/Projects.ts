import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Project from 'App/Models/Project'

export default class ProjectsSeeder extends BaseSeeder {
  public async run() {
    await Project.createMany([
      {
        title: 'Winfit',
        description: '# Teste Winfit',
      },
      {
        title: 'Nota Fácil',
        description: '# Teste Nota fácil',
      },
      {
        title: 'Api Compêndio',
        description: '# Teste Api Compendio',
      },
    ])
  }
}
