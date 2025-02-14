import { Router } from 'express';
import { authenticate, ensureAuthenticated, logout } from '@api/middleware/auth';
import { config } from '@api/config';
import { asyncHandler } from '@api/middleware/asyncHandler';
import { AccountController } from '@api/controllers/account';

const router = Router();

router.use(`${config.api.prefix}${config.api.version}/auth`, router);

router.post('/login', authenticate);
router.post('/logout', logout);

router.get('/me', ensureAuthenticated, asyncHandler(AccountController.getLoggedInAccount));

export const authRouter = router;
