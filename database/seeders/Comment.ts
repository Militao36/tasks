import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Comment from 'App/Models/Comment'
import Task from 'App/Models/Task'

export default class CommentSeeder extends BaseSeeder {
  public async run() {
    const tasks = await Task.all()
    console.log(tasks)

    await Comment.createMany([
      {
        taskId: tasks[0].id,
        comment: '1 Apenas um teste',
      },
      {
        taskId: tasks[1].id,
        comment: '2 Apenas um teste',
      },
      {
        taskId: tasks[2].id,
        comment: '3 Apenas um teste',
      },
    ])
  }
}
