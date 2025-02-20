import { Router } from 'express';
import { config } from '@api/config';
import { PlaylistController } from '@api/controllers/playlist';
import { PlaylistResourceBaseController } from '@api/controllers/playlistResourceBase';
import { PlaylistResourceClipController } from '@api/controllers/playlistResourceClip';
import { asyncHandler } from '@api/middleware/asyncHandler';

const router = Router();
router.use(`${config.api.prefix}${config.api.version}/playlist`, router);

router.get('/private', asyncHandler(PlaylistController.getManyPrivate));
router.get('/public', asyncHandler(PlaylistController.getManyPublic));
router.post('/', asyncHandler(PlaylistController.createPlaylist));
router.get('/resources/:playlist_id_text', asyncHandler(PlaylistResourceBaseController.getAllByPlaylistIdPublic));
router.patch('/:playlist_id_text', asyncHandler(PlaylistController.updatePlaylist));
router.delete('/:playlist_id_text', asyncHandler(PlaylistController.deletePlaylist));

router.post('/:playlist_id_text/clip/:clip_id_text/first', asyncHandler(PlaylistResourceClipController.addClipToPlaylistFirst));
router.post('/:playlist_id_text/clip/:clip_id_text/between', asyncHandler(PlaylistResourceClipController.addClipToPlaylistBetween));
router.post('/:playlist_id_text/clip/:clip_id_text/last', asyncHandler(PlaylistResourceClipController.addClipToPlaylistLast));
router.delete('/:playlist_id_text/clip/:clip_id_text', asyncHandler(PlaylistResourceClipController.removeClipFromPlaylist));

export const playlistRouter = router;
