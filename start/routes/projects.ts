import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'ProjectsController.index')
  Route.get('/:id', 'ProjectsController.show')
  Route.post('/', 'ProjectsController.store')
}).prefix('/projects')
