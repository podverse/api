import { Request, Response } from 'express';
import { PlaylistResourceItemService } from 'podverse-orm';
import { handleGenericErrorResponse } from '@api/controllers/helpers/error';
import { verifyPlaylistOwnership } from '@api/controllers/playlist';
import { ensureAuthenticated } from '@api/lib/auth';

class PlaylistResourceItemController {
  private static playlistResourceItemService = new PlaylistResourceItemService();

  static async addItemToPlaylistFirst(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyPlaylistOwnership()(req, res, async () => {
        const { playlist_id_text, item_id_text } = req.params;

        try {
          const playlistResourceItem = await PlaylistResourceItemController.playlistResourceItemService.addItemToPlaylistFirst(playlist_id_text, item_id_text);
          res.status(201).json(playlistResourceItem);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async addItemToPlaylistLast(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyPlaylistOwnership()(req, res, async () => {
        try {
          const { playlist_id_text, item_id_text } = req.params;
          const playlistResourceItem = await PlaylistResourceItemController.playlistResourceItemService.addItemToPlaylistLast(playlist_id_text, item_id_text);
          res.status(201).json(playlistResourceItem);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async addItemToPlaylistBetween(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyPlaylistOwnership()(req, res, async () => {        
        try {
          const { playlist_id_text, item_id_text } = req.params;
          const { position1, position2 } = req.body;
          const playlistResourceItem = await PlaylistResourceItemController.playlistResourceItemService.addItemToPlaylistBetween(playlist_id_text, item_id_text, position1, position2);
          res.status(201).json(playlistResourceItem);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async removeItemFromPlaylist(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyPlaylistOwnership()(req, res, async () => {
        try {
          const { playlist_id_text } = req.params;
          const dto = req.body;
          await PlaylistResourceItemController.playlistResourceItemService.removeItemFromPlaylist(playlist_id_text, dto);
          res.status(204).end();
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }
}

export { PlaylistResourceItemController };