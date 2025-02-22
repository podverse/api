import { Request, Response } from 'express';
import Joi from 'joi';
import { PlaylistResourceItemAddByRSSService } from 'podverse-orm';
import { handleGenericErrorResponse } from '@api/controllers/helpers/error';
import { verifyPlaylistOwnership } from '@api/controllers/playlist';
import { ensureAuthenticated } from '@api/lib/auth';
import { validateBodyObject } from '@api/lib/validation';

const addItemToPlaylistSchema = Joi.object({
  resource_data: Joi.object().required()
});

const addItemToPlaylistBetweenSchema = Joi.object({
  resource_data: Joi.object().required(),
  position1: Joi.number().min(0).required(),
  position2: Joi.number().min(Joi.ref('position1')).required()
}).with('position1', 'position2');

class PlaylistResourceItemAddByRSSController {
  private static playlistResourceItemAddByRSSService = new PlaylistResourceItemAddByRSSService();

  static async addItemToPlaylistFirst(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyPlaylistOwnership()(req, res, async () => {
        validateBodyObject(addItemToPlaylistSchema, req, res, async () => {
          const { playlist_id_text } = req.params;
          const { resource_data } = req.body;

          try {
            const playlistResourceItemAddByRSS = await PlaylistResourceItemAddByRSSController.playlistResourceItemAddByRSSService.addItemToPlaylistFirst(playlist_id_text, resource_data);
            res.status(201).json(playlistResourceItemAddByRSS);
          } catch (err) {
            handleGenericErrorResponse(res, err);
          }
        });
      });
    });
  }

  static async addItemToPlaylistLast(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyPlaylistOwnership()(req, res, async () => {
        validateBodyObject(addItemToPlaylistSchema, req, res, async () => {
          const { playlist_id_text } = req.params;
          const { resource_data } = req.body;

          try {
            const playlistResourceItemAddByRSS = await PlaylistResourceItemAddByRSSController.playlistResourceItemAddByRSSService.addItemToPlaylistLast(playlist_id_text, resource_data);
            res.status(201).json(playlistResourceItemAddByRSS);
          } catch (err) {
            handleGenericErrorResponse(res, err);
          }
        });
      });
    });
  }

  static async addItemToPlaylistBetween(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyPlaylistOwnership()(req, res, async () => {
        validateBodyObject(addItemToPlaylistBetweenSchema, req, res, async () => {
          const { playlist_id_text } = req.params;
          const { resource_data, position1, position2 } = req.body;

          try {
            const playlistResourceItemAddByRSS = await PlaylistResourceItemAddByRSSController.playlistResourceItemAddByRSSService.addItemToPlaylistBetween(playlist_id_text, resource_data, position1, position2);
            res.status(201).json(playlistResourceItemAddByRSS);
          } catch (err) {
            handleGenericErrorResponse(res, err);
          }
        });
      });
    });
  }

  static async removeItemFromPlaylist(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      verifyPlaylistOwnership()(req, res, async () => {
        const { playlist_id_text, hash_id } = req.params;

        try {
          await PlaylistResourceItemAddByRSSController.playlistResourceItemAddByRSSService.removeItemFromPlaylist(playlist_id_text, hash_id);
          res.status(204).end();
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }
}

export { PlaylistResourceItemAddByRSSController };
