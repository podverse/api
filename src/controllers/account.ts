import { Request, Response } from 'express';
import Joi from 'joi';
import { ERROR_MESSAGES } from 'podverse-helpers';
import { AccountResetPasswordService, AccountService, AccountVerificationService } from 'podverse-orm';
import { v4 as uuidv4 } from 'uuid';
import { config } from '@api/config';
import { handleReturnDataOrNotFound } from '@api/controllers/helpers/data';
import { handleGenericErrorResponse } from '@api/controllers/helpers/error';
import { getPaginationParams } from '@api/controllers/helpers/pagination';
import { ensureAuthenticated } from '@api/lib/auth/';
import { sendVerificationEmail } from '@api/lib/mailer/sendVerificationEmail';
import { sendResetPasswordEmail } from '@api/lib/mailer/sendResetPasswordEmail';
import { validateBodyObject } from '@api/lib/validation';

const createAccountSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

const sendVerificationEmailSchema = Joi.object({
  email: Joi.string().email().required()
});

const verifyEmailSchema = Joi.object({
  token: Joi.string().required()
});

const sendResetPasswordEmailSchema = Joi.object({
  email: Joi.string().email().required()
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(8).required()
});

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

class AccountController {
  private static accountService = new AccountService();
  private static accountResetPasswordService = new AccountResetPasswordService();
  private static accountVerificationService = new AccountVerificationService();

  static async getByIdText(req: Request, res: Response): Promise<void> {
    try {
      const { id_text } = req.params;
      const config = { relations: publicRelations };
      // TODO: get if not a private account / not sharable
      const data = await AccountController.accountService.getByIdText(id_text, config);
      handleReturnDataOrNotFound(res, data, 'Account');
    } catch (error) {
      handleGenericErrorResponse(res, error);
    }
  }

  static async getLoggedInAccount(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      try {
        const account_id = req.user!.id;

        const data = await AccountController.accountService.get(account_id, { relations: [
          ...publicRelations,
          ...privateRelations
        ] });

        if (data?.account_credentials) {
          delete data.account_credentials.password;
        }

        handleReturnDataOrNotFound(res, data, 'Account');
      } catch (error) {
        handleGenericErrorResponse(res, error);
      }
    });
  }

  static async getMany(req: Request, res: Response): Promise<void> {
    try {
      const { page, limit, offset } = getPaginationParams(req);
      const channels = await AccountController.accountService.getMany({
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
      handleGenericErrorResponse(res, error);
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    validateBodyObject(createAccountSchema, req, res, async () => {
      try {
        const { email, password } = req.body;
        await AccountController.accountService.create({ email, password });
        await AccountController.sendVerificationEmailHelper(email);
        res.json({
          message: 'Account created'
        });
      } catch (error) {
        if (error instanceof Error && error.message === ERROR_MESSAGES.ACCOUNT.ALREADY_EXISTS) {
          res.json({
            message: 'Account created'
          });
        } else {
          handleGenericErrorResponse(res, error);
        }
      }
    });
  }

  static async sendVerificationEmail(req: Request, res: Response): Promise<void> {
    validateBodyObject(sendVerificationEmailSchema, req, res, async () => {
      try {
        const { email } = req.body;
        await AccountController.sendVerificationEmailHelper(email);
        res.json({
          message: 'Verification email sent'
        });
      } catch (error) {
        handleGenericErrorResponse(res, error);
      }
    });
  }

  private static async sendVerificationEmailHelper(email: string): Promise<void> {
    const account = await AccountController.accountService.getByEmail(email);

    if (!account) {
      throw new Error('Account not found.');
    }

    const verificationToken = uuidv4();
    const verificationTokenExpiresAt = new Date(Date.now() + config.verifyEmail.tokenExpiration);

    await AccountController.accountVerificationService.update(account, {
      verification_token: verificationToken,
      verification_token_expires_at: verificationTokenExpiresAt
    });

    await sendVerificationEmail(email, account.id_text, verificationToken);
  }

  static async verifyEmail(req: Request, res: Response): Promise<void> {
    validateBodyObject(verifyEmailSchema, req, res, async () => {
      try {
        const { token } = req.body;
        const accountVerification = await AccountController.accountVerificationService.getByToken(token);

        if (!accountVerification) {
          res.status(400).json({ message: 'Invalid or expired verification token' });
          return;
        }

        await AccountController.accountService.verifyEmail(accountVerification.account.id);

        res.json({ message: 'Email verified successfully' });
      } catch (error) {
        handleGenericErrorResponse(res, error);
      }
    });
  }

  static async sendResetPasswordEmail(req: Request, res: Response): Promise<void> {
    validateBodyObject(sendResetPasswordEmailSchema, req, res, async () => {
      try {
        const { email } = req.body;
        await AccountController.sendResetPasswordEmailHelper(email);
        res.json({
          message: 'Reset password email sent'
        });
      } catch (error) {
        handleGenericErrorResponse(res, error);
      }
    });
  }

  private static async sendResetPasswordEmailHelper(email: string): Promise<void> {
    const account = await AccountController.accountService.getByEmail(email);

    if (!account) {
      throw new Error('Account not found.');
    }

    const resetToken = uuidv4();
    const resetTokenExpiresAt = new Date(Date.now() + config.resetPassword.tokenExpiration);

    await AccountController.accountResetPasswordService.update(account, {
      reset_token: resetToken,
      reset_token_expires_at: resetTokenExpiresAt
    });

    await sendResetPasswordEmail(email, account.id_text, resetToken);
  }

  static async resetPassword(req: Request, res: Response): Promise<void> {
    validateBodyObject(resetPasswordSchema, req, res, async () => {
      try {
        const { token, password } = req.body;
        const accountResetPassword = await AccountController.accountResetPasswordService.getByToken(token);

        if (!accountResetPassword) {
          res.status(400).json({ message: 'Invalid or expired reset password token' });
          return;
        }

        await AccountController.accountService.resetPassword(accountResetPassword.account.id, password);

        res.json({ message: 'Password reset successfully' });
      } catch (error) {
        handleGenericErrorResponse(res, error);
      }
    });
  }
}

export { AccountController };
