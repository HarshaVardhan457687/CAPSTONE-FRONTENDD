export class EventUser {
    id?: any;
    name: string;
    email: string;
    password: string;

    constructor(
        name: any,
        email: string,
        password: string,
        id?: string
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = id;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password
        };
    }

    static fromJSON(json: any): EventUser {
        return new EventUser(
            json.name,
            json.email,
            json.password,
            json.id
        );
    }
}