# Unbeatable Tennis Swing Model

A premium tennis academy management system for **Unbeatable Tennis Swing Model**, Lagos, Nigeria — led by Coach Mimi (Akosile Afolarin Linda).

> *Train with passion. Play with confidence. Become unbeatable.* 🎾

## What's inside

| File | Purpose |
|------|---------|
| `index.html` | Public marketing site — logo, about, programs, Coach Mimi profile, ad slots |
| `admin.html` | Staff admin portal (served at `/admin`) — students, attendance, invoicing, sponsors |
| `netlify.toml` | Redirects, cache rules, security headers |
| `_redirects` | Backup redirects for `/admin` → `/admin.html` |
| `robots.txt` | Excludes `/admin` from search engines |

## Tech stack

- **Frontend:** Vanilla HTML/CSS/JS, no build step. Google Fonts (Inter + Plus Jakarta Sans).
- **Backend:** [Supabase](https://supabase.com) (Postgres + Auth) — JS client loaded via CDN.
- **Hosting:** Static deploy on [Netlify](https://netlify.com).
- **Currency:** Naira (₦)

## Admin login

- **Email:** `akosilelinda@gmail.com`
- **Password:** `Unbeatable@2026`

Auth is real Supabase email/password — JWT-based, with session persisted across reloads. Change the password via the Supabase dashboard (Auth → Users) or a password-reset email.

## Database tables

All tables are RLS-protected — only authenticated users can read/write:

- `utsm_students`
- `utsm_attendance_sessions`
- `utsm_attendance_records`
- `utsm_invoices`
- `utsm_sponsors`

## Deploy

**Drag-and-drop:** visit https://app.netlify.com/drop and drop this folder.

**Netlify CLI:**
```bash
netlify deploy --dir=. --prod
```

After deploy:
- `https://<your-site>.netlify.app` → public site
- `https://<your-site>.netlify.app/admin` → admin portal

## Local preview

Open `index.html` in a browser. For the admin to work, Supabase needs to allow your local origin under **Project Settings → Auth → URL Configuration → Site URL** (or use the deployed URL).

## Contact

📞 +234 802 054 4201
✉️ akosilelinda@gmail.com
📍 Lagos, Nigeria

---

© 2026 Unbeatable Tennis Swing Model. All rights reserved.
