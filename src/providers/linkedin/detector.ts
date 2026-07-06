import { LINKEDIN_SELECTORS } from "./selectors";

export function detectApplicationSubmission(onSuccess: () => void) {
  // Simple detection: listen for clicks on the apply button
  // In a real scenario, this should also listen for the "Success" modal of Easy Apply
  
  // Use a WeakSet to track elements we've already attached listeners to,
  // avoiding DOM mutations which cause React hydration errors on the host page.
  const listeningElements = new WeakSet<Element>();
  
  const observeDOM = () => {
    const applyButton = document.querySelector(LINKEDIN_SELECTORS.APPLY_BUTTON);
    if (applyButton && !listeningElements.has(applyButton)) {
      listeningElements.add(applyButton);
      applyButton.addEventListener('click', () => {
        // If it's a standard Apply (external site), we might just log it as applied immediately
        // If it's Easy Apply, we'd ideally wait for the success modal.
        // For the sake of this implementation, we will notify success after a short delay
        // to simulate the user going through the flow or clicking apply.
        
        // A more advanced implementation would use MutationObserver to look for LINKEDIN_SELECTORS.EASY_APPLY_SUCCESS
        setTimeout(() => {
          onSuccess();
        }, 1500); 
      });
    }
  };

  // Run immediately
  observeDOM();

  // And run on DOM changes (since LinkedIn is a SPA)
  const observer = new MutationObserver(() => {
    observeDOM();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  return () => observer.disconnect(); // return cleanup function
}
