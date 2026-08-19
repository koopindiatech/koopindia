import AdminLayout from "./AdminLayout";

export const metadata = {
  title: "Admin Panel | Koop India",
  description: "Koop India Admin Dashboard - Manage buyers, leads, blog and more.",
  robots: { index: false, follow: false },
};

export default function AdminPanelLayout({ children }) {
  return <AdminLayout>{children}</AdminLayout>;
}
