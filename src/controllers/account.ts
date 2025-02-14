import { Request, Response } from 'express';
import { AccountService } from 'podverse-orm';
import { handleReturnDataOrNotFound } from '@api/controllers/helpers/data';
import { handleInternalError } from '@api/controllers/helpers/error';
import { getPaginationParams } from '@api/controllers/helpers/pagination';
import { ERROR_MESSAGES } from 'podverse-helpers';

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
}
