import { Router } from 'express';
import { config } from '@api/config';
import { ClipController } from '@api/controllers/clip';
import { asyncHandler } from '@api/middleware/asyncHandler';

const router = Router();
router.use(`${config.api.prefix}${config.api.version}/clip`, router);

router.post('/', asyncHandler(ClipController.createClip));
router.patch('/:clip_id_text', asyncHandler(ClipController.updateClip));
router.delete('/:clip_id_text', asyncHandler(ClipController.deleteClip));
router.get('/:clip_id_text', asyncHandler(ClipController.getClipById));
router.get('/account', asyncHandler(ClipController.getClipsByAccount));

export const clipRouter = router;
