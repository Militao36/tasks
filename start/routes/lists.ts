import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'ListsController.index')
  Route.post('/', 'ListsController.create')
}).prefix('/lists')
