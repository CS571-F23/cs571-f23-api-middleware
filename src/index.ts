import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { CS571Initializer } from './services/initialize';
import { CS571RouteHealth } from './routes/health';
import { CS571Configurator } from './services/configure';

dotenv.config();

const app: Express = express();

CS571Initializer.init(app);

process.on('uncaughtException', function (exception) {
  console.log(exception);
});

process.on('unhandledRejection', (reason, p) => {
  console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
});

new CS571RouteHealth().addRoute(app);

// TODO INIT ALL OTHER ROUTES

app.get( '/', (req, res, next) => {
  res.status(200).send({
    msg: "Successfully authenticated!"
  })
})

app.use((req, res, next) => {
  res.status(404).send({
    msg: "That API route does not exist!"
  });
});

app.listen(CS571Configurator.getConfig().PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${CS571Configurator.getConfig().PORT}`);
});