import { Router } from 'express';
import { config } from '@api/config';
import { ItemController } from '@api/controllers/item';
import { asyncHandler } from '@api/middleware/asyncHandler';

const router = Router();

router.use(`${config.api.prefix}${config.api.version}/item`, router);

router.get('/channel/:channelIdOrIdText/live-items', asyncHandler(ItemController.getManyWithLiveItemByChannel));
router.get('/channel/:channelIdOrIdText', asyncHandler(ItemController.getManyByChannel));
router.get('/:idOrIdText', asyncHandler(ItemController.getByIdOrIdText));
router.get('/', asyncHandler(ItemController.getMany));

router.get('/chapters/:item_id_text', asyncHandler(ItemController.parseAndGetChapters));

export const itemRouter = router;
