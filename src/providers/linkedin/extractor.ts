import { Job } from "../../types/job";
import { LINKEDIN_SELECTORS } from "./selectors";

export function extractLinkedInJob(): Job | null {
  try {
    const titleEl = document.querySelector(LINKEDIN_SELECTORS.JOB_TITLE);
    const companyEl = document.querySelector(LINKEDIN_SELECTORS.COMPANY_NAME);
    const locationEl = document.querySelector(LINKEDIN_SELECTORS.LOCATION);
    const workModeEl = document.querySelector(LINKEDIN_SELECTORS.WORK_MODE);

    if (!titleEl || !companyEl) {
      console.warn("[JobFlow] Extraction failed: Missing title or company element.", {
        titleElFound: !!titleEl,
        companyElFound: !!companyEl
      });
      return null;
    }

    const title = titleEl.textContent?.trim() || "";
    const company = companyEl.textContent?.trim() || "";
    const location = locationEl?.textContent?.trim().replace(/·/g, '').trim() || "";
    const workModeText = workModeEl?.textContent?.trim().toLowerCase() || "";
    
    let workMode: Job['workMode'] = undefined;
    if (workModeText.includes('remote')) workMode = 'Remote';
    else if (workModeText.includes('hybrid')) workMode = 'Hybrid';
    else if (workModeText.includes('on-site') || workModeText.includes('onsite')) workMode = 'Onsite';

    // Get the exact job URL (handle both /jobs/view/ and /jobs/search/?currentJobId=...)
    let jobUrl = window.location.href;
    const url = new URL(window.location.href);
    if (url.pathname.includes('/search/')) {
      const jobId = url.searchParams.get('currentJobId');
      if (jobId) {
        jobUrl = `https://www.linkedin.com/jobs/view/${jobId}/`;
      } else {
        jobUrl = url.origin + url.pathname;
      }
    } else {
      jobUrl = url.origin + url.pathname;
    }

    return {
      title,
      company,
      location,
      jobUrl,
      portal: "LinkedIn",
      workMode
    };
  } catch (err) {
    console.error("Failed to extract LinkedIn job", err);
    return null;
  }
}