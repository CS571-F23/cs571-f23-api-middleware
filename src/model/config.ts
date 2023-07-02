import fs from "fs";

export class CS571Config {
    public readonly ENV_NAME: string;
    public readonly SESSION_LENGTH: number;
    public readonly SESSION_SECRET: string;

    private constructor(secretPath: string) {
        this.ENV_NAME = process.env["ENV_NAME"] ?? "unknown";
        this.SESSION_LENGTH = parseInt(process.env["SESSION_LENGTH"] ?? "3600");
    
        const secretConfig = JSON.parse(fs.readFileSync(secretPath).toString());
        this.SESSION_SECRET = secretConfig["SESSION_SECRET"]
    }

    public static construct(secretPath: string): CS571Config {
        return new CS571Config(secretPath);
    }
}