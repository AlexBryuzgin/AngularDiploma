import users from './users';

export default function(app) {
  app.use('/api/users', users);
}