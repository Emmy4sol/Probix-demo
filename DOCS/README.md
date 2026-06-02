# Deployment Guide (Free-tier)

1. Frontend: Deploy `frontend/` to Vercel.
2. Backend: Deploy `backend/` to Render (Free) or Railway free tier.
3. Database: Create a MongoDB Atlas free cluster and set `MONGODB_URI`.
4. Redis: (Optional) Use Upstash Free for caching or queues.
5. Storage: Use Cloudinary Free for images.
6. Email: Use Resend or Brevo free tier for verification emails.
7. Monitoring: Configure Sentry Free.

Ensure environment variables from `backend/.env.example` are set in the host provider.
