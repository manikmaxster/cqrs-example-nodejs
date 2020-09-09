import { Model, ModelOptions } from "src/lib/model";
import { UserInterface } from "./interfaces/user.interface";
import { UserCreatedEvent } from "../events/aggregate-events/user_created.event";

export class UserModel extends Model<UserInterface> implements UserInterface {
    private _username: string;
    private _email: string;

    constructor(dto: UserInterface, options?: ModelOptions) {
        super(dto, options);
    }

    get username() {
        return this._username;
    }

    get email() {
        return this._email;
    }

    set username(value: string) {
        this._username = value;
    }

    set email(value: string) {
        this._email = value;
    }

    create() {
        this.apply(new UserCreatedEvent(this.id, this.toDto()));
    }

}