import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'ListsController.index')
}).prefix('/lists')
