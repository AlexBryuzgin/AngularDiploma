import users from './users';
import adverts from './adverts';
import images from './images';

export default function(app) {
  app.use('/users', users);
  app.use('/adverts', adverts);
  app.use('/images', images);
}
