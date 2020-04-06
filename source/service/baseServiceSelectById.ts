import ServiceModel from '../model/serviceModel';
import ServiceSelectByIdAdapter from '../adapter/service/serviceSelectByIdAdapter';
import BaseServiceDefault from './baseServiceDefault';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default class BaseServiceSelectById extends BaseServiceDefault
  implements ServiceSelectByIdAdapter {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  protected abstract async selectElementById(id: string): Promise<ServiceModel>;

  public async selectById(id: string): Promise<ServiceModel> {
    const result = await this.selectElementById(id);
    return result;
  }

  protected initJournaly(): void {
    console.log('store:', this.element);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _self = this;
    _self.journaly.subscribe(
      this.element + '.' + 'selectById',
      _self.selectById
    );
    _self.journaly.subscribe(
      this.element + '.' + 'selectElementById',
      _self.selectElementById
    );
  }
}
