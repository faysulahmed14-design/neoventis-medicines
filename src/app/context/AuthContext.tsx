"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CustomerUser = {
  name: string;
  email: string;
  phone: string;
  address?: string;
};

export type AdminUser = {
  email: string;
  role: "admin";
  name: string;
};

type AuthContextType = {
  customer: CustomerUser | null;
  admin: AdminUser | null;
  isAuthLoaded: boolean;
  loginCustomer: (user: CustomerUser) => void;
  logoutCustomer: () => void;
  loginAdmin: (user: AdminUser) => void;
  logoutAdmin: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<CustomerUser | null>(null);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCustomer = localStorage.getItem("neoventis_customer_user");
      if (savedCustomer) {
        setCustomer(JSON.parse(savedCustomer));
      }

      const savedAdmin = localStorage.getItem("neoventis_admin_user");
      if (savedAdmin) {
        setAdmin(JSON.parse(savedAdmin));
      }
    } catch (e) {
      console.error("Failed to load auth from localStorage", e);
    } finally {
      setIsAuthLoaded(true);
    }
  }, []);

  const loginCustomer = (user: CustomerUser) => {
    setCustomer(user);
    try {
      localStorage.setItem("neoventis_customer_user", JSON.stringify(user));
      // Also sync to shipping info for seamless checkout
      localStorage.setItem(
        "neoventis_shipping_info",
        JSON.stringify({
          fullName: user.name,
          phone: user.phone,
          address: user.address || "",
        })
      );
    } catch (e) {
      console.error("Failed to save customer session", e);
    }
  };

  const logoutCustomer = () => {
    setCustomer(null);
    try {
      localStorage.removeItem("neoventis_customer_user");
    } catch (e) {
      console.error("Failed to remove customer session", e);
    }
  };

  const loginAdmin = (user: AdminUser) => {
    setAdmin(user);
    try {
      localStorage.setItem("neoventis_admin_user", JSON.stringify(user));
    } catch (e) {
      console.error("Failed to save admin session", e);
    }
  };

  const logoutAdmin = () => {
    setAdmin(null);
    try {
      localStorage.removeItem("neoventis_admin_user");
    } catch (e) {
      console.error("Failed to remove admin session", e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        customer,
        admin,
        isAuthLoaded,
        loginCustomer,
        logoutCustomer,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
