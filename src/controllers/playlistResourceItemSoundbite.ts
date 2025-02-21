import { Request, Response } from 'express';
import { PlaylistResourceItemSoundbiteService } from 'podverse-orm';
import { handleGenericErrorResponse } from '@api/controllers/helpers/error';
import { verifyPlaylistOwnership } from '@api/controllers/playlist';
import { ensureAuthenticated } from '@api/lib/auth';

class PlaylistResourceItemSoundbiteController {
  private static playlistResourceItemSoundbiteService = new PlaylistResourceItemSoundbiteService();

  static async addItemSoundbiteToPlaylistFirst(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyPlaylistOwnership()(req, res, async () => {
        const { playlist_id_text, soundbite_id_text } = req.params;

        try {
          const playlistResourceItemSoundbite = await PlaylistResourceItemSoundbiteController.playlistResourceItemSoundbiteService.addItemSoundbiteToPlaylistFirst(playlist_id_text, soundbite_id_text);
          res.status(201).json(playlistResourceItemSoundbite);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async addItemSoundbiteToPlaylistLast(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyPlaylistOwnership()(req, res, async () => {
        const { playlist_id_text, soundbite_id_text } = req.params;

        try {
          const playlistResourceItemSoundbite = await PlaylistResourceItemSoundbiteController.playlistResourceItemSoundbiteService.addItemSoundbiteToPlaylistLast(playlist_id_text, soundbite_id_text);
          res.status(201).json(playlistResourceItemSoundbite);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async addItemSoundbiteToPlaylistBetween(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyPlaylistOwnership()(req, res, async () => {
        const { playlist_id_text, soundbite_id_text } = req.params;
        const { position1, position2 } = req.body;

        try {
          const playlistResourceItemSoundbite = await PlaylistResourceItemSoundbiteController.playlistResourceItemSoundbiteService.addItemSoundbiteToPlaylistBetween(playlist_id_text, soundbite_id_text, position1, position2);
          res.status(201).json(playlistResourceItemSoundbite);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async removeItemSoundbiteFromPlaylist(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyPlaylistOwnership()(req, res, async () => {
        const { playlist_id_text, soundbite_id_text } = req.params;

        try {
          await PlaylistResourceItemSoundbiteController.playlistResourceItemSoundbiteService.removeItemSoundbiteFromPlaylist(playlist_id_text, soundbite_id_text);
          res.status(204).end();
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }
}

export { PlaylistResourceItemSoundbiteController };