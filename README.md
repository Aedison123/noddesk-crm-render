# Render frontend deployment

For the Render static-site deployment while retaining Firebase as the backend, follow [RENDER_DEPLOY.md](RENDER_DEPLOY.md).

# NodDesk CRM

A responsive, Firebase-first CRM for sales organizations with four roles:

- **Super Admin** — highest authority; one-time seed signup; all Admin capabilities plus Admin account management.
- **Admin** — manages departments, managers, employees, leads, programs, payments, compensation, reports and settings.
- **Manager** — manages only employees explicitly assigned to that manager and data belonging to that team.
- **Employee** — salesperson role; manages own leads, follow-ups, sales/payment proofs and commission wallet.

The UI follows the attached clean white/blue CRM reference: fixed desktop sidebar, compact top bar, responsive cards, data tables, mobile bottom navigation and adaptive layouts for tablets, desktop and wide monitors.

## Included features

### Organization and access control
- One-time protected **Super Admin seed signup** at `/seed-signup.html`.
- Email/password Firebase Authentication only. No Google sign-in.
- Custom claims (`super-admin`, `admin`, `manager`, `employee`) set only from Cloud Functions.
- Super Admin can create Admins, Managers and Employees.
- Admin can create Managers and Employees.
- Manager can create Employees, but only inside a department assigned to that manager.
- Departments are mandatory before an Employee can be created.
- A department can have a Manager or remain directly managed by Admin/Super Admin.
- Employees can be assigned to a Manager or directly to Admin management.
- Editable custom profile fields and profile image upload.

### Leads
- Add one lead manually.
- CSV, XLS and XLSX import with worksheet selection, header row selection, dynamic field mapping and preview.
- Category dropdown for single lead entry and file imports. The CSV template in `samples/leads-template.csv` is optional.
- Employee-created leads are automatically owned by that employee.
- Management-created leads can stay **Unassigned**.
- Single assignment and multi-select bulk assignment.
- Department-level **Auto Assign** distributes all unassigned leads as evenly as possible across active employees in that department.
- Custom lead fields.
- Configurable lead status indicators.
- Default statuses seeded: New, Interested, Follow-up, Converted, Not Interested.

### Follow-ups and calling
- Lead card `Call` button opens the device dialer using `tel:`.
- When the web app becomes active again, a call-outcome dialog appears.
- **Attended**: salesperson chooses a custom follow-up date.
- **Not attended**: company-wide default follow-up interval is applied automatically.
- Custom follow-ups are prioritized above default follow-ups on the due date.
- No scheduler is required for normal follow-up visibility: due status is derived from Firestore timestamps, which keeps Cloud Functions minimal.

> Browser note: websites cannot reliably know whether a native phone call actually connected. The implementation detects return/visibility changes and asks the salesperson to confirm the call outcome.

### Programs, sales and payments
- Admin/Super Admin can create programs/products and prices.
- Salesperson can record a sale against a lead and choose full-payment or installment mode.
- Installment proof flow supports Full Payment, Token Payment, First Installment, Second Installment and Additional Installments.
- Employees enter payment date, amount and upload receipt proof (PDF/image).
- Receipts are stored in Firebase Storage.
- Management can verify or reject pending payment proofs.
- Verified payments count toward revenue and can credit commission atomically.

### Salary, commission and wallet
- Compensation modes: Commission only, Salary only, Salary + Commission.
- Commission can be percentage or fixed amount.
- Commission is credited only after payment verification.
- Employee wallet shows current balance, lifetime earnings, total paid out and ledger transactions.
- Admin/Super Admin can clear a wallet after paying the employee; the current balance becomes zero and a payout ledger entry is created while lifetime earnings remain intact.

### Dashboards and reports
- Role-scoped lead totals, revenue, pending payments and overdue follow-ups.
- Sales pipeline by lead status.
- Priority follow-ups.
- Recent leads.
- Employee leaderboard.
- Program-specific revenue ranking.
- Highest and lowest performing sold programs.
- Managers only see their assigned employees/team data.
- Admin and Super Admin see organization-wide data.

## Project structure

```text
noddesk-crm/
├── index.html
├── login.html
├── forgot-password.html
├── seed-signup.html
├── firebase.json
├── firestore.rules
├── firestore.indexes.json
├── storage.rules
├── shared/
│   ├── css/app.css
│   └── js/
│       ├── firebase-config.js
│       ├── firebase.js
│       ├── auth.js
│       ├── auth-pages.js
│       ├── api.js
│       ├── csv.js
│       ├── validators.js
│       ├── ui.js
│       └── pages.js
├── super-admin/
│   ├── dashboard.html
│   ├── admins.html
│   ├── departments.html
│   ├── managers.html
│   ├── employees.html
│   ├── leads.html
│   ├── products.html
│   ├── payments.html
│   ├── compensation.html
│   ├── reports.html
│   ├── settings.html
│   └── app.js
├── admin/
│   └── ...
├── manager/
│   └── ...
├── employee/
│   └── ...
└── functions/
    ├── package.json
    └── index.js
```

## Firebase collections

The application uses these primary collections:

- `users`
- `departments`
- `leadStatuses`
- `leads`
- `products`
- `sales`
- `payments`
- `compensation`
- `wallets`
- `walletTransactions`
- `companyStats`
- `employeeStats`
- `productStats`
- `departmentStats`
- `settings`
- `system`

Realtime Database is used only for lightweight user presence under `/presence/{uid}`. Durable CRM records remain in Firestore.

## Setup

### 1. Create Firebase project
Enable:

- Authentication → **Email/Password**
- Firestore Database
- Realtime Database (used for signed-in presence/online state)
- Storage
- Cloud Functions
- Hosting

Do not enable Google sign-in if you want the requested email/password-only model.

### 2. Add Firebase web configuration
Edit:

`shared/js/firebase-config.js`

Replace all `YOUR_...` values with the Firebase Web App configuration.

Also replace `YOUR_FIREBASE_PROJECT_ID` in `.firebaserc`.

### 3. Install CLI dependencies

```bash
npm install
cd functions
npm install
cd ..
```

### Local development (Firebase Emulator Suite)

Requirements: **Node 20** (functions), **Java 17+** (Firestore / Realtime Database / Storage emulators), and Firebase CLI via `npm install` in the project root.

1. Download emulator binaries (first time only):

```bash
npm run emulators:setup
```

2. Copy the Functions secret used by seed signup in the emulator:

```bash
cp functions/.secret.local.example functions/.secret.local
```

Edit `functions/.secret.local` if you want a custom `SEED_SETUP_KEY` (must be 16 hex characters). The default local key is `0123456789abcdef` — enter it on `/seed-signup.html` when bootstrapping locally.

`npm run dev` passes `--project noddesk-crm` so the emulator matches `shared/js/firebase-config.js`. If you use another Firebase project, change both or run `firebase emulators:start --project YOUR_ID` manually.

3. Start emulators (hosting uses port **5050** because macOS often reserves **5000** for AirPlay):

```bash
npm run dev
```

- App: http://127.0.0.1:5050  
- Emulator UI: http://127.0.0.1:4000  

The web client auto-connects to emulators when opened from `localhost` / `127.0.0.1`. Append `?production=1` to force the live Firebase project instead.

Full stack (same as `firebase emulators:start`):

```bash
npm run serve
```

4. Seed a Super Admin directly into the emulators (with `npm run dev` already running):

```bash
npm run seed:emulator
```

Default login: `superadmin@noddesk.local` / `Super@123`. Override with env vars (`SEED_EMAIL`, `SEED_PASSWORD`, `SEED_NAME`, `SEED_PHONE`). Re-seed with `npm run seed:emulator -- --force`.

### 4. Configure the one-time Super Admin setup key

The seed signup is protected by a Firebase Functions secret (`SEED_SETUP_KEY`).

**Manual deploy:** set `SEED_SETUP_KEY` with Firebase Secret Manager using the command below. Keep the generated key private and never place it in frontend files.

**Manual deploy:**

```bash
openssl rand -hex 8 | firebase functions:secrets:set SEED_SETUP_KEY --data-file - --force
```

Enter that key on `/seed-signup.html` during initial setup only. Keep it private.

### 5. Deploy rules, indexes and functions

```bash
firebase deploy --only firestore:rules,firestore:indexes,database,storage
firebase deploy --only functions
firebase deploy --only hosting
```

### 6. Create Super Admin once
Open:

`https://YOUR_DOMAIN/seed-signup.html`

Enter the secret setup key plus Super Admin name, phone, email and secure password.

The backend permanently marks the CRM as seeded. Further seed attempts are rejected.

### 7. Log in
Open `/login.html` and sign in with the Super Admin account.

Then create departments first, followed by Admins/Managers/Employees as needed.

## Security design

- Client-side validation improves UX but is **not** treated as a security boundary.
- Role authority is enforced by Firebase Auth custom claims plus Firestore/Storage Security Rules.
- New Firebase Authentication users are created only by callable Cloud Functions; a browser client never receives Firebase Admin credentials.
- Payment verification and commission wallet credit are done in a Firestore transaction inside Cloud Functions to prevent client-side commission fraud and duplicate crediting.
- Wallet payouts are recorded by a server-side atomic transaction.
- User-entered strings are normalized and limited before writes. UI rendering escapes values or inserts them as text.
- Receipt uploads restrict size and MIME type in both frontend and Storage Rules.
- The project does not store plaintext passwords in Firestore. Passwords are handled exclusively by Firebase Authentication.

## Important production recommendations

1. **Enable Firebase App Check** for Hosting/web and callable Functions before production launch.
2. Use a dedicated production Firebase project and a separate staging project.
3. Enable budget alerts and Cloud Logging alerts.
4. Put the seed route behind an additional hosting/CDN restriction after initial bootstrap, even though the backend already rejects repeat seeding.
5. For very large organizations, move dashboard aggregation from client queries to materialized statistic documents/events to reduce read cost. The included payment verification function already maintains revenue statistic documents.
6. Consider requiring MFA for management accounts if your Firebase Identity Platform plan supports your required MFA method.
7. Validate your organization’s legal requirements before storing employee/customer personal data and payment receipts.

## Notes on responsiveness

- Desktop: fixed left sidebar and top toolbar.
- Tablet: cards collapse to fewer columns and navigation simplifies.
- Mobile: sidebar is removed and replaced by an Android-style fixed bottom navigation bar plus a `More` drawer.
- Wide monitors: content width expands up to a controlled maximum so dashboards remain readable.

## Customization

Primary visual variables are in `shared/css/app.css` under `:root`. The current branding uses NodDesk and blue (`#2563eb`).


## Google Sheets lead integration

Admins can connect Google Sheets accounts with read-only Sheets/Drive metadata access, map a worksheet to a lead category or campaign, and import new rows from spreadsheet change notifications using saved checkpoints. A shared 15-minute maintenance job renews subscriptions and checks for recovery work; active event connections default to a six-hour data recovery interval. OAuth credentials, billing/API setup, deployment and tests are documented in [docs/google-sheets-connect.md](docs/google-sheets-connect.md).

## Flexible CSV / Excel lead import

Use **Lead Categories → Add → Import CSV / Excel** to map arbitrary columns into an existing category. See [docs/lead-file-import.md](docs/lead-file-import.md) for the workflow, limits, permissions, verification and deployment.
