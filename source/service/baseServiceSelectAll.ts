import ServiceModel from '../model/serviceModel';
import ServiceSelectAllAdapter from '../adapter/service/serviceSelectAllAdapter';
import BaseServiceDefault from './baseServiceDefault';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default class BaseServiceSelectAll extends BaseServiceDefault
  implements ServiceSelectAllAdapter {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  protected abstract async selectAllElements(): Promise<Array<ServiceModel>>;
  public async selectAll(): Promise<Array<ServiceModel>> {
    const result = await this.selectAllElements();
    return result;
  }

  protected initJournaly(): void {
    console.log('store:', this.element);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _self = this;
    _self.journaly.subscribe(this.element + '.' + 'selectAll', _self.selectAll);
    _self.journaly.subscribe(
      this.element + '.' + 'selectAllElements',
      _self.selectAllElements
    );
  }
}
