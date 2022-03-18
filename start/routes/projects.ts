import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'ProjectsController.index')
  Route.get('/:id', 'ProjectsController.show')
  Route.put('/:id', 'ProjectsController.update')
  Route.post('/', 'ProjectsController.store')
  Route.delete('/:projectId/:userId', 'ProjectsController.removeUserOfProject')
})
  .prefix('/projects')
  .middleware('auth')
