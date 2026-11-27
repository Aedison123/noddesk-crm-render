# Security checklist

Before production:

- Enable Firebase App Check.
- Enable **Authentication → Sign-in method → Email/Password** (required for login; seed signup uses Admin SDK and works even if this is off).
- Confirm Firestore and Storage rules with the Firebase Emulator Suite.
- Keep `SEED_SETUP_KEY` only in Firebase Functions secrets (Secret Manager). `./deploy.sh` also saves a local copy under `deploy/config/` (gitignored) — do not commit or expose it.
- Initial setup requires deployed Cloud Functions; client profile creation and bootstrap-state writes are denied. Never generate a browser setup key or restore a Spark/client-only provisioning fallback.
- Run `node scripts/check-deploy-security.mjs` before publishing. Existing deployment workspaces must be rebuilt if this check fails. Hosting excludes `deploy/**`, operational scripts, and the obsolete setup-key module.
- After a prior exposure, rotate affected projects' setup keys privately and remove exposed files from deployed Hosting. A local code fix does not revoke an already published credential.
- Never place service-account JSON in Hosting or frontend code.
- Do not weaken custom-claim role checks to frontend-only checks.
- Review every new Firestore collection against `firestore.rules` before shipping it.
- Keep receipt file types restricted to images/PDF and size-limited.
- Use HTTPS only; Firebase Hosting provides TLS by default.
- Disable unused Firebase Authentication providers.
- Rotate sensitive operational credentials if exposed.
- Use separate Firebase projects for development/staging/production.
