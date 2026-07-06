import { Job } from "../types/job";

export interface JobProvider {
  name: string;

  matches(url: URL): boolean;

  extractJob(): Job | null;

  onApplicationSubmitted(callback: () => void): () => void;
}