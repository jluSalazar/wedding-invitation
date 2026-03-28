import connectToDatabase from '@/lib/mongodb';
import Guest, { GuestStatus } from '@/models/Guest';

export interface AdminGuest {
  id: string;
  displayName: string;
  customId: string;
  status: GuestStatus;
  passesAllowed: number;
  passesConfirmed: number;
  updatedAt: string;
}

export async function getAllGuestsForAdmin(): Promise<AdminGuest[]> {
  await connectToDatabase();

  const guests = await Guest.find()
    .sort({ updatedAt: -1 })
    .select('displayName customId status passesAllowed passesConfirmed updatedAt')
    .lean();

  return guests.map((guest) => ({
    id: String(guest._id),
    displayName: guest.displayName,
    customId: guest.customId,
    status: guest.status as GuestStatus,
    passesAllowed: guest.passesAllowed,
    passesConfirmed: guest.passesConfirmed,
    updatedAt: guest.updatedAt instanceof Date ? guest.updatedAt.toISOString() : new Date(guest.updatedAt).toISOString(),
  }));
}