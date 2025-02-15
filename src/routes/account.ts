import { Router } from 'express';
import { config } from '@api/config';
import { AccountController } from '@api/controllers/account';
import { asyncHandler } from '@api/middleware/asyncHandler';

const router = Router();

router.use(`${config.api.prefix}${config.api.version}/account`, router);

router.get('/:id_text', asyncHandler(AccountController.getByIdText));
router.get('/', asyncHandler(AccountController.getMany));

router.post('/send-verification-email', asyncHandler(AccountController.sendVerificationEmail));
router.post('/send-reset-password-email', asyncHandler(AccountController.sendResetPasswordEmail));
router.post('/verify-email', asyncHandler(AccountController.verifyEmail));
router.post('/reset-password', asyncHandler(AccountController.resetPassword));
router.post('/', asyncHandler(AccountController.create));

export const accountRouter = router;
