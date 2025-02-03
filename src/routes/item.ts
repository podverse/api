import { Router } from 'express';
import { config } from '@api/config';
import { ItemController } from '@api/controllers/item';
import { asyncHandler } from '@api/middleware/asyncHandler';

const router = Router();

router.use(`${config.api.prefix}${config.api.version}/item`, router);

router.use('/channel/:channelIdOrIdText/live-items', asyncHandler(ItemController.getManyWithLiveItemByChannel));
router.use('/channel/:channelIdOrIdText', asyncHandler(ItemController.getManyByChannel));

router.get('/:idOrIdText', asyncHandler(ItemController.getByIdOrTextId));
router.get('/', asyncHandler(ItemController.getMany));

export const itemRouter = router;
