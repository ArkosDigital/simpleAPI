import ServiceModel from '../../models/serviceModel';

export default interface ServiceSelectByIdAdapter {
  selectById(id: string): Promise<ServiceModel>;
}
