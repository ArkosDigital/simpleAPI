import ServiceDeleteAdapter from '../adapter/service/serviceDeleteAdapter';
import BaseServiceDefault from './baseServiceDefault';
import { Event, Operation } from 'flexiblepersistence';
import { settings } from 'ts-mixer';
import { Journaly } from 'journaly';
settings.initFunction = 'init';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
export default class BaseServiceDelete extends BaseServiceDefault
  implements ServiceDeleteAdapter {
  protected init(handler, journaly: Journaly<any>): void {
    super.init(handler, journaly);
    if (this) {
      if (this.delete) {
        const boundedStore = this.delete.bind(this);
        this.journaly.subscribe(this.element + '.' + 'delete', boundedStore);
      }
      if (this.deleteElement) {
        const boundedStoreElement = this.deleteElement.bind(this);
        this.journaly.subscribe(
          this.element + '.' + 'deleteElement',
          boundedStoreElement
        );
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  protected abstract async deleteElement(id: string): Promise<boolean>;
  public async delete(id: string): Promise<boolean> {
    // Event Sourcing
    await this.handler.addEvent(
      new Event({
        operation: Operation.delete,
        name: this.element,
        selection: { _id: id },
      })
    );
    console.log('delete');

    const result = await this.deleteElement(id);
    return result;
  }
}
