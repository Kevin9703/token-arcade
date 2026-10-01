/** Lifetime token totals from the local coding-agent scanner. */
export interface ProjectUsage {
  id: string;
  name: string;
  provider: string;
  tokens: number;
  /** Previous scanner ID, used to preserve credited high-water and workshop identity. */
  legacyId?: string;
}
