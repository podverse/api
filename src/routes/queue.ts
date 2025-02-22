import { Router } from 'express';
import { QueueController } from '@api/controllers/queue';
import { asyncHandler } from '@api/middleware/asyncHandler';
import { config } from '@api/config';
import { QueueResourceBaseController } from '@api/controllers/queueResourceBase';
import { QueueResourceItemController } from '@api/controllers/queueResourceItem';

const router = Router();
router.use(`${config.api.prefix}${config.api.version}/queue`, router);

router.post('/', asyncHandler(QueueController.create));
// router.delete('/:queue_id_text', asyncHandler(QueueController.delete)); // This may not be needed
router.get('/all-for-account/private', asyncHandler(QueueController.getAllPrivate));
router.get('/:queue_id_text/resources', asyncHandler(QueueResourceBaseController.getAllByQueueIdPrivate));

router.post('/:queue_id_text/item/:item_id_text/now-playing', asyncHandler(QueueResourceItemController.addItemToNowPlaying));
router.post('/:queue_id_text/item/:item_id_text/next', asyncHandler(QueueResourceItemController.addItemToQueueNext));
router.post('/:queue_id_text/item/:item_id_text/last', asyncHandler(QueueResourceItemController.addItemToQueueLast));
router.post('/:queue_id_text/item/:item_id_text/between', asyncHandler(QueueResourceItemController.addItemToQueueBetween));
router.post('/:queue_id_text/item/:item_id_text/history', asyncHandler(QueueResourceItemController.addItemToHistory));
router.delete('/:queue_id_text/item/:item_id_text', asyncHandler(QueueResourceItemController.removeItemFromQueue));

export const queueRouter = router;
