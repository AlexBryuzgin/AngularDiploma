import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './utils/sequelize';
import addMiddleware from './middleware';

sequelize.sync()
  .then(() => {
    const port = process.env.PORT || '8080';
    const app = express();
    addMiddleware(app);
    app.listen(port, () => {
      console.info(`Listening on port ${port}`);
    });
  })
  .catch(err => console.info(err));
