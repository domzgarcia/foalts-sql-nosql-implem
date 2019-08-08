import 'source-map-support/register';
import 'module-alias/register';

// std
import * as http from 'http';

// 3p
import { Config, createApp } from '@foal/core';
import * as express from 'express';
import * as session from 'express-session';
import * as mongoose from 'mongoose';

// App
import { AppController } from './app/app.controller';

async function main() {
  // connect database
  const uri = Config.get<string>('mongodb.uri');
  const secret = Config.get<string>('settings.session.secret');

  const db = mongoose.connection;
  mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
  
  // add mongostore
  const expressApp = express();
  const MongoStore = require('connect-mongo')(session);
  expressApp.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ /* url: uri, ttl: 14 * 24 * 60 * 60, */ mongooseConnection: db }),
  }));

  const app = createApp(AppController, expressApp);

  const httpServer = http.createServer(app);
  const port = Config.get('port', 3001);
  httpServer.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
}

main();
