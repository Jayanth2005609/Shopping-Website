"use client";

import React, { useEffect } from "react";
import { useStore } from "@/lib/store";
import { getCurrentUser } from "@/lib/auth";

export function AuthProvider({ children }) {
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUser({
        id: user.id,
        email: user.email,
        name: user.name,
      });
    }
  }, [setUser]);

  return <>{children}</>;
}
