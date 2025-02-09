/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { logger } from 'podverse-helpers';

export function handleInternalError(res: Response, error: any) {
  logger.error(error);
  res.status(500).json({ error });
}
