import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Label from 'App/Models/Label'

export default class LabelSeeder extends BaseSeeder {
  public async run() {
    await Label.createMany([
      {
        name: 'Finalizado',
        color: '#000',
      },
      {
        name: 'Em andamento',
        color: '#fff',
      },
      {
        name: 'Aguardando',
        color: '#010',
      },
    ])
  }
}
