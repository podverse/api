/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { ERROR_MESSAGES, logError } from 'podverse-helpers';
import { config } from '@api/config';

export function handleInternalError(res: Response, error: any) {
  // TODO: how to handle logging of unknown server errors?
  if (config.nodeEnv !== 'production') {
    logError('Internal server error', error as Error);
  }
  res.status(500).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
}
