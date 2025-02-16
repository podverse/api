import { Request, Response } from "express";
import Joi from "joi";
import { AccountFollowingAccountService } from "podverse-orm";
import { ensureAuthenticated } from "@api/lib/auth";
import { handleGenericErrorResponse } from "./helpers/error";
import { validateBodyObject } from "@api/lib/validation";

const followAccountSchema = Joi.object({
  following_account_id: Joi.number().required()
});

class AccountFollowingAccountController {
  private static accountFollowingAccountService = new AccountFollowingAccountService();

  static async followAccount(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      validateBodyObject(followAccountSchema, req, res, async () => {
        const account = req.user!;
        const { following_account_id } = req.body;

        try {
          const accountFollowingAccount = await AccountFollowingAccountController.accountFollowingAccountService.followAccount(account.id, { following_account_id });
          res.status(201).json(accountFollowingAccount);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async unfollowAccount(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      validateBodyObject(followAccountSchema, req, res, async () => {
        const account = req.user!;
        const { following_account_id } = req.body;

        try {
          await AccountFollowingAccountController.accountFollowingAccountService.unfollowAccount(account.id, { following_account_id });
          res.status(204).end();
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }
}

export { AccountFollowingAccountController };
