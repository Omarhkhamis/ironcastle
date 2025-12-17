"use client";

import { ButtonHTMLAttributes, useMemo } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  message: string;
};

export default function ConfirmDeleteButton({ message, onClick, type, ...props }: Props) {
  const classNames = useMemo(
    () => ({
      popup: "rounded-3xl border border-white/10 bg-[#05070d] text-white shadow-2xl",
      confirmButton:
        "mx-1 rounded-2xl bg-accent px-4 py-2 font-semibold text-[#111] transition hover:-translate-y-0.5",
      cancelButton:
        "mx-1 rounded-2xl border border-white/20 px-4 py-2 font-semibold text-white transition hover:-translate-y-0.5"
    }),
    []
  );

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
      if (event.defaultPrevented) return;
    }

    event.preventDefault();
    event.stopPropagation();

    const button = event.currentTarget as HTMLButtonElement;

    const result = await Swal.fire({
      title: "Confirm deletion",
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      background: "#05070d",
      color: "#f5f5f5",
      buttonsStyling: false,
      customClass: classNames
    });

    if (result.isConfirmed) {
      const form = button.closest("form");
      if (form) {
        form.requestSubmit(button);
      }
    }
  };

  return <button {...props} onClick={handleClick} type={type ?? "button"} />;
}
