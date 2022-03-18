import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Project from 'App/Models/Project'
import Task from 'App/Models/Task'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class TaskSeeder extends BaseSeeder {
  public async run() {
    const projects = await Project.all()
    const users = await User.all()

    await Task.createMany([
      {
        title: 'Adicionar tela de caixa',
        description: '# Iniciado tela de caixa',
        branch: 'tela-caixa',
        projectId: projects[0].id,
        userId: users[0].id,
        startDate: DateTime.local(),
        endDate: DateTime.local()
      },
      {
        title: 'Adicionar tela de cliente',
        description: '# Iniciado tela de cliente',
        branch: 'tela-cliente',
        projectId: projects[1].id,
        userId: users[1].id,
        startDate: DateTime.local(),
      },
      {
        title: 'Adicionar tela de venda',
        description: '# Iniciado tela de venda',
        branch: 'tela-venda',
        projectId: projects[2].id,
        userId: users[2].id,
        startDate: DateTime.local(),
        endDate: DateTime.local(),
        deliveryDate: DateTime.local()
      },
    ])
  }
}
