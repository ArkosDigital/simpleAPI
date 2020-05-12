import ServiceModel from '../model/serviceModel';
import ServiceSelectByIdAdapter from '../adapter/service/serviceSelectByIdAdapter';
import BaseServiceDefault from './baseServiceDefault';
import { settings } from 'ts-mixer';
import { Journaly } from 'journaly';
import { Handler } from 'flexiblepersistence';
settings.initFunction = 'init';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
export default class BaseServiceSelectById extends BaseServiceDefault
  implements ServiceSelectByIdAdapter {
  protected init(handler: Handler, journaly: Journaly<any>): void {
    super.init(handler, journaly);
    if (this) {
      if (this.selectById) {
        const boundedStore = this.selectById.bind(this);
        this.journaly.subscribe(
          this.element + '.' + 'selectById',
          boundedStore
        );
      }
      if (this.selectElementById) {
        const boundedStoreElement = this.selectElementById.bind(this);
        this.journaly.subscribe(
          this.element + '.' + 'selectElementById',
          boundedStoreElement
        );
      }
    }
  }
  // @ts-ignore
  protected abstract async selectElementById(id: string): Promise<ServiceModel>;

  public async selectById(id: string): Promise<ServiceModel> {
    const result = await this.selectElementById(id);
    return result;
  }
}
