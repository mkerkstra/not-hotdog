import React from "react";

export const Button = ({ children }: { children: React.ReactNode }) => (
  <button className="bg-red-500">{children}</button>
);
