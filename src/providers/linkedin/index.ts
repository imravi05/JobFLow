import { JobProvider } from "../types";
import { extractLinkedInJob } from "./extractor";
import { detectApplicationSubmission } from "./detector";

export const linkedInProvider: JobProvider = {
  name: "LinkedIn",
  
  matches(url: URL): boolean {
    return url.hostname.includes("linkedin.com");
  },

  extractJob() {
    return extractLinkedInJob();
  },

  onApplicationSubmitted(callback: () => void) {
    return detectApplicationSubmission(callback);
  }
};