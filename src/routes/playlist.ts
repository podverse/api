import { Router } from 'express';
import { config } from '@api/config';
import { PlaylistController } from '@api/controllers/playlist';
import { PlaylistResourceBaseController } from '@api/controllers/playlistResourceBase';
import { PlaylistResourceClipController } from '@api/controllers/playlistResourceClip';
import { PlaylistResourceItemController } from '@api/controllers/playlistResourceItem';
import { asyncHandler } from '@api/middleware/asyncHandler';
import { PlaylistResourceItemAddByRSSController } from '@api/controllers/playlistResourceItemAddByRSS';
import { PlaylistResourceItemChapterController } from '@api/controllers/playlistResourceItemChapter';
import { PlaylistResourceItemSoundbiteController } from '@api/controllers/playlistResourceItemSoundbite';

const router = Router();
router.use(`${config.api.prefix}${config.api.version}/playlist`, router);

router.get('/private', asyncHandler(PlaylistController.getManyPrivate));
router.get('/public', asyncHandler(PlaylistController.getManyPublic));
router.post('/', asyncHandler(PlaylistController.createPlaylist));
router.get('/:playlist_id_text/resources/', asyncHandler(PlaylistResourceBaseController.getAllByPlaylistIdPublic));
router.patch('/:playlist_id_text', asyncHandler(PlaylistController.updatePlaylist));
router.delete('/:playlist_id_text', asyncHandler(PlaylistController.deletePlaylist));

router.post('/:playlist_id_text/clip/:clip_id_text/first', asyncHandler(PlaylistResourceClipController.addClipToPlaylistFirst));
router.post('/:playlist_id_text/clip/:clip_id_text/between', asyncHandler(PlaylistResourceClipController.addClipToPlaylistBetween));
router.post('/:playlist_id_text/clip/:clip_id_text/last', asyncHandler(PlaylistResourceClipController.addClipToPlaylistLast));
router.delete('/:playlist_id_text/clip/:clip_id_text', asyncHandler(PlaylistResourceClipController.removeClipFromPlaylist));

router.post('/:playlist_id_text/item/:item_id_text/first', asyncHandler(PlaylistResourceItemController.addItemToPlaylistFirst));
router.post('/:playlist_id_text/item/:item_id_text/between', asyncHandler(PlaylistResourceItemController.addItemToPlaylistBetween));
router.post('/:playlist_id_text/item/:item_id_text/last', asyncHandler(PlaylistResourceItemController.addItemToPlaylistLast));
router.delete('/:playlist_id_text/item/:item_id_text', asyncHandler(PlaylistResourceItemController.removeItemFromPlaylist));

router.post('/:playlist_id_text/item-add-by-rss/first', asyncHandler(PlaylistResourceItemAddByRSSController.addItemToPlaylistFirst));
router.post('/:playlist_id_text/item-add-by-rss/between', asyncHandler(PlaylistResourceItemAddByRSSController.addItemToPlaylistBetween));
router.post('/:playlist_id_text/item-add-by-rss/last', asyncHandler(PlaylistResourceItemAddByRSSController.addItemToPlaylistLast));
router.delete('/:playlist_id_text/item-add-by-rss', asyncHandler(PlaylistResourceItemAddByRSSController.removeItemFromPlaylist));

router.post('/:playlist_id_text/chapter/:item_chapter_id_text/first', asyncHandler(PlaylistResourceItemChapterController.addChapterToPlaylistFirst));
router.post('/:playlist_id_text/chapter/:item_chapter_id_text/between', asyncHandler(PlaylistResourceItemChapterController.addChapterToPlaylistBetween));
router.post('/:playlist_id_text/chapter/:item_chapter_id_text/last', asyncHandler(PlaylistResourceItemChapterController.addChapterToPlaylistLast));
router.delete('/:playlist_id_text/chapter/:item_chapter_id_text', asyncHandler(PlaylistResourceItemChapterController.removeChapterFromPlaylist));

router.post('/:playlist_id_text/soundbite/:soundbite_id_text/first', asyncHandler(PlaylistResourceItemSoundbiteController.addItemSoundbiteToPlaylistFirst));
router.post('/:playlist_id_text/soundbite/:soundbite_id_text/between', asyncHandler(PlaylistResourceItemSoundbiteController.addItemSoundbiteToPlaylistBetween));
router.post('/:playlist_id_text/soundbite/:soundbite_id_text/last', asyncHandler(PlaylistResourceItemSoundbiteController.addItemSoundbiteToPlaylistLast));
router.delete('/:playlist_id_text/soundbite/:soundbite_id_text', asyncHandler(PlaylistResourceItemSoundbiteController.removeItemSoundbiteFromPlaylist));

export const playlistRouter = router;
