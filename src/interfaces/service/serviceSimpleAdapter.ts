import ServiceModel from '../../models/serviceModel';

export default interface ServiceSimpleAdapter {
  selectAll(): Promise<Array<ServiceModel>>;
}
