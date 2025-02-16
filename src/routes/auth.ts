import { Router } from 'express';
import { config } from '@api/config';
import { AccountController } from '@api/controllers/account';
import { authenticate, logout } from '@api/lib/auth';
import { asyncHandler } from '@api/middleware/asyncHandler';

const router = Router();

router.use(`${config.api.prefix}${config.api.version}/auth`, router);

router.post('/login', authenticate);
router.post('/logout', logout);

router.get('/me', asyncHandler(AccountController.getLoggedInAccount));

export const authRouter = router;
