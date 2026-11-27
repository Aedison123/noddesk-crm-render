const CACHE_VERSION = 'noddesk-1.0.0-mwef13tu';
const APP_VERSION = '1.0.0-mwef13tu';
const CALL_REQUEST_PATH = '/call-request.html';
const PRECACHE_URLS = [
  "/shared/css/stock-icons.css",
  "/shared/vendor/bootstrap-icons-1.13.2.woff2",
  '/offline.html',
  '/favicon.svg',
  '/manifest.webmanifest',
  '/shared/css/tailwind.css',
  '/shared/css/app.css',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-512.png'
];
const PRECACHE_APP_URLS = [
  "/admin/admins.html",
  "/admin/app.js",
  "/admin/attendance.html",
  "/admin/campaigns.html",
  "/admin/compensation.html",
  "/admin/dashboard.html",
  "/admin/departments.html",
  "/admin/employees.html",
  "/admin/forms.html",
  "/admin/google-sheets.html",
  "/admin/lead-import-settings.html",
  "/admin/leads.html",
  "/admin/management.html",
  "/admin/managers.html",
  "/admin/payments.html",
  "/admin/reports.html",
  "/admin/settings.html",
  "/admin/users.html",
  "/employee/app.js",
  "/employee/attendance.html",
  "/employee/campaigns.html",
  "/employee/dashboard.html",
  "/employee/followups.html",
  "/employee/leads.html",
  "/employee/management.html",
  "/employee/payments.html",
  "/employee/profile.html",
  "/employee/wallet.html",
  "/manager/app.js",
  "/manager/attendance.html",
  "/manager/campaigns.html",
  "/manager/compensation.html",
  "/manager/dashboard.html",
  "/manager/employees.html",
  "/manager/leads.html",
  "/manager/management.html",
  "/manager/payments.html",
  "/manager/profile.html",
  "/manager/reports.html",
  "/manager/users.html",
  "/shared/js/access-editor.js",
  "/shared/js/access-model.mjs",
  "/shared/js/api.js",
  "/shared/js/app-entry.js",
  "/shared/js/attendance.js",
  "/shared/js/auth-errors.mjs",
  "/shared/js/auth-pages.js",
  "/shared/js/auth-persistence.mjs",
  "/shared/js/auth.js",
  "/shared/js/branding.js",
  "/shared/js/call-handoff.js",
  "/shared/js/call-outcome-model.mjs",
  "/shared/js/call-outcomes.js",
  "/shared/js/call-request-listener.js",
  "/shared/js/call-request-page.js",
  "/shared/js/campaign-model.mjs",
  "/shared/js/campaigns.js",
  "/shared/js/category-form-model.mjs",
  "/shared/js/category-form.js",
  "/shared/js/client-bootstrap-seed.js",
  "/shared/js/csv.js",
  "/shared/js/dashboard-builder.js",
  "/shared/js/dashboard-layout-model.mjs",
  "/shared/js/data-store.js",
  "/shared/js/delete-confirmation.js",
  "/shared/js/department-scope-model.mjs",
  "/shared/js/deploy-center.js",
  "/shared/js/device-manager.js",
  "/shared/js/devices-ui.js",
  "/shared/js/employee-directory.js",
  "/shared/js/employee-field-settings.js",
  "/shared/js/employee-fields-model.mjs",
  "/shared/js/employee-leads-model.mjs",
  "/shared/js/employee-leads.js",
  "/shared/js/emulator-env.js",
  "/shared/js/field-definition-editor.js",
  "/shared/js/file-upload-model.mjs",
  "/shared/js/file-upload.js",
  "/shared/js/firebase-config.js",
  "/shared/js/firebase.js",
  "/shared/js/form-google-ads.js",
  "/shared/js/form-meta-pixel.js",
  "/shared/js/form-standard-fields.js",
  "/shared/js/google-ads-loader.js",
  "/shared/js/google-sheets.js",
  "/shared/js/image-upload-worker.js",
  "/shared/js/international-phone.mjs",
  "/shared/js/lead-advanced-filters.js",
  "/shared/js/lead-dated-notes.js",
  "/shared/js/lead-details.js",
  "/shared/js/lead-editor-form.js",
  "/shared/js/lead-entry.js",
  "/shared/js/lead-create-panel.js",
  "/shared/js/lead-file-import.js",
  "/shared/js/lead-file-reader.js",
  "/shared/js/lead-file-worker.js",
  "/shared/js/lead-filter-model.mjs",
  "/shared/js/lead-forms.js",
  "/shared/js/department-category-fields.js",
  "/shared/js/lead-group-display.mjs",
  "/shared/js/lead-import-model.mjs",
  "/shared/js/lead-import-refresh.js",
  "/shared/js/lead-import-settings.js",
  "/shared/js/lead-input-group.js",
  "/shared/js/lead-search.js",
  "/shared/js/lead-status-schedule.js",
  "/shared/js/legacy-records.mjs",
  "/shared/js/live-sync.js",
  "/shared/js/live-sync.mjs",
  "/shared/js/local-cache-core.mjs",
  "/shared/js/local-cache-db.js",
  "/shared/js/local-cache-store.mjs",
  "/shared/js/manager-team-model.mjs",
  "/shared/js/manager-teams.js",
  "/shared/js/meta-pixel-loader.js",
  "/shared/js/module-export.js",
  "/shared/js/pages.js",
  "/shared/js/pagination-model.mjs",
  "/shared/js/password-input.js",
  "/shared/js/phone-fields.js",
  "/shared/js/presence.js",
  "/shared/js/public-form.js",
  "/shared/js/push-manager.js",
  "/shared/js/pwa.js",
  "/shared/js/record-export-model.mjs",
  "/shared/js/record-export-worker.js",
  "/shared/js/record-export.js",
  "/shared/js/revenue-report-model.mjs",
  "/shared/js/role-bootstrap.js",
  "/shared/js/router.js",
  "/shared/js/safe-browser-storage.mjs",
  "/shared/js/session.js",
  "/shared/js/settings-workspace.js",
  "/shared/js/stock-icons.js",
  "/shared/js/storage-console.js",
  "/shared/js/storage-download.js",
  "/shared/js/tables.js",
  "/shared/js/ui-permissions.js",
  "/shared/js/ui.js",
  "/shared/js/user-category-model.mjs",
  "/shared/js/user-category-picker.js",
  "/shared/js/user-credentials.js",
  "/shared/js/user-departments.js",
  "/shared/js/user-roles.js",
  "/shared/js/users-directory.js",
  "/shared/js/users-model.mjs",
  "/shared/js/validators.js",
  "/shared/js/works.js",
  "/shared/vendor/jsquash-webp-1.5.0/codec/enc/webp_enc.js",
  "/shared/vendor/jsquash-webp-1.5.0/codec/enc/webp_enc.wasm",
  "/shared/vendor/jsquash-webp-1.5.0/encode.js",
  "/shared/vendor/jsquash-webp-1.5.0/meta.js",
  "/shared/vendor/jsquash-webp-1.5.0/utils.js",
  "/shared/vendor/libphonenumber-js-1.13.15.max.mjs",
  "/shared/vendor/xlsx-0.20.3.full.min.js",
  "/super-admin/admins.html",
  "/super-admin/app.js",
  "/super-admin/attendance.html",
  "/super-admin/campaigns.html",
  "/super-admin/compensation.html",
  "/super-admin/dashboard.html",
  "/super-admin/departments.html",
  "/super-admin/employees.html",
  "/super-admin/forms.html",
  "/super-admin/google-sheets.html",
  "/super-admin/lead-import-settings.html",
  "/super-admin/leads.html",
  "/super-admin/management.html",
  "/super-admin/managers.html",
  "/super-admin/payments.html",
  "/super-admin/reports.html",
  "/super-admin/settings.html",
  "/super-admin/users.html"
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll([...PRECACHE_URLS,...PRECACHE_APP_URLS].map(url=>new Request(url,{cache:'reload'}))))
  );
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: 'window', includeUncontrolled: true }))
      .then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'SW_ACTIVATED', version: APP_VERSION, cacheVersion: CACHE_VERSION });
        });
      })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    if(PRECACHE_APP_URLS.includes(url.pathname)){
      event.respondWith(caches.open(CACHE_VERSION).then(cache=>cache.match(url.pathname)).then(cached=>cached||fetch(request)));return;
    }
    event.respondWith(
      fetch(request)
        .then((response) => response)
        .catch(() => caches.match('/offline.html'))
    );
    return;
  }

  if (/\.(?:m?js|css)$/i.test(url.pathname)) {
    event.respondWith(
      caches.open(CACHE_VERSION).then(cache=>cache.match(request)).then(cached=>cached||fetch(request, { cache: 'no-store' })
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            event.waitUntil(caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy)).catch(()=>{}));
          }
          return response;
        })
        .catch(() => caches.match(request).catch(()=>null).then((cached) => cached || fetch(request))))
    );
    return;
  }

  if (url.pathname.startsWith('/shared/') || /\.(css|js|svg|png|woff2?)$/i.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
          }
          return response;
        });
      })
    );
  }
});

function parsePushPayload(event) {
  if (!event.data) return {};
  try {
    const json = event.data.json();
    return json.data || json.notification?.data || json;
  } catch {
    try {
      const text = event.data.text();
      return JSON.parse(text);
    } catch {
      return {};
    }
  }
}

self.addEventListener('push', (event) => {
  const data = parsePushPayload(event);
  if (data.type !== 'crm_call_request' || !data.requestId) return;

  event.waitUntil(
    self.registration.showNotification('CRM Call Request', {
      body: 'A new client call request is waiting.',
      tag: `crm-call-${data.requestId}`,
      renotify: true,
      requireInteraction: true,
      data: { requestId: data.requestId, type: 'crm_call_request' },
      actions: [
        { action: 'open', title: 'Open' },
        { action: 'dismiss', title: 'Dismiss' }
      ]
    })
  );
});

async function focusOrOpenClient(requestId) {
  const url = new URL(CALL_REQUEST_PATH, self.location.origin);
  if (requestId) url.searchParams.set('requestId', requestId);
  const clientsList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  for (const client of clientsList) {
    if (!client.url.startsWith(self.location.origin)) continue;
    client.postMessage({ type: 'call_request', requestId });
    if ('focus' in client) return client.focus();
  }
  if (self.clients.openWindow) return self.clients.openWindow(url.href);
}

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'dismiss') return;
  const requestId = event.notification.data?.requestId;
  event.waitUntil(focusOrOpenClient(requestId));
});
