import ServiceModel from '../model/serviceModel';
import ServiceSelectAllAdapter from '../adapter/service/serviceSelectAllAdapter';
import BaseServiceDefault from './baseServiceDefault';
import { settings } from 'ts-mixer';
import { Journaly } from 'journaly';
settings.initFunction = 'init';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
export default class BaseServiceSelectAll extends BaseServiceDefault
  implements ServiceSelectAllAdapter {
  // @ts-ignore
  protected abstract async selectAllElements(): Promise<Array<ServiceModel>>;
  public async selectAll(): Promise<Array<ServiceModel>> {
    const result = await this.selectAllElements();
    return result;
  }

  protected init(handler, journaly: Journaly<any>): void {
    super.init(handler, journaly);
    if (this) {
      if (this.selectAll) {
        const boundedStore = this.selectAll.bind(this);
        this.journaly.subscribe(this.element + '.' + 'selectAll', boundedStore);
      }
      if (this.selectAllElements) {
        const boundedStoreElement = this.selectAllElements.bind(this);
        this.journaly.subscribe(
          this.element + '.' + 'selectAllElements',
          boundedStoreElement
        );
      }
    }
  }
}
