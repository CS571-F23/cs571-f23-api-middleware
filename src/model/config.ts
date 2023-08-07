import fs from "fs";

export class CS571Config {
    public readonly ENV_NAME: string;
    public readonly PORT: number;
    public readonly SESSION_LENGTH: number;
    public readonly SESSION_SECRET: string;
    public readonly TIMEOUT_WINDOW_LENGTH: number;
    public readonly TIMEOUT_WINDOW_REQS: number;
    public readonly AUTH_URL: string;


    private constructor(secretPath: string) {
        this.ENV_NAME = process.env["ENV_NAME"] ?? "unknown";
        this.PORT = parseInt(process.env["PORT"] ?? "37190");
        this.SESSION_LENGTH = parseInt(process.env["SESSION_LENGTH"] ?? "3600");
        this.TIMEOUT_WINDOW_LENGTH = parseInt(process.env["TIMEOUT_WINDOW_LENGTH"] ?? "30");
        this.TIMEOUT_WINDOW_REQS = parseInt(process.env["TIMEOUT_WINDOW_REQS"] ?? "100");
        this.AUTH_URL = process.env["AUTH_URL"] ?? "https://cs571.org/";


        const secretConfig = JSON.parse(fs.readFileSync(secretPath).toString());
        this.SESSION_SECRET = secretConfig["SESSION_SECRET"]
    }

    public static construct(secretPath: string): CS571Config {
        return new CS571Config(secretPath);
    }
}