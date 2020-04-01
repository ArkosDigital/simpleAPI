import { Request, Response } from 'express';
import ServiceModel from '../models/serviceModel';
import ServiceSimpleModel from '../models/serviceSimpleModel';
import BaseControllerDefault from './baseControllerDefault';
import ControllerUpdateAdapter from '../interfaces/controller/controllerUpdateAdapter';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
export default class BaseControllerUpdate extends BaseControllerDefault
  implements ControllerUpdateAdapter {
  // @ts-ignore
  protected abstract updateElement(
    id: string,
    content: ServiceSimpleModel
  ): Promise<ServiceModel>;

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const content = req.body as ServiceSimpleModel;
      const object = {};
      object[this.element] = await this.updateElement(id, content);
      return res.json(object);
    } catch (error) {
      return res
        .status(this.errorStatus[error.name])
        .send({ error: error.message });
    }
  }
}
