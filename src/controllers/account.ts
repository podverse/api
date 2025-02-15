import { Request, Response } from 'express';
import { ERROR_MESSAGES } from 'podverse-helpers';
import { AccountResetPasswordService, AccountService, AccountVerificationService } from 'podverse-orm';
import { v4 as uuidv4 } from 'uuid';
import { config } from '@api/config';
import { handleReturnDataOrNotFound } from '@api/controllers/helpers/data';
import { handleInternalError } from '@api/controllers/helpers/error';
import { getPaginationParams } from '@api/controllers/helpers/pagination';
import { sendVerificationEmail } from '@api/lib/mailer/sendVerificationEmail';
import { sendResetPasswordEmail } from '@api/lib/mailer/sendResetPasswordEmail';

const accountService = new AccountService();

const publicRelations = [
  'account_following_channels',
  'account_profile',
];

const privateRelations = [
  'account_admin_roles',
  // 'account_app_store_purchases',
  'account_credentials',
  // 'account_fcm_devices',
  'account_following_accounts',
  'account_following_add_by_rss_channels',
  'account_following_playlists',
  // 'account_google_play_purchases',
  'account_membership_status',
  'account_membership_status.account_membership',
  'account_notifications',
  // 'account_paypal_orders',
  // 'account_reset_password',
  // 'account_up_devices',
  // 'account_verification'
];

async function sendVerificationEmailHelper(email: string): Promise<void> {
  const account = await accountService.getByEmail(email);

  if (!account) {
    throw new Error('Account not found.');
  }

  const verificationToken = uuidv4();
  const verificationTokenExpiresAt = new Date(Date.now() + config.verifyEmail.tokenExpiration);

  const accountVerificationService = new AccountVerificationService();
  await accountVerificationService.update(account, {
    verification_token: verificationToken,
    verification_token_expires_at: verificationTokenExpiresAt
  });

  await sendVerificationEmail(email, account.id_text, verificationToken);
}

async function sendResetPasswordEmailHelper(email: string): Promise<void> {
  const account = await accountService.getByEmail(email);

  if (!account) {
    throw new Error('Account not found.');
  }

  const resetToken = uuidv4();
  const resetTokenExpiresAt = new Date(Date.now() + config.resetPassword.tokenExpiration);

  const accountResetPasswordService = new AccountResetPasswordService();
  await accountResetPasswordService.update(account, {
    reset_token: resetToken,
    reset_token_expires_at: resetTokenExpiresAt
  });

  await sendResetPasswordEmail(email, account.id_text, resetToken);
}

export class AccountController {
  static async getByIdText(req: Request, res: Response): Promise<void> {
    try {
      const { id_text } = req.params;
      const config = { relations: publicRelations };
      const data = await accountService._getByIdText(id_text, config);
      handleReturnDataOrNotFound(res, data, 'Account');
    } catch (error) {
      handleInternalError(res, error);
    }
  }

  static async getLoggedInAccount(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;

      if (!user?.id) {
        throw new Error('User is not logged in.');
      }

      const data = await accountService.get(user.id, { relations: [
        ...publicRelations,
        ...privateRelations
      ] });

      if (data?.account_credentials) {
        delete data.account_credentials.password;
      }

      handleReturnDataOrNotFound(res, data, 'Account');
    } catch (error) {
      handleInternalError(res, error);
    }
  }

  static async getMany(req: Request, res: Response): Promise<void> {
    try {
      const { page, limit, offset } = getPaginationParams(req);
      const channels = await accountService.getMany({
        skip: offset,
        take: limit,
        relations: publicRelations
      });

      res.json({
        data: channels,
        meta: {
          page
        }
      });
    } catch (error) {
      handleInternalError(res, error);
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      await accountService.create({ email, password });
      await sendVerificationEmailHelper(email);
      res.json({
        message: 'Account created'
      });
    } catch (error) {
      // If account already exists, return "Account created" so we do not leak
      // which emails are saved in our database.
      if (error instanceof Error && error.message === ERROR_MESSAGES.ACCOUNT.ALREADY_EXISTS) {
        res.json({
          message: 'Account created'
        });
      } else {
        handleInternalError(res, error);
      }
    }
  }

  static async sendVerificationEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      await sendVerificationEmailHelper(email);
      res.json({
        message: 'Verification email sent'
      });
    } catch (error) {
      handleInternalError(res, error);
    }
  }

  static async verifyEmail(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.body;
      const accountVerificationService = new AccountVerificationService();
      const accountVerification = await accountVerificationService.getByToken(token);

      if (!accountVerification) {
        res.status(400).json({ message: 'Invalid or expired verification token' });
        return;
      }

      const accountService = new AccountService();
      await accountService.verifyEmail(accountVerification.account.id);

      res.json({ message: 'Email verified successfully' });
    } catch (error) {
      handleInternalError(res, error);
    }
  }

  static async sendResetPasswordEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      await sendResetPasswordEmailHelper(email);
      res.json({
        message: 'Reset password email sent'
      });
    } catch (error) {
      handleInternalError(res, error);
    }
  }

  static async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { token, password } = req.body;
      const accountResetPasswordService = new AccountResetPasswordService();
      const accountResetPassword = await accountResetPasswordService.getByToken(token);

      if (!accountResetPassword) {
        res.status(400).json({ message: 'Invalid or expired reset password token' });
        return;
      }

      const accountService = new AccountService();
      await accountService.resetPassword(accountResetPassword.account.id, password);

      res.json({ message: 'Password reset successfully' });
    } catch (error) {
      handleInternalError(res, error);
    }
  }
}
