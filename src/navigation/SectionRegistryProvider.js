import React, { createContext, useContext, useRef } from "react";

const SectionRegistryContext = createContext(null);

export const SectionRegistryProvider = ({ children }) => {
  const sectionsRef = useRef(new Map());

  const registerSection = (id, meta) => {
    sectionsRef.current.set(id, meta);
  };

  const unregisterSection = (id) => {
    sectionsRef.current.delete(id);
  };

  return (
    <SectionRegistryContext.Provider
      value={{
        registerSection,
        unregisterSection,
        getSections: () => Array.from(sectionsRef.current.values()),
      }}
    >
      {children}
    </SectionRegistryContext.Provider>
  );
};

export const useSectionRegistry = () => {
  const ctx = useContext(SectionRegistryContext);
  if (!ctx) {
    throw new Error(
      "useSectionRegistry must be used within SectionRegistryProvider"
    );
  }
  return ctx;
};
