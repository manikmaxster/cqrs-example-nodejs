import { UserAggregateEvent } from "../user.aggregate_event";
import { UserInterface } from "../../models/interfaces/user.interface";

export class UserCreatedEvent extends UserAggregateEvent {
    constructor(public aggregateId: string, public user: UserInterface) {
        super();
    }
}