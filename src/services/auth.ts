import { Request, Response } from 'express';

import { User } from "../model/user";

export class CS571Auth {
    public static authenticate(req: Request, res: Response): boolean {
        if (req.method !== 'OPTIONS' && req.originalUrl !== '/health') {
            const xid = req.header('X-CS571-ID')
            if (xid !== 'test_bid123') {
                res.status(401).send({
                    msg: "You specified an invalid X-CS571-ID!"
                });
                return false;
            }
        }
        return true;
    }

    public static getUserFromRequest(req: Request): User {
        return User.ANONYMOUS_USER;
    }
}