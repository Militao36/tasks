import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'CommentsController.index')
  Route.post('/', 'CommentsController.store')
  Route.put('/:id', 'CommentsController.update')
  Route.delete('/:id', 'CommentsController.delete')
}).prefix('/comments')
