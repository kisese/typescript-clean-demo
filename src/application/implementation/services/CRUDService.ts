import { BaseEntity } from "@entities/BaseEntity";
import { ICRUDRepository } from "@interfaces/repositories/ICRUDRepository";
import { ICRUDService } from "@interfaces/services/ICRUDService";

export abstract class CRUDService<Entity extends BaseEntity>
  implements ICRUDService<Entity>
{
  constructor(protected repository: ICRUDRepository<Entity>) {}
  async Create(entity: Entity): Promise<Entity> {
    const response = await this.repository.Create(entity);
    return response;
  }
  async GetAll(): Promise<Entity[]> {
    const response = await this.repository.GetAll();
    return response;
  }
  async GetById(id?: number): Promise<Entity> {
    const response = await this.repository.GetById(id);
    return response;
  }
  async Update(id: number, entity: Entity): Promise<Entity> {
    const response = await this.repository.Update(id, entity);
    return response;
  }
  async Delete(id: number): Promise<void> {
    await this.repository.Delete(id);
  }
}
