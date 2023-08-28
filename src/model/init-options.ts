
export class CS571InitOptions {
    public readonly allowNoAuth: string[];

    private constructor(obj?: any) {
        this.allowNoAuth = obj?.allowNoAuth ?? [];
    }
}