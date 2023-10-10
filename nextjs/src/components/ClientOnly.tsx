"use client";
import { PageProvider } from "@/utils/contexts/PageContext";
import React, { useEffect, useState } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, [hasMounted]);

  if (!hasMounted) return false;

  return <>{children}</>;
};

export default ClientOnly;
