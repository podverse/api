import { Router } from 'express';
import { QueueController } from '@api/controllers/queue';
import { asyncHandler } from '@api/middleware/asyncHandler';
import { config } from '@api/config';
import { QueueResourceBaseController } from '@api/controllers/queueResourceBase';
import { QueueResourceItemController } from '@api/controllers/queueResourceItem';
import { QueueResourceClipController } from '@api/controllers/queueResourceClip';
import { QueueResourceItemAddByRSSController } from '@api/controllers/queueResourceItemAddByRSS';
import { QueueResourceItemChapterController } from '@api/controllers/queueResourceItemChapter';

const router = Router();
router.use(`${config.api.prefix}${config.api.version}/queue`, router);

router.post('/', asyncHandler(QueueController.create));
// router.delete('/:queue_id_text', asyncHandler(QueueController.delete)); // This may not be needed
router.get('/all-for-account/private', asyncHandler(QueueController.getAllPrivate));
router.get('/:queue_id_text/resources', asyncHandler(QueueResourceBaseController.getAllByQueueIdPrivate));

router.post('/:queue_id_text/clip/:clip_id_text/now-playing', asyncHandler(QueueResourceClipController.addClipToNowPlaying));
router.post('/:queue_id_text/clip/:clip_id_text/next', asyncHandler(QueueResourceClipController.addClipToQueueNext));
router.post('/:queue_id_text/clip/:clip_id_text/last', asyncHandler(QueueResourceClipController.addClipToQueueLast));
router.post('/:queue_id_text/clip/:clip_id_text/between', asyncHandler(QueueResourceClipController.addClipToQueueBetween));
router.post('/:queue_id_text/clip/:clip_id_text/history', asyncHandler(QueueResourceClipController.addClipToHistory));
router.delete('/:queue_id_text/clip/:clip_id_text', asyncHandler(QueueResourceClipController.removeClipFromQueue));

router.post('/:queue_id_text/item/:item_id_text/now-playing', asyncHandler(QueueResourceItemController.addItemToNowPlaying));
router.post('/:queue_id_text/item/:item_id_text/next', asyncHandler(QueueResourceItemController.addItemToQueueNext));
router.post('/:queue_id_text/item/:item_id_text/last', asyncHandler(QueueResourceItemController.addItemToQueueLast));
router.post('/:queue_id_text/item/:item_id_text/between', asyncHandler(QueueResourceItemController.addItemToQueueBetween));
router.post('/:queue_id_text/item/:item_id_text/history', asyncHandler(QueueResourceItemController.addItemToHistory));
router.delete('/:queue_id_text/item/:item_id_text', asyncHandler(QueueResourceItemController.removeItemFromQueue));

router.post('/:queue_id_text/item-add-by-rss/now-playing', asyncHandler(QueueResourceItemAddByRSSController.addItemToNowPlaying));
router.post('/:queue_id_text/item-add-by-rss/next', asyncHandler(QueueResourceItemAddByRSSController.addItemToQueueNext));
router.post('/:queue_id_text/item-add-by-rss/last', asyncHandler(QueueResourceItemAddByRSSController.addItemToQueueLast));
router.post('/:queue_id_text/item-add-by-rss/between', asyncHandler(QueueResourceItemAddByRSSController.addItemToQueueBetween));
router.post('/:queue_id_text/item-add-by-rss/history', asyncHandler(QueueResourceItemAddByRSSController.addItemToHistory));
router.delete('/:queue_id_text/item-add-by-rss/:hash_id', asyncHandler(QueueResourceItemAddByRSSController.removeItemFromQueue));

router.post('/:queue_id_text/item-chapter/:item_chapter_id_text/now-playing', asyncHandler(QueueResourceItemChapterController.addItemChapterToNowPlaying));
router.post('/:queue_id_text/item-chapter/:item_chapter_id_text/next', asyncHandler(QueueResourceItemChapterController.addItemChapterToQueueNext));
router.post('/:queue_id_text/item-chapter/:item_chapter_id_text/last', asyncHandler(QueueResourceItemChapterController.addItemChapterToQueueLast));
router.post('/:queue_id_text/item-chapter/:item_chapter_id_text/between', asyncHandler(QueueResourceItemChapterController.addItemChapterToQueueBetween));
router.post('/:queue_id_text/item-chapter/:item_chapter_id_text/history', asyncHandler(QueueResourceItemChapterController.addItemChapterToHistory));
router.delete('/:queue_id_text/item-chapter/:item_chapter_id_text', asyncHandler(QueueResourceItemChapterController.removeItemChapterFromQueue));

export const queueRouter = router;
