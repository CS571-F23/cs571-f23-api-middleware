import express, { Express, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { CS571Auth } from './auth';
import { CS571Util } from './util';
import { rateLimit } from 'express-rate-limit';
import { CS571Configurator } from './configure';
import { CS571RouteHealth } from '../routes/health';

export class CS571Initializer {
    static init(app: Express): void {
        CS571Initializer.initEnvironmentVars(app);
        CS571Initializer.initLogging(app);
        CS571Initializer.initErrorHandling(app);
        CS571Initializer.initBodyParsing(app);
        CS571Initializer.initRateLimiting(app);
        CS571Initializer.initCorsPolicy(app);
        CS571Initializer.initAuth(app);
        CS571Initializer.initHealth(app);
        CS571Initializer.initNotFound(app);
    }

    private static initEnvironmentVars(app: Express): void {
        dotenv.config();
    }

    private static initLogging(app: Express): void {
        app.use(morgan((tokens, req, res) => {
            return [
                CS571Util.getDateForLogging(),
                tokens['remote-addr'](req, res),
                tokens.method(req, res),
                tokens.url(req, res),
                tokens.status(req, res),
                CS571Auth.getUserFromRequest(req),
                tokens['response-time'](req, res), 'ms'
            ].join(' ')
        }));
    }

    private static initErrorHandling(app: Express): void {
        app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
            console.log("Encountered an erroneous request!")
            const datetime = new Date();
            const datetimeStr = `${datetime.toLocaleDateString()} ${datetime.toLocaleTimeString()}`;
            res.status(500).send({
                "error-msg": "Oops! Something went wrong. Check to make sure that you are sending a valid request. Your recieved request is provided below. If it is empty, then it was most likely not provided or malformed. If you have verified that your request is valid, please contact the CS571 staff.",
                "error-req": JSON.stringify(req.body),
                "date-time": datetimeStr
            })
        });

        process.on('uncaughtException', function (exception) {
            console.log(exception);
        });
          
        process.on('unhandledRejection', (reason, p) => {
            console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
        });
    }

    private static initBodyParsing(app: Express): void {
        app.use(express.json());
        app.use(express.urlencoded({
            extended: true
        }));
    }

    private static initRateLimiting(app: Express): void {
        app.use(rateLimit({
            message: {
                msg: "Too many requests, please try again later."
            },
            windowMs: CS571Configurator.getConfig().TIMEOUT_WINDOW_LENGTH * 1000,
            max: (req, _) => req.method === "OPTIONS" ? 0 : CS571Configurator.getConfig().TIMEOUT_WINDOW_REQS,
            keyGenerator: (req, _) => req.header('X-CS571-ID') as string // throttle on BID
        }));
        app.set('trust proxy', 1);
    }

    private static initCorsPolicy(app: Express): void {
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", req.headers.origin);
            res.header("Access-Control-Allow-Headers", req.headers["access-control-request-headers"]);
            res.header('Access-Control-Allow-Methods', req.headers["access-control-request-method"]);
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Expose-Headers', 'Set-Cookie');
            next();
        });
    }

    private static initAuth(app: Express): void {
        app.use(function (req, res, next) {
            if(CS571Auth.authenticate(req, res)) {
                next();
            }
        });
    }

    private static initHealth(app: Express): void {
        new CS571RouteHealth().addRoute(app);
    }

    private static initNotFound(app: Express): void {
        app.use((req, res, next) => {
            res.status(404).send({
                msg: "That API route does not exist!"
            });
        });
    }
}