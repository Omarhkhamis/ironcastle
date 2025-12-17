import {
  actionButtonClass,
  cardClass,
  outlineButtonClass,
  SectionHeading,
  TextField,
  iconButtonClass
} from "../../../../components/dashboard/ui";
import { getSiteData } from "../../../../lib/site-data";
import { deleteAdmin, saveAdmin } from "../../actions";

export default async function AdminsPage() {
  const data = await getSiteData();
  const admins = data.admins;

  return (
    <section className="space-y-6 pb-12">
      <SectionHeading title="Admins" description="Control dashboard access" />

      <div className="space-y-4">
        {admins.length === 0 ? (
          <div className={`${cardClass} text-center`}>
            <p className="text-sm text-gray-500 dark:text-gray-300">No admins yet.</p>
          </div>
        ) : (
          admins.map((admin) => (
            <form key={admin.id} action={saveAdmin} className={`${cardClass} space-y-4`}>
              <input type="hidden" name="id" defaultValue={admin.id} />
              <div className="grid gap-3 md:grid-cols-2">
                <TextField name="name" label="Name" defaultValue={admin.name ?? ""} />
                <TextField name="email" label="Email" type="email" defaultValue={admin.email} required />
              </div>
              <TextField
                name="password"
                label="New password (leave blank to keep current)"
                type="password"
              />
              <button type="submit" className={actionButtonClass}>
                Save
              </button>
            </form>
          ))
        )}
      </div>

      <div className={`${cardClass} space-y-4`}>
        <h3 className="text-lg font-semibold">Add Admin</h3>
        <form action={saveAdmin} className="grid gap-3">
          <div className="grid gap-3 md:grid-cols-2">
            <TextField name="name" label="Name" />
            <TextField name="email" label="Email" type="email" required />
          </div>
          <TextField name="password" label="Password" type="password" required />
          <button type="submit" className={actionButtonClass}>
            Create Admin
          </button>
        </form>
      </div>
    </section>
  );
}
