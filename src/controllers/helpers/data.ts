import { Response } from "express";

export function handleReturnDataOrNotFound(res: Response, data: any, label: string) {
  if (!data) {
    res.status(404).json({ message: `${label} not found` });
  } else {
    res.json(data);
  }
}
