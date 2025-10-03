"use client";

import React, { useEffect } from "react";
import { cormorantGaramond } from "@/config/fonts"; // // Import font for consistent styling

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  redirectUrl?: string; // // Optional redirect for SuccessModal
}

export function SuccessModal({
  isOpen,
  onClose,
  message,
  redirectUrl,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // // Disable background scroll
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose} // // Close on backdrop click
    >
      <div
        className="relative flex flex-col gap-4 p-6 max-w-sm w-full rounded-2xl bg-white shadow-lg border border-amber-500"
        onClick={(e) => e.stopPropagation()} // // Prevent closing when clicking modal content
      >
        <h2
          className={`text-2xl font-semibold text-zinc-800 ${cormorantGaramond.className}`}
        >
          Booking Confirmed 🎉
        </h2>
        <p className="text-zinc-600">{message}</p>
        <button
          onClick={() => {
            onClose();
            if (redirectUrl) window.location.href = redirectUrl; // // Handle redirect
          }}
          className="px-4 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export function ErrorModal({ isOpen, onClose, message }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // // Disable background scroll
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose} // // Close on backdrop click
    >
      <div
        className="relative flex flex-col gap-4 p-6 max-w-sm w-full rounded-2xl bg-red-100 shadow-lg border border-red-500"
        onClick={(e) => e.stopPropagation()} // // Prevent closing when clicking modal content
      >
        <h2
          className={`text-2xl font-semibold text-red-600 ${cormorantGaramond.className}`}
        >
          Error
        </h2>
        <p className="text-red-600">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
