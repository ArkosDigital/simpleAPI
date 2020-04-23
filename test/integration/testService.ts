/* eslint-disable no-unused-vars */
import {
  BaseService,
  ServiceModel,
  ServiceSimpleModel,
  Journaly,
} from '../../source/index';
export default class TestService extends BaseService {
  public async selectElementById(id: string): Promise<ServiceModel> {
    return (await this.journaly.publish('TestDAO.selectById', id))[0];
  }

  public async selectAllElements(): Promise<Array<ServiceModel>> {
    return (await this.journaly.publish('TestDAO.selectAll'))[0];
  }

  public async storeElement(
    content: ServiceSimpleModel
  ): Promise<ServiceModel> {
    console.log('store:' + content);
    return (await this.journaly.publish('TestDAO.store', content))[0];
  }

  public async updateElement(
    id: string,
    content: ServiceSimpleModel
  ): Promise<ServiceModel> {
    return (await this.journaly.publish('TestDAO.update', id, content))[0];
  }

  public async deleteElement(id: string): Promise<boolean> {
    return (await this.journaly.publish('TestDAO.delete', id))[0];
  }

  public selectById(id: string): Promise<ServiceModel> {
    return super.selectById(id) as Promise<ServiceModel>;
  }

  public selectAll(): Promise<Array<ServiceModel>> {
    return super.selectAll() as Promise<Array<ServiceModel>>;
  }

  public store(content: ServiceSimpleModel): Promise<ServiceModel> {
    return super.store(content) as Promise<ServiceModel>;
  }

  public update(
    id: string,
    content: ServiceSimpleModel
  ): Promise<ServiceModel> {
    return super.update(id, content) as Promise<ServiceModel>;
  }
}
