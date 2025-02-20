import { Request, Response } from 'express';
import { PlaylistResourceClipService } from 'podverse-orm';
import { handleGenericErrorResponse } from '@api/controllers/helpers/error';
import { verifyPlaylistOwnership } from '@api/controllers/playlist';
import { ensureAuthenticated } from '@api/lib/auth';

class PlaylistResourceClipController {
  private static playlistResourceClipService = new PlaylistResourceClipService();

  static async addClipToPlaylistFirst(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyPlaylistOwnership()(req, res, async () => {
        const { playlist_id_text, clip_id_text } = req.params;
  
        try {
          const playlistResourceClip = await PlaylistResourceClipController.playlistResourceClipService.addClipToPlaylistFirst(playlist_id_text, clip_id_text);
          res.status(201).json(playlistResourceClip);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async addClipToPlaylistLast(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyPlaylistOwnership()(req, res, async () => {
        try {
          const { playlist_id_text, clip_id_text } = req.params;
          const playlistResourceClip = await PlaylistResourceClipController.playlistResourceClipService.addClipToPlaylistLast(playlist_id_text, clip_id_text);
          res.status(201).json(playlistResourceClip);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async addClipToPlaylistBetween(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyPlaylistOwnership()(req, res, async () => {        
        try {
          const { playlist_id_text, clip_id_text } = req.params;
          const { position1, position2 } = req.body;
          const playlistResourceClip = await PlaylistResourceClipController.playlistResourceClipService.addClipToPlaylistBetween(playlist_id_text, clip_id_text, position1, position2);
          res.status(201).json(playlistResourceClip);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async removeClipFromPlaylist(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyPlaylistOwnership()(req, res, async () => {
        try {
          const { playlist_id_text } = req.params;
          const dto = req.body;
          await PlaylistResourceClipController.playlistResourceClipService.removeClipFromPlaylist(playlist_id_text, dto);
          res.status(204).end();
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }
}

export { PlaylistResourceClipController };
