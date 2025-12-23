import { Badge } from "@/components/ui/badge";
import React from "react";

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const statusConfig = {
    pending: { label: "Under Review", variant: "secondary" as const },
    rejected: { label: "Rejected", variant: "destructive" as const },
    approved: { label: "Published", variant: "default" as const },
  };
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  return <Badge variant={config.variant}>{config.label}</Badge>;
};
