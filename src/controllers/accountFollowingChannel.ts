import { Request, Response } from "express";
import Joi from "joi";
import { AccountFollowingChannelService } from "podverse-orm";
import { ensureAuthenticated } from "@api/lib/auth";
import { handleGenericErrorResponse } from "./helpers/error";
import { validateBodyObject } from "@api/lib/validation";

const followChannelSchema = Joi.object({
  channel_id: Joi.number().required()
});

class AccountFollowingChannelController {
  private static accountFollowingChannelService = new AccountFollowingChannelService();

  static async followChannel(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      validateBodyObject(followChannelSchema, req, res, async () => {
        const account = req.user!;
        const { channel_id } = req.body;

        try {
          await AccountFollowingChannelController.accountFollowingChannelService.followChannel(account.id, { channel_id });
          res.status(204).end();
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async unfollowChannel(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      validateBodyObject(followChannelSchema, req, res, async () => {
        const account = req.user!;
        const { channel_id } = req.body;

        try {
          await AccountFollowingChannelController.accountFollowingChannelService.unfollowChannel(account.id, { channel_id });
          res.status(204).end();
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }
}

export { AccountFollowingChannelController };
