import { Request, Response } from "express";
import Joi from "joi";
import { AccountFollowingPlaylistService } from "podverse-orm";
import { ensureAuthenticated } from "@api/lib/auth";
import { handleGenericErrorResponse } from "./helpers/error";
import { validateBodyObject } from "@api/lib/validation";

const followPlaylistSchema = Joi.object({
  playlist_id: Joi.number().required()
});

class AccountFollowingPlaylistController {
  private static accountFollowingPlaylistService = new AccountFollowingPlaylistService();

  static async followPlaylist(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      validateBodyObject(followPlaylistSchema, req, res, async () => {
        const account = req.user!;
        const { playlist_id } = req.body;

        try {
          await AccountFollowingPlaylistController.accountFollowingPlaylistService.followPlaylist(account.id, { playlist_id });
          res.status(204).end();
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async unfollowPlaylist(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      validateBodyObject(followPlaylistSchema, req, res, async () => {
        const account = req.user!;
        const { playlist_id } = req.body;

        try {
          await AccountFollowingPlaylistController.accountFollowingPlaylistService.unfollowPlaylist(account.id, { playlist_id });
          res.status(204).end();
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }
}

export { AccountFollowingPlaylistController };
