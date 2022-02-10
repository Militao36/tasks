import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'CommentsController.index')
  Route.post('/', 'CommentsController.store')
}).prefix('/comments')
