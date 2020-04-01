import { Request, Response } from 'express';
import ServiceModel from '../models/serviceModel';
import ControllerIndexAdapter from '../interfaces/controller/controllerIndexAdapter';
import BaseControllerDefault from './baseControllerDefault';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
export default class BaseControllerIndex extends BaseControllerDefault
  implements ControllerIndexAdapter {
  // @ts-ignore
  protected abstract selectById(id: string): Promise<ServiceModel>;

  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const object = {};
      object[this.element] = await this.selectById(id);
      return res.json(object);
    } catch (error) {
      return res
        .status(this.errorStatus[error.name])
        .send({ error: error.message });
    }
  }
}
