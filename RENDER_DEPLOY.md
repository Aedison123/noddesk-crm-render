# Deploy NodDesk CRM frontend to Render (Firebase backend retained)

This deployment moves **only the static frontend** to Render. The existing Firebase services remain the system of record and backend:

- Firebase Authentication (email/password and custom claims)
- Cloud Firestore (CRM data and security rules)
- Firebase Cloud Functions (trusted business operations)
- Firebase Storage (receipts and attachments)
- Firebase Realtime Database (presence/live features)

No Django server or PostgreSQL database is required for this hosting-only migration. Adding an unused PostgreSQL instance would create cost and operational work without changing where this application stores data. Do not point the existing Firestore client code at PostgreSQL.

## 1. Push this project to GitHub

1. Extract this ZIP.
2. Create a new GitHub repository (or use the existing repository).
3. Upload/push the project root, including `render.yaml`, `.node-version`, `package.json`, `package-lock.json`, `scripts/prepare-render-site.mjs`, and the existing Firebase files.
4. Do not upload `.env`, `functions/.secret.local`, service-account JSON, `node_modules`, `.firebase`, or deploy credentials.

## 2. Create the Render site

1. In Render, choose **New + → Blueprint**.
2. Connect the GitHub repository containing `render.yaml`.
3. Render detects the static site `noddesk-crm-frontend`.
4. Review and apply the Blueprint.

The Blueprint runs:

```bash
npm ci
node scripts/check-deploy-security.mjs
npm run build:css
npm run build:pwa
node scripts/prepare-render-site.mjs
```

It publishes only `.render-site/`. This staging folder is assembled from the public HTML, role workspaces, shared assets, icons, and PWA files. Firebase Functions source, rules, scripts, tests, package files, deploy tooling, local secrets, and debug logs are not published to the public CDN.

## 3. Authorize the Render domain in Firebase Authentication

After the first successful Render deployment:

1. Copy the assigned domain, for example `noddesk-crm-frontend.onrender.com`.
2. Open Firebase Console → Authentication → Settings → Authorized domains.
3. Add the exact Render hostname (without `https://` or a path).
4. Add your custom domain there too, if you connect one.
5. Keep Email/Password enabled.

The Firebase web configuration in `shared/js/firebase-config.js` is the existing public Firebase Web App configuration. It is not a service-account credential. Never put Firebase Admin service-account JSON or `SEED_SETUP_KEY` in frontend files or Render static-site environment variables.

## 4. Keep Firebase backend deployment separate

Render does not deploy Firebase Functions, Firestore rules, Storage rules, or Realtime Database rules. Continue managing those with the Firebase CLI from a trusted local/CI environment:

```bash
npm ci
cd functions && npm ci && cd ..
firebase deploy --only firestore:rules,firestore:indexes,database,storage
firebase deploy --only functions
```

Deploy Firebase Hosting only if you intentionally want to keep a second frontend host; it is not needed for the Render frontend.

## 5. PWA and browser checks

After deployment, test:

- `/login.html` and password reset
- `/seed-signup.html` (only during initial protected bootstrap)
- each role dashboard URL
- lead create/edit/import and follow-up
- payment proof upload and management verification
- commission and wallet updates
- Google Sheets integration if enabled
- call handoff, push notifications, and PWA install/update
- offline startup and service-worker refresh

The PWA build stamps a fresh service-worker cache version. After deployment, test in a private browser window and on a mobile device to detect stale service-worker caches.

## 6. PostgreSQL decision

**PostgreSQL is intentionally not provisioned in this Option B release.** The existing application code uses Firestore as its primary CRM database and uses Firebase Authentication/Cloud Functions for authorization and business operations. Provisioning Render PostgreSQL without migrating a defined module to it would create a second, unused source of truth.

If a future module genuinely needs relational transactions/reporting, design its ownership and sync boundary first, then add a separate authenticated API service plus Render PostgreSQL. Do not dual-write the same CRM records to Firestore and PostgreSQL without an explicit consistency strategy.

## Important limits

- This is a **frontend hosting migration**, not a Firebase-to-PostgreSQL migration.
- Firebase billing, quotas, authentication domains, and backend availability remain relevant.
- Render Static Sites have no server-side runtime and no runtime environment variables. Firebase configuration remains in the existing web config.
- The Render hostname must be authorized in Firebase Authentication.
