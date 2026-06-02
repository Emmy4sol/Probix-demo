import { Schema, model, models, Types } from 'mongoose';

export interface NotificationDocument {
  userId: Types.ObjectId;
  title: string;
  body: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<NotificationDocument>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Notification = models.Notification || model<NotificationDocument>('Notification', notificationSchema);
export default Notification;
