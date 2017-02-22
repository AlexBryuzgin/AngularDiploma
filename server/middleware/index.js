import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import morgan from 'morgan';
import router from '../routes';

function addMiddleware(app) {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(morgan('dev'));
  router(app);
}

export default addMiddleware;