import { linkedInProvider } from "./linkedin";
import type { JobProvider } from "./types";

const providers: JobProvider[] = [
  linkedInProvider,
];

export function getProvider(url: URL): JobProvider | undefined {
  return providers.find(provider => provider.matches(url));
}