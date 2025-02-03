import { Router } from 'express';
import { config } from '@api/config';
import { ChannelController } from '@api/controllers/channel';
import { asyncHandler } from '@api/middleware/asyncHandler';

const router = Router();

router.use(`${config.api.prefix}${config.api.version}/channel`, router);

router.get('/:idOrIdText', asyncHandler(ChannelController.getByIdOrTextId));
router.get('/', asyncHandler(ChannelController.getMany));

export const channelRouter = router;
