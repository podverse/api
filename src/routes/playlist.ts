import { Router } from 'express';
import { config } from '@api/config';
import { PlaylistController } from '@api/controllers/playlist';
import { asyncHandler } from '@api/middleware/asyncHandler';

const router = Router();
router.use(`${config.api.prefix}${config.api.version}/playlist`, router);

router.get('/private', asyncHandler(PlaylistController.getManyPrivate));
router.get('/public', asyncHandler(PlaylistController.getManyPublic));
router.post('/', asyncHandler(PlaylistController.createPlaylist));
router.patch('/:playlist_id_text', asyncHandler(PlaylistController.updatePlaylist));
router.delete('/:playlist_id_text', asyncHandler(PlaylistController.deletePlaylist));

export const playlistRouter = router;
