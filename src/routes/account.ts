import { Router } from 'express';
import { config } from '@api/config';
import { AccountController } from '@api/controllers/account';
import { asyncHandler } from '@api/middleware/asyncHandler';

const router = Router();

router.use(`${config.api.prefix}${config.api.version}/account`, router);

router.get('/:id_text', asyncHandler(AccountController.getByIdText));
router.get('/', asyncHandler(AccountController.getMany));
router.post('/', asyncHandler(AccountController.create));

export const accountRouter = router;
