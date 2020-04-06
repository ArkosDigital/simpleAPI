import ServiceUpdateAdapter from '../adapter/service/serviceUpdateAdapter';
import BaseServiceDefault from './baseServiceDefault';
import ServiceSimpleModel from '../model/serviceSimpleModel';
import ServiceModel from '../model/serviceModel';
import { Event, Operation } from 'flexiblepersistence';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default class BaseServiceUpdate extends BaseServiceDefault
  implements ServiceUpdateAdapter {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  protected abstract async updateElement(
    id: string,
    content: ServiceSimpleModel
  ): Promise<ServiceModel>;

  public async update(
    id: string,
    content: ServiceSimpleModel
  ): Promise<ServiceModel> {
    // Event Sourcing
    await this.handler.addEvent(
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

  protected initJournaly(): void {
    console.log('store:', this.element);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _self = this;
    _self.journaly.subscribe(this.element + '.' + 'update', _self.update);
    _self.journaly.subscribe(
      this.element + '.' + 'updateElement',
      _self.updateElement
    );
  }
}
