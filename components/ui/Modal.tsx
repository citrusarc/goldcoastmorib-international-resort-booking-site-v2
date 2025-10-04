"use client";

import React, { useEffect } from "react";
import { cormorantGaramond } from "@/config/fonts";
import { ModalProps } from "@/types";

export function SuccessModal({ isOpen, onClose, redirectUrl }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
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
      className="flex fixed inset-0 z-50 p-4 items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col gap-4 p-6 max-w-sm w-full rounded-2xl shadow-lg border border-zinc-200 bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className={`text-2xl font-semibold text-zinc-800 ${cormorantGaramond.className}`}
        >
          Booking Confirmed!
        </h2>
        <p className="text-zinc-500">
          Everything is arranged for your stay. We look forward to welcoming
          you.
        </p>
        <button
          onClick={() => {
            onClose();
            if (redirectUrl) window.location.href = redirectUrl;
          }}
          className="px-4 py-2 rounded-xl text-white bg-amber-500 hover:bg-amber-600"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export function ErrorModal({ isOpen, onClose }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
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
      className="flex fixed inset-0 z-50 p-4 items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col gap-4 p-6 max-w-sm w-full rounded-2xl shadow-lg border border-zinc-200 bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className={`text-2xl font-semibold text-zinc-800 ${cormorantGaramond.className}`}
        >
          TITLE
        </h2>
        <p className="text-zinc-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl text-white bg-amber-500 hover:bg-amber-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
