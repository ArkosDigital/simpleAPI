import { Request, Response } from 'express';
import ServiceModel from '../model/serviceModel';
import ServiceSimpleModel from '../model/serviceSimpleModel';
import BaseControllerDefault from './baseControllerDefault';
import ControllerStoreAdapter from '../adapter/controller/controllerStoreAdapter';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
export default class BaseControllerStore extends BaseControllerDefault
  implements ControllerStoreAdapter {
  // @ts-ignore
  protected abstract storeElement(
    content: ServiceSimpleModel
  ): Promise<ServiceModel>;

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const content = req.body as ServiceSimpleModel;
      const object = {};
      object[this.element] = await this.storeElement(content);
      return res.json(object);
    } catch (error) {
      return res
        .status(this.errorStatus[error.name])
        .send({ error: error.message });
    }
  }
}
