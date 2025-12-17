"use client";

import { useTransition } from "react";
import { saveContact } from "../../app/dashboard/actions";
import { actionButtonClass, TextAreaField, TextField } from "./ui";
import { useToast } from "./ToastProvider";

type SettingData = {
  id?: number | null;
  contactEmail?: string | null;
  phone?: string | null;
  address?: string | null;
  businessHours?: string | null;
  mapEmbed?: string | null;
};

export default function ContactForm({ setting }: { setting: SettingData | null | undefined }) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await saveContact(formData);
      showToast("Contact info saved");
    });
  };

  return (
    <form action={handleSubmit} className="grid gap-3">
      <input type="hidden" name="id" defaultValue={setting?.id ?? ""} />
      <div className="grid gap-3 md:grid-cols-2">
        <TextField
          name="contactEmail"
          label="Public contact email"
          type="email"
          defaultValue={setting?.contactEmail}
        />
        <TextField name="phone" label="Phone" defaultValue={setting?.phone} />
      </div>
      <TextAreaField name="address" label="Address" rows={3} defaultValue={setting?.address} />
      <TextAreaField
        name="businessHours"
        label="Business hours"
        rows={3}
        defaultValue={setting?.businessHours ?? ""}
      />
      <TextAreaField
        name="mapEmbed"
        label="Google Maps iframe or URL"
        rows={3}
        defaultValue={setting?.mapEmbed ?? ""}
      />
      <div className="flex justify-end">
        <button type="submit" disabled={isPending} className={`${actionButtonClass} disabled:opacity-60`}>
          {isPending ? "Saving..." : "Save Contact"}
        </button>
      </div>
    </form>
  );
}
