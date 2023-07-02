import { CS571Config } from "../model/config";

export class CS571Configurator {

    public static readonly DEFAULT_CONFIG_PATH: string = process.env.DEFAULT_CONFIG_PATH ?? 'config.secret';

    public static getDefaultConfig(): CS571Config {
        return CS571Configurator.getConfig(CS571Configurator.DEFAULT_CONFIG_PATH);
    }

    public static getConfig(path: string): CS571Config {
        return CS571Config.construct(path);
    }
}