/* eslint-disable no-unused-vars */
import {
  BaseService,
  ServiceModel,
  ServiceSimpleModel,
  Journaly,
} from '../../source/index';
import { settings } from 'ts-mixer';
settings.initFunction = 'init';
export default class TestService extends BaseService {
  protected testDAO;

  constructor(handler, journaly: Journaly<any>, testDAO) {
    super();
    this.testDAO = testDAO;
  }

  protected init(handler, journaly: Journaly<any>): void {
    super.init(handler, journaly);
  }

  public async selectElementById(id: string): Promise<ServiceModel> {
    return this.testDAO.selectById(id);
  }

  public async selectAllElements(): Promise<Array<ServiceModel>> {
    return this.testDAO.selectAll();
  }

  public async storeElement(
    content: ServiceSimpleModel
  ): Promise<ServiceModel> {
    return this.testDAO.store(content);
  }

  public async updateElement(
    id: string,
    content: ServiceSimpleModel
  ): Promise<ServiceModel> {
    return this.testDAO.update(id, content);
  }

  public async deleteElement(id: string): Promise<boolean> {
    return this.testDAO.delete(id);
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
