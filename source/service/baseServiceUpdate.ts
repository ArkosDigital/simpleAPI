import ServiceUpdateAdapter from '../adapter/service/serviceUpdateAdapter';
import BaseServiceDefault from './baseServiceDefault';
import ServiceSimpleModel from '../model/serviceSimpleModel';
import ServiceModel from '../model/serviceModel';
import { Event, Operation } from 'flexiblepersistence';
import { settings } from 'ts-mixer';
import { Journaly } from 'journaly';
settings.initFunction = 'init';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
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

  protected init(handler, journaly: Journaly<any>): void {
    super.init(handler, journaly);
    console.log('store:', this.element);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    // this.journaly.subscribe(this.element + '.' + 'update', this.update);
    // this.journaly.subscribe(
    //   this.element + '.' + 'updateElement',
    //   this.updateElement
    // );
  }
}
