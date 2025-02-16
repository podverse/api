/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { logError } from 'podverse-helpers';
import { config } from '@api/config';

export function handleGenericErrorResponse(res: Response, error: any) {
  // TODO: how to handle logging of unknown server errors?
  if (config.nodeEnv !== 'production') {
    logError('Internal server error', error as Error);
  }
  // res.status(500).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  res.status(500).json({ message: error.message });
}
