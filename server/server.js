import express from 'express';
import bodyParser from 'body-parser';
import db from './utils/db';
import addMiddleware from './middleware';

db.sequelize.sync()
  .then(() => {
    console.log('DB is set')
    const port = process.env.PORT || '8080';
    const app = express();
    addMiddleware(app);
    app.listen(port, () => {
      console.info(`Listening on port ${port}`);
    });
  })
  .catch(err => console.info(err));
