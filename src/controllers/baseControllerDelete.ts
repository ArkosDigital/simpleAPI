import { Request, Response } from 'express';
import BaseControllerDefault from './baseControllerDefault';
import ControllerDeleteAdapter from '../interfaces/controller/controllerDeleteAdapter';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
export default class BaseControllerDelete extends BaseControllerDefault
  implements ControllerDeleteAdapter {
  // @ts-ignore
  protected abstract deleteElement(content: string): Promise<boolean>;

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      return res.json({ status: await this.deleteElement(id) });
    } catch (error) {
      return res
        .status(this.errorStatus[error.name])
        .send({ error: error.message });
    }
  }
}
