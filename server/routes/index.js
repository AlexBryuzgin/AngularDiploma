import users from './users';
import adverts from './adverts';

export default function(app) {
  app.use('/users', users);
  app.use('/adverts', adverts);
}
