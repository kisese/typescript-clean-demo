import {EntityTarget, FindOptionsWhere, Repository} from "typeorm";
import {BaseEntity} from "@entities/BaseEntity";
import {AppDataSource} from "@typeorm-config";
import {ICRUDRepository} from "@interfaces/repositories/ICRUDRepository";

export abstract class CRUDRepository<T extends BaseEntity>
    implements ICRUDRepository<T> {
    protected repository: Repository<T>;

    constructor(private Entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository(this.Entity);
    }

    async Create(entity: T): Promise<T> {
        const entityCreate = this.repository.save(entity);
        return entityCreate;
    }

    async GetAll(): Promise<T[]> {
        const entities = await this.repository.find();
        return entities;
    }

    async GetById(id?: number): Promise<T> {
        const criterias = {where: {id: id} as FindOptionsWhere<T>};
        const entity = await this.repository.findOne(criterias);
        return entity;
    }

    async Update(id: number, entity: T): Promise<T> {
        await this.repository.update(id, entity as any);
        return entity;
    }

    async Delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    protected getEntityType(): EntityTarget<T> {
        return this.Entity;
    }
}
