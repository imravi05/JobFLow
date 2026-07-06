import type { Job } from './job';

export type ApplicationStatus = 'Applied' | 'Interviewing' | 'Offer' | 'Rejected' | 'Withdrawn';

export interface Application extends Job {
  id?: string; // Generated ID (UUID)
  status: ApplicationStatus;
  appliedDate: string; // ISO string
  notes?: string;
  updatedAt: string; // ISO string
}
