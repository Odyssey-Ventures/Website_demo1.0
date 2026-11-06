/** Shared by server pages and browser forms. Must match the category check in the SQL migration. */
export const supportCategories = ["general", "academy", "advisory", "accelerator", "consulting", "membership", "payment", "other"] as const;
export type SupportCategory = (typeof supportCategories)[number];
export type SupportStatus = "open" | "answered" | "closed";
