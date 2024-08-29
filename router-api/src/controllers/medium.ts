import { Request, Response } from 'express';
import { MediumService } from '@orm/services/medium';

const mediumService = new MediumService();

export class MediumController {
  static async mediumsGetAll(req: Request, res: Response): Promise<void> {
    const result = await mediumService.mediumGetAll();
    res.json(result);
  }
}
