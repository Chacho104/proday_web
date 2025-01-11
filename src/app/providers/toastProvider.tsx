"use client";

import React from "react";

import { Toaster } from "react-hot-toast";

// Provider function that returns the toaster from react-hot-toast
// Mostly used for notifications that follow user interaction
export const ToasterProvider = () => {
  return <Toaster />;
};
