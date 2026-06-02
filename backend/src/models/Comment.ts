import { Schema, model, models, Types } from 'mongoose';

export interface CommentDocument {
  marketId: Types.ObjectId;
  userId: Types.ObjectId;
  content: string;
  parentComment?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<CommentDocument>(
  {
    marketId: { type: Schema.Types.ObjectId, required: true, ref: 'Market' },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    content: { type: String, required: true, trim: true, minlength: 3 },
    parentComment: { type: Schema.Types.ObjectId, ref: 'Comment', default: null }
  },
  { timestamps: true }
);

const Comment = models.Comment || model<CommentDocument>('Comment', commentSchema);
export default Comment;
