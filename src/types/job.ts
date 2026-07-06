export interface Job {
  title: string;
  company: string;
  location?: string;
  jobUrl: string;
  portal: string;

  employmentType?: string;
  workMode?: "Remote" | "Hybrid" | "Onsite";
  salary?: string;
}