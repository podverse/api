import { Request, Response } from 'express';
import { MediumService } from 'podverse-orm';

export class MediumController {
  private static mediumService = new MediumService();

  static async getAll(req: Request, res: Response): Promise<void> {
    const result = await MediumController.mediumService.getAll();
    res.json(result);
  }
}
