"use client";

import { AuthGuard } from "@/components/auth-guard";

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  return (
    <AuthGuard requireAuth requireAdmin>
      {children}
    </AuthGuard>
  );
}
