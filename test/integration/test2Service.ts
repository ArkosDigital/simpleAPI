import {
  BaseService,
  ServiceModel,
  ServiceSimpleModel,
  Journaly,
} from '../../source/index';
export default class Test2Service extends BaseService {
  protected element = 'tests2';

  protected testDAO;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(handler, journaly: Journaly<any>) {
    super(handler, journaly);
  }

  public async selectElementById(id: string): Promise<ServiceModel> {
    return this.journaly.publish('tests.selectElementById', id)[0];
  }

  public async selectAllElements(): Promise<Array<ServiceModel>> {
    return this.journaly.publish('tests.selectAllElements')[0];
  }

  public async storeElement(
    content: ServiceSimpleModel
  ): Promise<ServiceModel> {
    return this.journaly.publish('tests.store', content)[0];
  }

  public async updateElement(
    id: string,
    content: ServiceSimpleModel
  ): Promise<ServiceModel> {
    return this.journaly.publish('tests.update', id, content)[0];
  }

  public async deleteElement(id: string): Promise<boolean> {
    return this.journaly.publish('tests.delete', id)[0];
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
