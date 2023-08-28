import { CS571Config } from "./config";
import { CS571Router } from "./router";

export class CS571App<T, K> {
    public readonly router: CS571Router;
    public readonly config: CS571Config<T, K>;

    private constructor(router: CS571Router, config: CS571Config<T, K>) {
        this.router = router;
        this.config = config;
    }

    public static construct<F, E>(router: CS571Router, config: CS571Config<F, E>) {
        return new CS571App<F, E>(router, config);
    }
}