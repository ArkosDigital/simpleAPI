import ServiceStoreAdapter from '../adapter/service/serviceStoreAdapter';
import BaseServiceDefault from './baseServiceDefault';
import ServiceSimpleModel from '../model/serviceSimpleModel';
import ServiceModel from '../model/serviceModel';
import { Event, Operation } from 'flexiblepersistence';
import { Journaly } from 'journaly';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default class BaseServiceStore extends BaseServiceDefault
  implements ServiceStoreAdapter {
  private initJournaly(): void {
    console.log('store:', this.className);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _self = this;
    _self.journaly.subscribe(
      this.className + '.' + 'store',
      (content: ServiceSimpleModel) => {
        _self.store(content);
      }
    );
    _self.journaly.subscribe(
      this.className + '.' + 'storeElement',
      (content: ServiceSimpleModel) => {
        _self.storeElement(content);
      }
    );
  }
  constructor(handler, journaly: Journaly) {
    super(handler, journaly);
    this.initJournaly();
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  protected abstract async storeElement(
    content: ServiceSimpleModel
  ): Promise<ServiceModel>;

  public async store(content: ServiceSimpleModel): Promise<ServiceModel> {
    // Event Sourcing
    const event = await this.handler.addEvent(
      new Event({
        operation: Operation.create,
        name: this.element,
        content,
      })
    );

    console.log('store');
    const result = await this.storeElement({
      ...content,
      id: event.receivedItem._id.toString(),
    });
    return result;
  }
}
