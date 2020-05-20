/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {
  BaseService,
  ServiceModel,
  ServiceSimpleModel,
} from '../../source/index';
export default class TestService extends BaseService {
  public async selectElementById(id: string): Promise<ServiceModel> {
    // @ts-ignore
    return (await this.dAO('selectById', id))[0];
  }

  public async selectAllElements(): Promise<Array<ServiceModel>> {
    // @ts-ignore
    return (await this.journaly.publish('TestDAO.selectAll'))[0];
  }

  public async storeElement(
    content: ServiceSimpleModel
  ): Promise<ServiceModel> {
    // console.log('store:' + content);
    // @ts-ignore
    return (await this.journaly.publish('TestDAO.store', content))[0];
  }

  public async updateElement(
    id: string,
    content: ServiceSimpleModel
  ): Promise<ServiceModel> {
    // @ts-ignore
    return (await this.journaly.publish('TestDAO.update', id, content))[0];
  }

  public async deleteElement(id: string): Promise<boolean> {
    // @ts-ignore
    return (await this.journaly.publish('TestDAO.delete', id))[0];
  }

  public selectById(id: string): Promise<ServiceModel> {
    // @ts-ignore
    return super.selectById(id) as Promise<ServiceModel>;
  }

  public selectAll(): Promise<Array<ServiceModel>> {
    // @ts-ignore
    return super.selectAll() as Promise<Array<ServiceModel>>;
  }

  public store(content: ServiceSimpleModel): Promise<ServiceModel> {
    // @ts-ignore
    return super.store(content) as Promise<ServiceModel>;
  }

  public update(
    id: string,
    content: ServiceSimpleModel
  ): Promise<ServiceModel> {
    // @ts-ignore
    return super.update(id, content) as Promise<ServiceModel>;
  }
}
