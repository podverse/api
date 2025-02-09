import { Router } from 'express';
import { config } from '@api/config';
import { CategoryController } from '@api/controllers/category';
import { asyncHandler } from '@api/middleware/asyncHandler';

const router = Router();

router.use(`${config.api.prefix}${config.api.version}/category`, router);

router.get('/:id', asyncHandler(CategoryController.get));
router.get('/', asyncHandler(CategoryController.getAll));

export const categoryRouter = router;
