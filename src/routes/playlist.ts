import { Router } from 'express';
import { config } from '@api/config';
import { PlaylistController } from '@api/controllers/playlist';
import { asyncHandler } from '@api/middleware/asyncHandler';

const router = Router();
router.use(`${config.api.prefix}${config.api.version}/playlist`, router);

router.post('/', asyncHandler(PlaylistController.createPlaylist));
router.patch('/:playlist_id_text', asyncHandler(PlaylistController.updatePlaylist));
router.delete('/:playlist_id_text', asyncHandler(PlaylistController.deletePlaylist));
router.get('/', asyncHandler(PlaylistController.getPlaylists));

export const playlistRouter = router;
