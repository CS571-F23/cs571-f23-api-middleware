export class User {
    public readonly email: string;
    public static readonly ANONYMOUS_USER: User = new User("anonymous");

    public constructor(email: string) {
        this.email = email;
    }
}