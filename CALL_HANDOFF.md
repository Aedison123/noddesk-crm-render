# Desktop-to-Mobile Call Handoff

Secure call handoff lets CRM users on desktop send a short-lived call request to their registered mobile PWA. The phone retrieves the client number from the backend only after the user accepts, then opens the native dialer via `tel:`.

## Architecture

```
Desktop PWA → Cloud Function (createCallRequest)
           → Firestore callRequests/{id}
           → FCM Web Push (requestId only)
           → Mobile PWA / Service Worker
           → Cloud Function (acceptCallRequest) → tel: URI
```

All privileged transitions (device registration, call request state changes, phone retrieval) run in **Firebase Cloud Functions** (`functions/callHandoff.js`).

## Firebase Console setup

### 1. Cloud Messaging (Web Push)

1. Open [Firebase Console](https://console.firebase.google.com/) → **noddesk-crm** → Project settings → **Cloud Messaging**.
2. Under **Web configuration**, generate or copy the **Web Push certificate (VAPID key)**.
3. Paste the key into `shared/js/firebase-config.js`:

```js
export const vapidKey = "YOUR_ACTUAL_VAPID_KEY";
```

### 2. Deploy backend and rules

```bash
npm run deploy:functions
firebase deploy --only firestore:rules,firestore:indexes,database
npm run deploy:hosting
```

Composite indexes for `callRequests` are defined in `firestore.indexes.json`. First deploy may take a few minutes while indexes build.

### 3. App Check (recommended)

Enable App Check for:

- Cloud Functions (callable)
- Firestore
- Realtime Database

App Check complements—but does not replace—Firebase Authentication and server-side authorization.

## Collections

| Path | Purpose |
|------|---------|
| `users/{uid}/devices/{deviceId}` | Registered browsers/PWAs |
| `callRequests/{requestId}` | Short-lived handoff requests (60s TTL) |
| `crmCallActivities/{activityId}` | Audit trail |
| `callRateLimits/{uid}` | Rate limiting (Functions-only) |
| RTDB `devicePresence/{uid}/{deviceId}` | Online/offline presence |

## User setup

### Mobile (calling device)

1. Install/open the CRM PWA on Android (or mobile browser).
2. Sign in with the same account as desktop.
3. Go to **Profile → Connected devices**.
4. Tap **Enable** under **Enable phone call handoff** and allow notifications.
5. Optionally rename the device and confirm **Primary calling device**.

### Desktop (handoff source)

1. Sign in on Windows/desktop browser.
2. Click **Call** on a lead.
3. If a mobile device is registered, choose the target phone (primary is pre-selected when only one exists).
4. Accept the request on the phone → dialer opens.

If no phone is registered, desktop falls back to `tel:` on the PC (or prompts to continue).

## Security highlights

- User identity always from `request.auth.uid` (never client-supplied `uid`).
- Lead access validated server-side (same rules as CRM roles).
- Phone numbers are **not** sent in push payloads—only `requestId`.
- Full number returned only from `acceptCallRequest` after atomic `pending → accepted`.
- Duplicate/rate-limited requests blocked server-side.
- Expired requests rejected using server timestamps.
- Firestore rules block client writes to `callRequests`, devices, and activities.

## Testing checklist

| # | Scenario | Expected |
|---|----------|----------|
| 1 | Desktop + mobile foreground | Instant in-app modal → Call now → dialer |
| 2 | Mobile backgrounded | Push notification → tap → modal → dialer |
| 3 | Mobile PWA closed | Web push → open → secure fetch → dialer |
| 4 | Phone offline | Desktop shows waiting/expired; request expires ~60s |
| 5 | Multiple phones | Primary selected or chooser shown |
| 6 | Expired request | Mobile rejects with “expired” |
| 7 | Forged `deviceId` | Backend permission denied |
| 8 | Invalid `contactId` | Backend lead access denied |
| 9 | Rapid Call clicks | Rate limit / duplicate pending message |
| 10 | Invalid FCM token | Device `pushEnabled: false`; CRM still works |

## Modified / new files

| File | Why |
|------|-----|
| `functions/callHandoff.js` | Callable Functions for devices + call requests + FCM |
| `functions/index.js` | Exports handoff functions |
| `shared/js/device-manager.js` | Device ID, registration, presence |
| `shared/js/push-manager.js` | FCM token + foreground push |
| `shared/js/call-handoff.js` | Desktop handoff UI + status sync |
| `shared/js/call-request-listener.js` | Mobile incoming request UI |
| `shared/js/devices-ui.js` | Profile “Connected devices” section |
| `shared/js/call-request-page.js` | Deep link handler |
| `shared/js/api.js` | Callable wrappers |
| `shared/js/pages.js` | `beginCall`, `bootRole`, profile integration |
| `shared/js/firebase-config.js` | VAPID key placeholder |
| `sw.js` | Push + notification click (cache version bumped to `noddesk-v2`) |
| `call-request.html` | Notification deep link entry |
| `firestore.rules` | Read-only client access for handoff collections |
| `database.rules.json` | `devicePresence` rules |
| `firestore.indexes.json` | Composite indexes for call request queries |

## Environment variables

No extra Functions secrets are required beyond the default Firebase Admin SDK. Configure the **VAPID key** in `firebase-config.js` on the client.

## Optional: Android native companion

Device documents include `deviceClientType: "web_pwa"`. The backend API is designed to accept future values such as `android_native` without schema changes.

## Troubleshooting

- **No push on phone:** Confirm VAPID key, notification permission, and that the mobile device shows **Enabled** in Profile.
- **“Call request already pending”:** Wait for expiry or cancel from desktop modal.
- **Index errors in console:** Deploy `firestore.indexes.json` and wait for index build.
- **Service worker stale:** Hard refresh or clear site data after deploy (cache version `noddesk-v2`).
