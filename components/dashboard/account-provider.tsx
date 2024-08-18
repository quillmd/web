"use client";
import { Account } from "@/lib/account";
import React, { createContext, useContext } from "react";

interface AccountContextType {
  account: Account;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};

interface AccountProviderProps {
  account: Account;
  children: React.ReactNode;
}

export const AccountProvider: React.FC<AccountProviderProps> = ({
  account,
  children,
}) => {
  return (
    <AccountContext.Provider value={{ account }}>
      {children}
    </AccountContext.Provider>
  );
};
