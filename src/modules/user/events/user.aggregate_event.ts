import { AggregateEvent } from "src/lib/events/aggregate_event";

export abstract class UserAggregateEvent extends AggregateEvent {
    static aggregateName = 'user';
}