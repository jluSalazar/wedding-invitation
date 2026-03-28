import AdminDashboard from './components/AdminDashboard';
import { getAllGuestsForAdmin } from '@/lib/admin';

interface AdminPageProps {
  searchParams: Promise<{ token?: string | string[] }>;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const { token } = await searchParams;
  const providedToken = Array.isArray(token) ? token[0] : token;
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-lg rounded-2xl bg-red-50 p-8 text-center text-red-700 ring-1 ring-red-100">
          <h1 className="text-2xl font-semibold">Configuracion incompleta</h1>
          <p className="mt-2 text-sm">
            Falta ADMIN_TOKEN en variables de entorno. Agregalo en .env.local para habilitar el panel.
          </p>
        </div>
      </main>
    );
  }

  if (!providedToken || providedToken !== adminToken) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-lg rounded-2xl bg-white p-8 text-center text-primary-800 shadow-sm ring-1 ring-primary-100">
          <h1 className="text-2xl font-semibold">Acceso denegado</h1>
          <p className="mt-2 text-sm text-primary-700/80">
            Usa la URL con tu token de administrador para acceder a esta pagina.
          </p>
          <p className="mt-3 rounded-lg bg-primary-50 px-3 py-2 text-xs text-primary-700">
            Ejemplo: /admin?token=TU_ADMIN_TOKEN
          </p>
        </div>
      </main>
    );
  }

  const guests = await getAllGuestsForAdmin();

  return <AdminDashboard guests={guests} />;
}