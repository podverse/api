import { Request, Response } from 'express';
import { CategoryService } from 'podverse-orm';
import { handleReturnDataOrNotFound } from '@api/controllers/helpers/data';
import { handleInternalError } from '@api/controllers/helpers/error';

const categoryService = new CategoryService();

export class CategoryController {
  static async get(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const numericId = parseInt(id, 10);
      const data = await categoryService.get(numericId);
      handleReturnDataOrNotFound(res, data, 'Category');
    } catch (error) {
      handleInternalError(res, error);
    }
  }

  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const categories = await categoryService.getAll();
      res.json({ data: categories });
    } catch (error) {
      handleInternalError(res, error);
    }
  }
}
