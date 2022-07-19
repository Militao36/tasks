import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { SectorEnum } from '../../utils/SectorEnum'

export default class UsersSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        username: 'Miltiao36',
        email: 'matheusmoreira3693@gmail.com',
        password: '147258369',
        setor: SectorEnum.Adm,
      },
      {
        username: '11JL98',
        email: 'joaoferrreira981011@gmail.com',
        password: '123456',
        setor: SectorEnum.Adm,
      },
      {
        username: 'eriksjr',
        email: 'eriksjunior13@gmail.com',
        password: '17/10/96',
        setor: SectorEnum.Adm,
      },
      {
        username: 'andre',
        email: 'andre-nv@hotmail.com',
        password: '123456789',
        setor: SectorEnum.Adm,
      },
      {
        username: 'jmarcelo',
        email: 'jmarcelo@winfit.com.br',
        password: 'marias10',
        setor: SectorEnum.Adm,
      },
      {
        username: 'jmarcelo',
        email: 'joaoguilherme@winfit.com.br',
        password: 'marias10',
        setor: SectorEnum.Adm,
      },
    ])
  }
}
