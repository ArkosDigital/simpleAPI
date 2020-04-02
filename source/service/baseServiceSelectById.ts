import ServiceModel from '../model/serviceModel';
import ServiceSelectByIdAdapter from '../adapter/service/serviceSelectByIdAdapter';

export default class BaseServiceSelectById implements ServiceSelectByIdAdapter {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  protected abstract async selectElementById(id: string): Promise<ServiceModel>;

  public async selectById(id: string): Promise<ServiceModel> {
    const result = await this.selectElementById(id);
    return result;
  }
}
