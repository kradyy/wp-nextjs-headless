"use client";
import { PageProvider } from "@/utils/contexts/PageContext";
import React, { useEffect, useState } from "react";

interface ClientPageContextProps {
  children: React.ReactNode;
  providerValue?: any;
}

const ClientPageContext: React.FC<ClientPageContextProps> = ({
  children,
  providerValue = false,
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, [hasMounted]);

  if (!hasMounted) return false;

  return <PageProvider value={providerValue}>{children}</PageProvider>;
};

export default ClientPageContext;
