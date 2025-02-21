import { Request, Response } from 'express';
import { PlaylistResourceItemChapterService } from 'podverse-orm';
import { handleGenericErrorResponse } from '@api/controllers/helpers/error';
import { verifyPlaylistOwnership } from '@api/controllers/playlist';
import { ensureAuthenticated } from '@api/lib/auth';

class PlaylistResourceItemChapterController {
  private static playlistResourceItemChapterService = new PlaylistResourceItemChapterService();

  static async addChapterToPlaylistFirst(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyPlaylistOwnership()(req, res, async () => {
        const { playlist_id_text, item_chapter_id_text } = req.params;

        try {
          const playlistResourceItemChapter = await PlaylistResourceItemChapterController.playlistResourceItemChapterService.addItemChapterToPlaylistFirst(playlist_id_text, item_chapter_id_text);
          res.status(201).json(playlistResourceItemChapter);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async addChapterToPlaylistLast(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyPlaylistOwnership()(req, res, async () => {
        const { playlist_id_text, item_chapter_id_text } = req.params;

        try {
          const playlistResourceItemChapter = await PlaylistResourceItemChapterController.playlistResourceItemChapterService.addItemChapterToPlaylistLast(playlist_id_text, item_chapter_id_text);
          res.status(201).json(playlistResourceItemChapter);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async addChapterToPlaylistBetween(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyPlaylistOwnership()(req, res, async () => {
        const { playlist_id_text, item_chapter_id_text } = req.params;
        const { position1, position2 } = req.body;

        try {
          const playlistResourceItemChapter = await PlaylistResourceItemChapterController.playlistResourceItemChapterService.addItemChapterToPlaylistBetween(playlist_id_text, item_chapter_id_text, position1, position2);
          res.status(201).json(playlistResourceItemChapter);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async removeChapterFromPlaylist(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyPlaylistOwnership()(req, res, async () => {
        const { playlist_id_text, item_chapter_id_text } = req.params;

        try {
          await PlaylistResourceItemChapterController.playlistResourceItemChapterService.removeItemChapterFromPlaylist(playlist_id_text, item_chapter_id_text);
          res.status(204).end();
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }
}

export { PlaylistResourceItemChapterController };