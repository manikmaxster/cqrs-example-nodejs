import { Module } from "@nestjs/common";
import { CqrsModule, EventBus } from "@nestjs/cqrs";

@Module({
    imports: [CqrsModule],
    controllers: [],
    providers: [
        // add stuff
    ],
});

export class CarModule {

}