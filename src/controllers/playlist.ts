import { Request, Response } from "express";
import Joi from "joi";
import { PlaylistService } from "podverse-orm";
import { ensureAuthenticated } from "@api/lib/auth";
import { handleGenericErrorResponse } from "./helpers/error";
import { validateBodyObject } from "@api/lib/validation";

const playlistSchema = Joi.object({
  title: Joi.string().allow(null, ''),
  description: Joi.string().allow(null, ''),
  medium: Joi.number().min(1).required(),
  sharable_status: Joi.number().min(1).required(),
  is_default_favorites: Joi.boolean().required()
});

class PlaylistController {
  private static playlistService = new PlaylistService();

  static async createPlaylist(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      validateBodyObject(playlistSchema, req, res, async () => {
        const account = req.user!;
        const dto = req.body;

        try {
          const playlist = await PlaylistController.playlistService.createPlaylist(account.id, dto);
          res.status(201).json(playlist);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async updatePlaylist(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      validateBodyObject(playlistSchema, req, res, async () => {
        const account = req.user!;
        const { playlist_id_text } = req.params;
        const dto = req.body;

        try {
          const playlist = await PlaylistController.playlistService.updatePlaylist(account.id, playlist_id_text, dto);
          res.status(200).json(playlist);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async deletePlaylist(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      const account = req.user!;
      const { playlist_id_text } = req.params;

      try {
        await PlaylistController.playlistService.deletePlaylist(account.id, playlist_id_text);
        res.status(204).end();
      } catch (err) {
        handleGenericErrorResponse(res, err);
      }
    });
  }

  static async getPlaylists(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      const account = req.user!;

      try {
        const playlists = await PlaylistController.playlistService.getPlaylists(account.id);
        res.status(200).json(playlists);
      } catch (err) {
        handleGenericErrorResponse(res, err);
      }
    });
  }
}

export { PlaylistController };
