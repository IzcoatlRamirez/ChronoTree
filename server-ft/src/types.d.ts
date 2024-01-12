// src/types.d.ts
import { Request as ExpressRequest } from 'express-serve-static-core';

export interface RequestCustom extends ExpressRequest {
  id?: number;
}