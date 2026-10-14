import type { ReactNode } from "react";
export function Heading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">MINDFORGE HUB</p>
        <h1>{title}</h1>
        {description && <p className="muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}
export function Empty({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      <div className="muted mt-2">
        {children || "Records will appear here when available."}
      </div>
    </div>
  );
}
export function Status({ children }: { children: ReactNode }) {
  return <span className="status-tag">{children}</span>;
}
export function Feedback({ message }: { message: string }) {
  return message ? (
    <p className="feedback" role="status">
      {message}
    </p>
  ) : null;
}
export const projectStatuses = [
  "Awaiting Confirmation",
  "Confirmed",
  "In Progress",
  "Awaiting Customer Review",
  "Completed",
  "Cancelled",
];
export const enquiryStatuses = [
  "Enquiry Received",
  "Under Discussion",
  "Awaiting Confirmation",
  "Confirmed",
  "Archived",
];
export const formValues = (form: HTMLFormElement) =>
  Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
