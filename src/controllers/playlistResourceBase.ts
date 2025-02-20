import { Request, Response } from 'express';
import { PlaylistResourceBaseService } from 'podverse-orm';
import { handleGenericErrorResponse } from './helpers/error';

class PlaylistResourceBaseController {
  private static playlistResourceBaseService = new PlaylistResourceBaseService();

  static async getAllByPlaylistIdPublic(req: Request, res: Response): Promise<void> {
    const { playlist_id_text } = req.params;

    try {
      const playlistResources = await PlaylistResourceBaseController.playlistResourceBaseService.getAllByPlaylistIdText(playlist_id_text);
      res.status(200).json(playlistResources);
    } catch (err) {
      handleGenericErrorResponse(res, err);
    }
  }
}

export { PlaylistResourceBaseController };
