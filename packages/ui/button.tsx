import React from "react";

export const Button = (args: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => (
  <button className="bg-red-500" {...args}>{args?.children}</button>
);
