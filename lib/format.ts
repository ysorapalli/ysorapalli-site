const dateFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

/** "Sep 14, 2026" */
export function formatDate(input: string | number | Date): string {
  const d = new Date(input);
  return Number.isNaN(d.getTime()) ? "" : dateFmt.format(d);
}
