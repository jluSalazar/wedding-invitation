import mongoose, { Document, Model, Schema } from 'mongoose';

export type GuestStatus = 'pending' | 'confirmed' | 'declined';

export interface IGuest extends Document {
  customId: string;
  token: string;
  displayName: string;
  passesAllowed: number;
  passesConfirmed: number;
  status: GuestStatus;
  createdAt: Date;
  updatedAt: Date;
}

const GuestSchema = new Schema<IGuest>(
  {
    customId: { type: String, required: true, unique: true, index: true },
    token: { type: String, required: true },
    displayName: { type: String, required: true },
    passesAllowed: { type: Number, required: true },
    passesConfirmed: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'declined'] as GuestStatus[],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Guest: Model<IGuest> =
  mongoose.models.Guest ?? mongoose.model<IGuest>('Guest', GuestSchema);

export default Guest;
