import { randomUUID } from 'crypto'

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { SectorEnum } from '../../utils/SectorEnum'

export default class UsersSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        id: randomUUID(),
        username: 'Miltiao36',
        email: 'matheus@gmail.com',
        password: '123456',
        setor: SectorEnum.Adm,
      },
      {
        id: randomUUID(),
        username: '11JL98',
        email: 'joao@gmail.com',
        password: '123456',
        setor: SectorEnum.Adm,
      },
      {
        id: randomUUID(),
        username: 'eriksjr',
        email: 'eriks@gmail.com',
        password: '123456',
        setor: SectorEnum.Finaceiro,
      },
    ])
  }
}
