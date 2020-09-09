import { AggregateRoot } from "@nestjs/cqrs";
import { v4 as uuidv4 } from 'uuid';
import { assert } from "console";
import { ConflictException } from "@nestjs/common";

type BasicModel = {
    id: string;
};

export type ModelOptions = {
    isInRepository: boolean;
};

export abstract class Model<T> extends AggregateRoot {
    update?(data: Partial<T>): void;
    create?(): void;
    delete?(): void;
    __isInRepository = false;
    protected _id: string;

    constructor(dto: T, options: ModelOptions = { isInRepository: false }) {
        super();
        this.__isInRepository = options.isInRepository;
        if (!(dto as any).id) (dto as any).id = uuidv4();
        this.fromDto(dto)
    }

    set id(value: string) {
        assert(value, "Id is required for user creation");
        assert(typeof value === 'string', "Id must be string");
        if (this._id) {
            throw new ConflictException("This model already has an id.");
        }
        this._id = value;
    }

    get id() {
        return this._id
    }

    public fromDto(dto) {
        Object.keys(dto).forEach(dtoKey => {
            if (!dtoKey.startsWith('_')) (this as any)[dtoKey] = dto[dtoKey];
        });
    }

    public toDto(): T & BasicModel {
        const dto = {} as T;
        Object.getOwnPropertyNames(this).forEach(modelKey => {
            if (modelKey.startsWith('_') && modelKey != '__isInRepository')
                (dto as any)[modelKey.substring(1)] = this[modelKey];
        });
        return dto as T & BasicModel;
    }

    protected updateModel(data: Partial<T>) {
        this.fromDto(data);
    }

    public toObject() {
        return this.toDto();
    }
}