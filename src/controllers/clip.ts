import { Request, Response } from 'express';
import Joi from 'joi';
import { ClipService } from 'podverse-orm';
import { ensureAuthenticated } from '@api/lib/auth';
import { handleGenericErrorResponse } from './helpers/error';
import { validateBodyObject } from '@api/lib/validation';

const clipSchema = Joi.object({
  start_time: Joi.number().min(0).required(),
  end_time: Joi.number().greater(0).allow(null, ''),
  title: Joi.string().allow(null, ''),
  description: Joi.string().allow(null, ''),
  item_id_text: Joi.string().required(),
  sharable_status: Joi.number().min(1).required(),
});

class ClipController {
  private static clipService = new ClipService();

  static async createClip(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      validateBodyObject(clipSchema, req, res, async () => {
        const account = req.user!;
        const dto = req.body;
        
        try {
          const clip = await ClipController.clipService.create(account.id, dto);
          res.status(201).json(clip);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async updateClip(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      validateBodyObject(clipSchema, req, res, async () => {
        const account = req.user!;
        const { clip_id_text } = req.params;
        const dto = req.body;

        try {
          const clip = await ClipController.clipService.update(account.id, clip_id_text, dto);
          res.status(200).json(clip);
        } catch (err) {
          handleGenericErrorResponse(res, err);
        }
      });
    });
  }

  static async deleteClip(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      const account = req.user!;
      const { clip_id_text } = req.params;

      try {
        await ClipController.clipService.delete(account.id, clip_id_text);
        res.status(204).end();
      } catch (err) {
        handleGenericErrorResponse(res, err);
      }
    });
  }

  static async getClipById(req: Request, res: Response): Promise<void> {
    try {
      const { clip_id_text } = req.params;
      const clip = await ClipController.clipService.get(clip_id_text);
      if (clip) {
        res.status(200).json(clip);
      } else {
        res.status(404).json({ message: 'Clip not found' });
      }
    } catch (err) {
      handleGenericErrorResponse(res, err);
    }
  }

  static async getClipsPublic(req: Request, res: Response): Promise<void> {
    try {
      const clips = await ClipController.clipService.getMany();
      res.status(200).json(clips);
    } catch (err) {
      handleGenericErrorResponse(res, err);
    }
  }

  static async getClipsPrivate(req: Request, res: Response): Promise<void> {
    ensureAuthenticated(req, res, async () => {
      const account = req.user!;

      try {
        const clips = await ClipController.clipService.getManyByAccount(account.id);
        res.status(200).json(clips);
      } catch (err) {
        handleGenericErrorResponse(res, err);
      }
    });
  }
}

export { ClipController };
