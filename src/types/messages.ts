import type { Job } from './job';

export type MessageType = 
  | { type: 'APPLICATION_SUBMITTED'; payload: Job };

export type MessageResponse = { success: boolean; error?: string };
