import { Request } from 'express';

import { User } from "../model/user";

export class CS571Auth {
    public static authenticate() {
        console.log("TODO");
    }

    public static getUserFromRequest(req: Request): User {
        return User.ANONYMOUS_USER;
    }
}