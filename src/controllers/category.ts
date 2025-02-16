import { Request, Response } from 'express';
import { CategoryService } from 'podverse-orm';
import { handleReturnDataOrNotFound } from '@api/controllers/helpers/data';
import { handleGenericErrorResponse } from '@api/controllers/helpers/error';

export class CategoryController {
  private static categoryService = new CategoryService();

  static async get(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const numericId = parseInt(id, 10);
      const data = await CategoryController.categoryService.get(numericId);
      handleReturnDataOrNotFound(res, data, 'Category');
    } catch (error) {
      handleGenericErrorResponse(res, error);
    }
  }

  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const categories = await CategoryController.categoryService.getAll();
      res.json({ data: categories });
    } catch (error) {
      handleGenericErrorResponse(res, error);
    }
  }
}
