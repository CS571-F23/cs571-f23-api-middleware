import { CS571Config } from "../model/config";

export class CS571Configurator {

    public static readonly DEFAULT_CONFIG_PATH: string = process.env.DEFAULT_CONFIG_PATH ?? 'config.secret';

    public static getConfig(): CS571Config {
        return process.env["CS571_CONFIG_PATH"] ? 
            CS571Configurator.getConfigByPath(process.env["CS571_CONFIG_PATH"]) :
            CS571Configurator.getDefaultConfig();
    }

    public static getDefaultConfig(): CS571Config {
        return CS571Configurator.getConfigByPath(CS571Configurator.DEFAULT_CONFIG_PATH);
    }

    public static getConfigByPath(path: string): CS571Config {
        return CS571Config.construct(path);
    }
}