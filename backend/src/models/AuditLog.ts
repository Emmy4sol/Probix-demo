import { Schema, model, models, Types } from 'mongoose';

export interface AuditLogDocument {
  userId?: Types.ObjectId | null;
  action: string;
  ip: string;
  userAgent: string;
  status: number;
  timestamp: Date;
}

const auditLogSchema = new Schema<AuditLogDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    action: { type: String, required: true },
    ip: { type: String, required: true },
    userAgent: { type: String, required: true },
    status: { type: Number, required: true }
  },
  { timestamps: { createdAt: 'timestamp', updatedAt: false } }
);

const AuditLog = models.AuditLog || model<AuditLogDocument>('AuditLog', auditLogSchema);
export default AuditLog;
