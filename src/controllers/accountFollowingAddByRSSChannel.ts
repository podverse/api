import { Request, Response } from "express";
import Joi from "joi";
import { AccountFollowingAddByRSSChannelService } from "podverse-orm";
import { ensureAuthenticated } from "@api/lib/auth";
import { handleGenericErrorResponse } from "./helpers/error";
import { validateBodyObject } from "@api/lib/validation";

const addRSSChannelSchema = Joi.object({
  feed_url: Joi.string().uri().required(),
  title: Joi.string().allow(null, ''),
  image_url: Joi.string().uri().allow(null, '')
});

class AccountFollowingAddByRSSChannelController {
  private static accountFollowingAddByRSSChannelService = new AccountFollowingAddByRSSChannelService();

  static async addOrUpdateRSSChannel(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      validateBodyObject(addRSSChannelSchema, req, res, async () => {
        const account = req.user!;
        const dto = req.body;

        try {
          await AccountFollowingAddByRSSChannelController.accountFollowingAddByRSSChannelService.addOrUpdateRSSChannel(account.id, dto);
          res.status(204).end();
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async removeRSSChannel(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      const account = req.user!;
      const { feed_url } = req.body;

      try {
        await AccountFollowingAddByRSSChannelController.accountFollowingAddByRSSChannelService.removeRSSChannel(account.id, feed_url);
        res.status(204).end();
      } catch (err) {
        handleGenericErrorResponse(res, err);
      }
    });
  }
}

export { AccountFollowingAddByRSSChannelController };
