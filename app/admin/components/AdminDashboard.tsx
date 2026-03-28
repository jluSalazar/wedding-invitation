'use client';

import { useMemo, useState } from 'react';
import type { AdminGuest } from '@/lib/admin';

interface AdminDashboardProps {
  guests: AdminGuest[];
}

type StatusFilter = 'all' | GuestStatus;
type GuestStatus = AdminGuest['status'];

function formatDate(dateISO: string) {
  const date = new Date(dateISO);
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function toCSVRow(values: Array<string | number>) {
  return values
    .map((value) => {
      const escaped = String(value).replaceAll('"', '""');
      return `"${escaped}"`;
    })
    .join(',');
}

function downloadCSV(rows: string[], fileName: string) {
  const csvContent = rows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function statusLabel(status: GuestStatus) {
  if (status === 'confirmed') return 'Confirmado';
  if (status === 'declined') return 'Rechazado';
  return 'Pendiente';
}

export default function AdminDashboard({ guests }: AdminDashboardProps) {
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');

  const totals = useMemo(() => {
    const confirmed = guests.filter((guest) => guest.status === 'confirmed').length;
    const declined = guests.filter((guest) => guest.status === 'declined').length;
    const pending = guests.filter((guest) => guest.status === 'pending').length;
    const passesConfirmed = guests.reduce((total, guest) => total + guest.passesConfirmed, 0);
    const passesAllowed = guests.reduce((total, guest) => total + guest.passesAllowed, 0);

    return {
      totalGuests: guests.length,
      confirmed,
      declined,
      pending,
      passesConfirmed,
      passesAllowed,
    };
  }, [guests]);

  const filteredGuests = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    return guests.filter((guest) => {
      const statusMatches = filter === 'all' ? true : guest.status === filter;
      const searchMatches =
        normalized.length === 0
          ? true
          : guest.displayName.toLowerCase().includes(normalized) ||
            guest.customId.toLowerCase().includes(normalized);

      return statusMatches && searchMatches;
    });
  }, [filter, guests, search]);

  const handleExport = () => {
    const header = ['Nombre', 'ID Invitacion', 'Estado', 'Pases Confirmados', 'Pases Permitidos', 'Ultima Respuesta'];
    const rows = filteredGuests.map((guest) =>
      toCSVRow([
        guest.displayName,
        guest.customId,
        statusLabel(guest.status),
        guest.passesConfirmed,
        guest.passesAllowed,
        formatDate(guest.updatedAt),
      ])
    );

    downloadCSV([toCSVRow(header), ...rows], 'reporte-rsvp.csv');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 bg-white">
      <header className="mb-8 rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-primary-100 backdrop-blur">
        <p className="text-sm tracking-wide text-primary-700">Administracion RSVP</p>
        <h1 className="mt-1 text-3xl text-primary-900" style={{ fontFamily: 'var(--font-playfair)' }}>
          Panel de invitados
        </h1>
        <p className="mt-2 text-primary-800/80">
          Monitorea respuestas, filtra por estado y exporta un reporte CSV.
        </p>
      </header>

      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard title="Invitados" value={totals.totalGuests} />
        <StatCard title="Confirmados" value={totals.confirmed} tone="confirmed" />
        <StatCard title="Rechazados" value={totals.declined} tone="declined" />
        <StatCard title="Pendientes" value={totals.pending} tone="pending" />
        <StatCard title="Pases" value={`${totals.passesConfirmed}/${totals.passesAllowed}`} />
      </section>

      <section className="mb-5 grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-primary-100 md:grid-cols-[1fr_auto_auto] md:items-center">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por nombre o ID"
          className="w-full rounded-xl border border-primary-200 bg-white px-4 py-2.5 text-primary-900 outline-none transition focus:border-primary-500"
        />

        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value as StatusFilter)}
          className="rounded-xl border border-primary-200 bg-white px-4 py-2.5 text-primary-900 outline-none transition focus:border-primary-500"
        >
          <option value="all">Todos</option>
          <option value="pending">Pendientes</option>
          <option value="confirmed">Confirmados</option>
          <option value="declined">Rechazados</option>
        </select>

        <button
          type="button"
          onClick={handleExport}
          className="rounded-xl bg-primary-700 px-4 py-2.5 font-medium text-white transition hover:bg-primary-800"
        >
          Exportar CSV
        </button>
      </section>

      <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-primary-100">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-primary-50 text-primary-800">
              <tr>
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Pases</th>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Ultima respuesta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-100 text-primary-900">
              {filteredGuests.map((guest) => (
                <tr key={guest.id}>
                  <td className="px-4 py-3">{guest.displayName}</td>
                  <td className="px-4 py-3">
                    <span className={statusPillClass(guest.status)}>{statusLabel(guest.status)}</span>
                  </td>
                  <td className="px-4 py-3">
                    {guest.passesConfirmed}/{guest.passesAllowed}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{guest.customId}</td>
                  <td className="px-4 py-3">{formatDate(guest.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredGuests.length === 0 && (
          <p className="px-4 py-8 text-center text-primary-700/80">
            No se encontraron invitados con los filtros actuales.
          </p>
        )}
      </section>
    </div>
  );
}

function StatCard({
  title,
  value,
  tone = 'default',
}: {
  title: string;
  value: string | number;
  tone?: 'default' | 'confirmed' | 'declined' | 'pending';
}) {
  const toneClass =
    tone === 'confirmed'
      ? 'bg-green-50 text-green-700 ring-green-100'
      : tone === 'declined'
        ? 'bg-red-50 text-red-700 ring-red-100'
        : tone === 'pending'
          ? 'bg-amber-50 text-amber-700 ring-amber-100'
          : 'bg-primary-50 text-primary-800 ring-primary-100';

  return (
    <article className={`rounded-2xl p-4 ring-1 ${toneClass}`}>
      <p className="text-xs uppercase tracking-wide opacity-80">{title}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </article>
  );
}

function statusPillClass(status: GuestStatus) {
  if (status === 'confirmed') {
    return 'inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700';
  }

  if (status === 'declined') {
    return 'inline-flex rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700';
  }

  return 'inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700';
}