import { applicationRepository } from '../storage/repositories/ApplicationRepository';
import type { Application, ApplicationStatus } from '../types/application';

export class ApplicationService {
  /**
   * Validates and saves a new application.
   */
  async createApplication(applicationData: Omit<Application, 'id' | 'status' | 'appliedDate' | 'updatedAt'>): Promise<string> {
    const newApp: Omit<Application, 'id'> = {
      ...applicationData,
      status: 'Applied',
      appliedDate: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return await applicationRepository.add(newApp);
  }

  async updateStatus(id: string, status: ApplicationStatus): Promise<void> {
    await applicationRepository.updateStatus(id, status);
  }

  async getRecentApplications(limit?: number): Promise<Application[]> {
    return await applicationRepository.getRecent(limit);
  }

  async deleteApplication(id: string): Promise<void> {
    await applicationRepository.delete(id);
  }
}

export const applicationService = new ApplicationService();
