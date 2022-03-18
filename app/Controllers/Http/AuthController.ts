import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async auth({ auth, request }: HttpContextContract) {
    const data = request.body()

    const token = await auth.attempt(data.email, data.password, {
      expiresIn: '1 days',
    })

    return token
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
