import { Issue } from "valibot";

export const formatIssues = (issues: Issue[]) => {
  return issues.map((issue) => issue.message).join(", ");
};
