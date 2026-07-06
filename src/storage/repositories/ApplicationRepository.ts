import { db } from '../db';
import type { Application, ApplicationStatus } from '../../types/application';

export class ApplicationRepository {
  async add(application: Omit<Application, 'id'>): Promise<string> {
    const id = await db.applications.add(application as Application);
    return id as string;
  }

  async updateStatus(id: string, status: ApplicationStatus): Promise<number> {
    return await db.applications.update(id, { status, updatedAt: new Date().toISOString() });
  }

  async delete(id: string): Promise<void> {
    return await db.applications.delete(id);
  }

  async getById(id: string): Promise<Application | undefined> {
    return await db.applications.get(id);
  }

  async getAll(): Promise<Application[]> {
    return await db.applications.toArray();
  }

  async getRecent(limit: number = 10): Promise<Application[]> {
    return await db.applications.orderBy('appliedDate').reverse().limit(limit).toArray();
  }
}

export const applicationRepository = new ApplicationRepository();
