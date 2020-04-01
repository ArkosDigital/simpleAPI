/* eslint-disable no-underscore-dangle */
import { Event, Operation } from 'flexiblepersistence';
import ServiceAdapter from '../interfaces/service/serviceAdapter';
import handler from '../database/handler';
import ServiceModel from '../models/serviceModel';
import ServiceSimpleModel from '../models/serviceSimpleModel';
import BaseServiceSimple from './baseServiceSimple';

export default abstract class BaseService extends BaseServiceSimple
  implements ServiceAdapter {
  protected abstract element: string;

  protected abstract async selectElementById(id: string): Promise<ServiceModel>;

  protected abstract async storeElement(
    content: ServiceSimpleModel
  ): Promise<ServiceModel>;

  protected abstract async updateElement(
    id: string,
    content: ServiceSimpleModel
  ): Promise<ServiceModel>;

  protected abstract async deleteElement(id: string): Promise<boolean>;

  public async selectById(id: string): Promise<ServiceModel> {
    const result = await this.selectElementById(id);
    return result;
  }

  public async store(content: ServiceSimpleModel): Promise<ServiceModel> {
    // Event Sourcing
    const event = await handler.addEvent(
      new Event({
        operation: Operation.add,
        name: this.element,
        content,
      })
    );

    const result = await this.storeElement({
      ...content,
      id: event.receivedItem._id.toString(),
    });
    return result;
  }

  public async update(
    id: string,
    content: ServiceSimpleModel
  ): Promise<ServiceModel> {
    // Event Sourcing
    await handler.addEvent(
      new Event({
        operation: Operation.update,
        name: this.element,
        content,
        selection: { _id: id },
      })
    );

    const result = await this.updateElement(id, content);
    return result;
  }

  public async delete(id: string): Promise<boolean> {
    // Event Sourcing
    await handler.addEvent(
      new Event({
        operation: Operation.delete,
        name: this.element,
        selection: { _id: id },
      })
    );

    const result = await this.deleteElement(id);
    return result;
  }
}
