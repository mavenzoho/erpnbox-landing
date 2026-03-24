import { useState } from 'react';

type Section = 'overview' | 'auth' | 'modules' | 'records' | 'webhooks' | 'users' | 'search' | 'analytics' | 'errors' | 'rate-limits';

const sections: { id: Section; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' },
  { id: 'auth', label: 'Authentication', icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z' },
  { id: 'modules', label: 'Modules', icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z' },
  { id: 'records', label: 'Records', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' },
  { id: 'webhooks', label: 'Webhooks', icon: 'M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5' },
  { id: 'users', label: 'Users', icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' },
  { id: 'search', label: 'Search', icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' },
  { id: 'analytics', label: 'Analytics', icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z' },
  { id: 'errors', label: 'Errors', icon: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z' },
  { id: 'rate-limits', label: 'Rate Limits', icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' },
];

function CodeBlock({ children, title }: { children: string; title?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative group rounded-lg overflow-hidden border border-gray-200 my-4">
      {title && (
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 text-xs font-medium text-gray-500">{title}</div>
      )}
      <pre className="bg-gray-900 text-gray-100 p-4 text-sm overflow-x-auto leading-relaxed"><code>{children}</code></pre>
      <button
        onClick={copy}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}

function EndpointRow({ method, path, desc }: { method: string; path: string; desc: string }) {
  const colors: Record<string, string> = {
    GET: 'bg-blue-100 text-blue-700',
    POST: 'bg-green-100 text-green-700',
    PUT: 'bg-amber-100 text-amber-700',
    DELETE: 'bg-red-100 text-red-700',
  };
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${colors[method] || 'bg-gray-100 text-gray-700'}`}>{method}</span>
      <code className="text-sm font-mono text-brand-700 flex-shrink-0">{path}</code>
      <span className="text-sm text-gray-600">{desc}</span>
    </div>
  );
}

function ParamTable({ params }: { params: { name: string; type: string; req?: boolean; desc: string }[] }) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 pr-4 font-semibold text-gray-700">Parameter</th>
            <th className="text-left py-2 pr-4 font-semibold text-gray-700">Type</th>
            <th className="text-left py-2 pr-4 font-semibold text-gray-700">Required</th>
            <th className="text-left py-2 font-semibold text-gray-700">Description</th>
          </tr>
        </thead>
        <tbody>
          {params.map((p) => (
            <tr key={p.name} className="border-b border-gray-100">
              <td className="py-2 pr-4 font-mono text-brand-700">{p.name}</td>
              <td className="py-2 pr-4 text-gray-500">{p.type}</td>
              <td className="py-2 pr-4">{p.req ? <span className="text-red-500 text-xs font-semibold">Required</span> : <span className="text-gray-400 text-xs">Optional</span>}</td>
              <td className="py-2 text-gray-600">{p.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">{children}</h2>;
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-3">{children}</h3>;
}

// ─── Content Sections ────────────────────────────────────────────

function OverviewSection() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">ERPnBox API Documentation</h1>
      <p className="text-lg text-gray-600 mb-8">Build integrations, sync data with external systems, and automate your workflows.</p>

      <div className="bg-brand-50 border border-brand-200 rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-brand-800 mb-2">Base URL</h3>
        <code className="text-brand-700 bg-white px-3 py-1.5 rounded border border-brand-200 text-sm">https://your-instance.erpnbox.com/api/v1</code>
      </div>

      <SectionTitle>Quick Start</SectionTitle>
      <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
        <li><strong>Create an API key</strong> in Settings &rarr; API Keys (requires ADMIN role)</li>
        <li><strong>Copy the key</strong> (shown only once) and store it securely</li>
        <li><strong>Make your first request:</strong></li>
      </ol>
      <CodeBlock title="bash">{`curl -X GET "https://your-instance.erpnbox.com/api/v1/modules" \\
  -H "X-API-Key: erpn_your_key_here"`}</CodeBlock>

      <SectionTitle>Response Format</SectionTitle>
      <p className="text-gray-600 mb-4">Every API response follows a consistent JSON structure:</p>
      <CodeBlock title="Success Response">{`{
  "success": true,
  "data": { ... }
}`}</CodeBlock>
      <CodeBlock title="Error Response">{`{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable description"
  }
}`}</CodeBlock>

      <SectionTitle>Available Endpoints</SectionTitle>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <EndpointRow method="GET" path="/modules" desc="List all modules" />
        <EndpointRow method="GET" path="/modules/:apiName" desc="Get module details" />
        <EndpointRow method="GET" path="/modules/:apiName/fields" desc="List module fields" />
        <EndpointRow method="GET" path="/records/:module" desc="List records" />
        <EndpointRow method="GET" path="/records/:module/:id" desc="Get single record" />
        <EndpointRow method="POST" path="/records/:module" desc="Create record" />
        <EndpointRow method="PUT" path="/records/:module/:id" desc="Update record" />
        <EndpointRow method="DELETE" path="/records/:module/:id" desc="Delete record" />
        <EndpointRow method="GET" path="/users" desc="List users" />
        <EndpointRow method="GET" path="/users/:id" desc="Get user" />
        <EndpointRow method="GET" path="/search" desc="Global search" />
        <EndpointRow method="POST" path="/analytics/aggregate" desc="Run aggregate query" />
        <EndpointRow method="GET" path="/webhooks" desc="List webhooks" />
        <EndpointRow method="POST" path="/webhooks" desc="Create webhook" />
        <EndpointRow method="PUT" path="/webhooks/:id" desc="Update webhook" />
        <EndpointRow method="DELETE" path="/webhooks/:id" desc="Delete webhook" />
        <EndpointRow method="GET" path="/webhooks/:id/deliveries" desc="View delivery logs" />
      </div>
    </div>
  );
}

function AuthSection() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Authentication</h1>
      <p className="text-lg text-gray-600 mb-8">ERPnBox uses API keys for authentication. Each key is scoped to a specific tenant and user.</p>

      <SectionTitle>Using Your API Key</SectionTitle>
      <SubTitle>Option 1: X-API-Key Header (Recommended)</SubTitle>
      <CodeBlock title="bash">{`curl -X GET "https://your-instance.erpnbox.com/api/v1/modules" \\
  -H "X-API-Key: erpn_your_key_here"`}</CodeBlock>

      <SubTitle>Option 2: Authorization Bearer Header</SubTitle>
      <CodeBlock title="bash">{`curl -X GET "https://your-instance.erpnbox.com/api/v1/modules" \\
  -H "Authorization: Bearer erpn_your_key_here"`}</CodeBlock>

      <SectionTitle>Scopes</SectionTitle>
      <p className="text-gray-600 mb-4">API keys use a scope-based permission model.</p>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 pr-6 font-semibold text-gray-700">Scope</th>
              <th className="text-left py-2 font-semibold text-gray-700">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              ['*', 'Full access to all endpoints'],
              ['modules:read', 'List modules and field metadata'],
              ['records:read', 'Read records across all modules'],
              ['records:write', 'Create and update records'],
              ['records:delete', 'Delete records'],
              ['records:*', 'All record operations'],
              ['users:read', 'List and read user profiles'],
              ['analytics:read', 'Run analytics queries'],
              ['webhooks:read', 'List and view webhook configurations'],
              ['webhooks:write', 'Create, update, and delete webhooks'],
            ].map(([scope, desc]) => (
              <tr key={scope}>
                <td className="py-2 pr-6 font-mono text-sm text-brand-700">{scope}</td>
                <td className="py-2 text-gray-600">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionTitle>Security Best Practices</SectionTitle>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li><strong>Use minimal scopes</strong> &mdash; Only grant the permissions your integration needs</li>
        <li><strong>Set expiration dates</strong> &mdash; Rotate keys quarterly</li>
        <li><strong>Use environment variables</strong> &mdash; Never hardcode keys in source code</li>
        <li><strong>Monitor usage</strong> &mdash; Check usage stats for unexpected activity</li>
        <li><strong>One key per integration</strong> &mdash; Easy to revoke per integration</li>
      </ul>
    </div>
  );
}

function ModulesSection() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Modules API</h1>
      <p className="text-lg text-gray-600 mb-8">Modules are the building blocks of ERPnBox &mdash; they represent data objects like Leads, Contacts, Deals, or any custom entity.</p>

      <SectionTitle>List All Modules</SectionTitle>
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">GET</span>
        <code className="text-sm font-mono text-gray-700">/api/v1/modules</code>
        <span className="text-xs text-gray-400 ml-2">Scope: modules:read</span>
      </div>
      <CodeBlock title="Response">{`{
  "success": true,
  "data": [
    {
      "id": "clx1234...",
      "apiName": "leads",
      "name": "Leads",
      "description": "Track potential customers",
      "icon": "UserPlus",
      "isActive": true,
      "createdAt": "2026-01-15T10:00:00.000Z"
    }
  ]
}`}</CodeBlock>

      <SectionTitle>Get Module Fields</SectionTitle>
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">GET</span>
        <code className="text-sm font-mono text-gray-700">/api/v1/modules/:apiName/fields</code>
      </div>
      <CodeBlock title="Response">{`{
  "success": true,
  "data": [
    {
      "apiName": "firstName",
      "label": "First Name",
      "fieldType": "TEXT",
      "isRequired": true,
      "order": 1
    },
    {
      "apiName": "stage",
      "label": "Stage",
      "fieldType": "PICKLIST",
      "options": {
        "choices": [
          { "value": "New", "label": "New" },
          { "value": "Qualified", "label": "Qualified" }
        ]
      }
    }
  ]
}`}</CodeBlock>

      <SectionTitle>Field Types</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-4">
        {['TEXT', 'TEXTAREA', 'EMAIL', 'PHONE', 'NUMBER', 'DECIMAL', 'CURRENCY', 'DATE', 'DATETIME', 'BOOLEAN', 'PICKLIST', 'MULTI_PICKLIST', 'LOOKUP', 'URL', 'AUTO_NUMBER', 'FORMULA'].map((t) => (
          <div key={t} className="bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-xs font-mono text-gray-700">{t}</div>
        ))}
      </div>
    </div>
  );
}

function RecordsSection() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Records API</h1>
      <p className="text-lg text-gray-600 mb-8">Records are the data entries within modules. Full CRUD operations with pagination and search.</p>

      <SectionTitle>List Records</SectionTitle>
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">GET</span>
        <code className="text-sm font-mono text-gray-700">/api/v1/records/:moduleApiName</code>
      </div>
      <ParamTable params={[
        { name: 'page', type: 'integer', desc: 'Page number (default: 1)' },
        { name: 'per_page', type: 'integer', desc: 'Records per page (default: 20, max: 200)' },
        { name: 'search', type: 'string', desc: 'Search across all text fields' },
        { name: 'sort_by', type: 'string', desc: 'Field API name to sort by' },
        { name: 'sort_order', type: 'string', desc: 'asc or desc' },
      ]} />
      <CodeBlock title="Example">{`curl -X GET "https://your-instance.erpnbox.com/api/v1/records/leads?page=1&per_page=10" \\
  -H "X-API-Key: erpn_your_key_here"`}</CodeBlock>

      <SectionTitle>Create Record</SectionTitle>
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">POST</span>
        <code className="text-sm font-mono text-gray-700">/api/v1/records/:moduleApiName</code>
        <span className="text-xs text-gray-400 ml-2">Scope: records:write</span>
      </div>
      <CodeBlock title="Request Body">{`{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "stage": "New"
}`}</CodeBlock>
      <CodeBlock title="Response (201 Created)">{`{
  "success": true,
  "data": {
    "id": "clx_newrecord...",
    "data": {
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane@example.com",
      "stage": "New"
    },
    "ownerId": "user_123",
    "createdAt": "2026-03-16T10:00:00.000Z"
  }
}`}</CodeBlock>

      <SectionTitle>Update Record</SectionTitle>
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-bold">PUT</span>
        <code className="text-sm font-mono text-gray-700">/api/v1/records/:moduleApiName/:id</code>
      </div>
      <p className="text-gray-600 mb-3">Send only the fields you want to update (partial update):</p>
      <CodeBlock title="Request Body">{`{
  "stage": "Qualified",
  "company": "Updated Corp"
}`}</CodeBlock>

      <SectionTitle>Delete Record</SectionTitle>
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-bold">DELETE</span>
        <code className="text-sm font-mono text-gray-700">/api/v1/records/:moduleApiName/:id</code>
        <span className="text-xs text-gray-400 ml-2">Scope: records:delete</span>
      </div>
    </div>
  );
}

function WebhooksSection() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Webhooks</h1>
      <p className="text-lg text-gray-600 mb-8">Receive real-time HTTP POST notifications when events occur in ERPnBox.</p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8">
        <h4 className="font-semibold text-blue-800 mb-2">How it works</h4>
        <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
          <li>You register a webhook URL + events</li>
          <li>A matching event occurs (e.g., a lead is created)</li>
          <li>ERPnBox sends a signed HTTP POST to your URL</li>
          <li>Your server responds with 2xx to acknowledge</li>
          <li>If delivery fails, ERPnBox retries with exponential backoff</li>
        </ol>
      </div>

      <SectionTitle>Events</SectionTitle>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full text-sm">
          <thead><tr className="border-b border-gray-200">
            <th className="text-left py-2 pr-6 font-semibold text-gray-700">Event</th>
            <th className="text-left py-2 font-semibold text-gray-700">Description</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-100">
            <tr><td className="py-2 pr-6 font-mono text-brand-700">record.created</td><td className="py-2 text-gray-600">A new record is created</td></tr>
            <tr><td className="py-2 pr-6 font-mono text-brand-700">record.updated</td><td className="py-2 text-gray-600">A record's data changes</td></tr>
            <tr><td className="py-2 pr-6 font-mono text-brand-700">record.deleted</td><td className="py-2 text-gray-600">A record is deleted</td></tr>
          </tbody>
        </table>
      </div>

      <SectionTitle>Payload Structure</SectionTitle>
      <CodeBlock title="Webhook Payload">{`{
  "event": "record.created",
  "timestamp": "2026-03-16T14:30:00.000Z",
  "tenantId": "clx_tenant...",
  "module": {
    "id": "clx_module...",
    "apiName": "leads",
    "name": "Leads"
  },
  "record": {
    "id": "clx_record...",
    "data": {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john@example.com",
      "stage": "New"
    },
    "ownerId": "clx_user...",
    "createdBy": "clx_user..."
  },
  "userId": "clx_user...",
  "changedFields": ["stage"],       // only for record.updated
  "previousData": { "stage": "New" } // only for record.updated
}`}</CodeBlock>

      <SectionTitle>Signature Verification</SectionTitle>
      <p className="text-gray-600 mb-4">Every delivery includes an HMAC-SHA256 signature in the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">X-ERPnBox-Signature</code> header. <strong>Always verify signatures</strong> to ensure payloads are genuine.</p>
      <CodeBlock title="Node.js Verification">{`const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expected = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

// In your Express handler:
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-erpnbox-signature'];
  const isValid = verifyWebhookSignature(req.body, signature, YOUR_SECRET);
  if (!isValid) return res.status(401).json({ error: 'Invalid signature' });

  const event = JSON.parse(req.body);
  console.log('Event:', event.event, event.record.id);
  res.status(200).json({ received: true });
});`}</CodeBlock>

      <CodeBlock title="Python Verification">{`import hmac, hashlib

def verify_signature(payload: bytes, signature: str, secret: str) -> bool:
    expected = 'sha256=' + hmac.new(
        secret.encode(), payload, hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(signature, expected)`}</CodeBlock>

      <SectionTitle>Headers Sent</SectionTitle>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full text-sm">
          <thead><tr className="border-b border-gray-200">
            <th className="text-left py-2 pr-6 font-semibold text-gray-700">Header</th>
            <th className="text-left py-2 font-semibold text-gray-700">Description</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-100">
            <tr><td className="py-2 pr-6 font-mono text-sm">X-ERPnBox-Event</td><td className="py-2 text-gray-600">Event name (e.g., record.created)</td></tr>
            <tr><td className="py-2 pr-6 font-mono text-sm">X-ERPnBox-Signature</td><td className="py-2 text-gray-600">HMAC-SHA256 signature (sha256=...)</td></tr>
            <tr><td className="py-2 pr-6 font-mono text-sm">X-ERPnBox-Delivery-Timestamp</td><td className="py-2 text-gray-600">ISO 8601 timestamp</td></tr>
          </tbody>
        </table>
      </div>

      <SectionTitle>Retry Policy</SectionTitle>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full text-sm">
          <thead><tr className="border-b border-gray-200">
            <th className="text-left py-2 pr-6 font-semibold text-gray-700">Attempt</th>
            <th className="text-left py-2 pr-6 font-semibold text-gray-700">Delay</th>
            <th className="text-left py-2 font-semibold text-gray-700">Total Time</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-100">
            <tr><td className="py-2 pr-6">1st retry</td><td className="py-2 pr-6">10 seconds</td><td className="py-2">~10s</td></tr>
            <tr><td className="py-2 pr-6">2nd retry</td><td className="py-2 pr-6">60 seconds</td><td className="py-2">~70s</td></tr>
            <tr><td className="py-2 pr-6">3rd retry</td><td className="py-2 pr-6">5 minutes</td><td className="py-2">~6 min</td></tr>
          </tbody>
        </table>
      </div>

      <SectionTitle>Field Filters</SectionTitle>
      <p className="text-gray-600 mb-3">Only fire webhooks when specific fields change:</p>
      <CodeBlock>{`{
  "name": "Stage Change Notification",
  "url": "https://your-server.com/webhook",
  "events": ["record.updated"],
  "fieldFilters": { "stage": true, "dealValue": true }
}`}</CodeBlock>

      <SectionTitle>API Endpoints</SectionTitle>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <EndpointRow method="GET" path="/api/v1/webhooks" desc="List all webhooks" />
        <EndpointRow method="GET" path="/api/v1/webhooks/:id" desc="Get webhook details" />
        <EndpointRow method="POST" path="/api/v1/webhooks" desc="Create a webhook" />
        <EndpointRow method="PUT" path="/api/v1/webhooks/:id" desc="Update a webhook" />
        <EndpointRow method="DELETE" path="/api/v1/webhooks/:id" desc="Delete a webhook" />
        <EndpointRow method="GET" path="/api/v1/webhooks/:id/deliveries" desc="View delivery logs" />
      </div>
    </div>
  );
}

function UsersSection() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Users API</h1>
      <p className="text-lg text-gray-600 mb-8">Retrieve user information for your tenant.</p>

      <SectionTitle>List Users</SectionTitle>
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">GET</span>
        <code className="text-sm font-mono text-gray-700">/api/v1/users</code>
        <span className="text-xs text-gray-400 ml-2">Scope: users:read</span>
      </div>
      <CodeBlock title="Response">{`{
  "success": true,
  "data": [
    {
      "id": "clx_user...",
      "name": "John Smith",
      "email": "john@company.com",
      "role": "ADMIN",
      "title": "Sales Manager",
      "isActive": true
    }
  ]
}`}</CodeBlock>

      <SectionTitle>User Roles</SectionTitle>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full text-sm">
          <thead><tr className="border-b border-gray-200">
            <th className="text-left py-2 pr-6 font-semibold text-gray-700">Role</th>
            <th className="text-left py-2 font-semibold text-gray-700">Description</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-100">
            <tr><td className="py-2 pr-6 font-mono text-brand-700">SUPER_ADMIN</td><td className="py-2 text-gray-600">Full access within the tenant</td></tr>
            <tr><td className="py-2 pr-6 font-mono text-brand-700">ADMIN</td><td className="py-2 text-gray-600">Admin-level access</td></tr>
            <tr><td className="py-2 pr-6 font-mono text-brand-700">MANAGER</td><td className="py-2 text-gray-600">Manager-level access</td></tr>
            <tr><td className="py-2 pr-6 font-mono text-brand-700">SALES_REP</td><td className="py-2 text-gray-600">Standard user access</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SearchSection() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Search API</h1>
      <p className="text-lg text-gray-600 mb-8">Search across all modules in your tenant.</p>

      <SectionTitle>Global Search</SectionTitle>
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">GET</span>
        <code className="text-sm font-mono text-gray-700">/api/v1/search</code>
        <span className="text-xs text-gray-400 ml-2">Scope: records:read</span>
      </div>
      <ParamTable params={[
        { name: 'q', type: 'string', req: true, desc: 'Search query (min 2 characters)' },
        { name: 'module', type: 'string', desc: 'Filter by module API name' },
        { name: 'page', type: 'integer', desc: 'Page number (default: 1)' },
        { name: 'per_page', type: 'integer', desc: 'Results per page (max: 100)' },
      ]} />
      <CodeBlock title="Example">{`curl -X GET "https://your-instance.erpnbox.com/api/v1/search?q=john&module=leads" \\
  -H "X-API-Key: erpn_your_key_here"`}</CodeBlock>
    </div>
  );
}

function AnalyticsSection() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics API</h1>
      <p className="text-lg text-gray-600 mb-8">Run aggregate queries on your data.</p>

      <SectionTitle>Aggregate Query</SectionTitle>
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">POST</span>
        <code className="text-sm font-mono text-gray-700">/api/v1/analytics/aggregate</code>
        <span className="text-xs text-gray-400 ml-2">Scope: analytics:read</span>
      </div>
      <ParamTable params={[
        { name: 'moduleApiName', type: 'string', req: true, desc: 'Module to query' },
        { name: 'metric', type: 'string', req: true, desc: 'count, sum, avg, min, max' },
        { name: 'field', type: 'string', desc: 'Field API name (required for sum/avg/min/max)' },
        { name: 'groupBy', type: 'string', desc: 'Field API name to group by' },
        { name: 'filters', type: 'object', desc: 'Field-value filters' },
      ]} />
      <CodeBlock title="Request">{`{
  "moduleApiName": "deals",
  "metric": "sum",
  "field": "dealValue",
  "groupBy": "stage"
}`}</CodeBlock>
      <CodeBlock title="Response">{`{
  "success": true,
  "data": {
    "results": [
      { "group": "Qualified", "value": 125000 },
      { "group": "Proposal", "value": 340000 },
      { "group": "Won", "value": 890000 }
    ],
    "total": 1355000
  }
}`}</CodeBlock>
    </div>
  );
}

function ErrorsSection() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Error Handling</h1>
      <p className="text-lg text-gray-600 mb-8">All API errors return a consistent JSON structure.</p>

      <SectionTitle>HTTP Status Codes</SectionTitle>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full text-sm">
          <thead><tr className="border-b border-gray-200">
            <th className="text-left py-2 pr-6 font-semibold text-gray-700">Status</th>
            <th className="text-left py-2 font-semibold text-gray-700">Meaning</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-100">
            {[
              ['200', 'Success'], ['201', 'Created'], ['400', 'Bad Request'],
              ['401', 'Unauthorized'], ['403', 'Forbidden'], ['404', 'Not Found'],
              ['429', 'Rate Limited'], ['500', 'Internal Error'],
            ].map(([code, desc]) => (
              <tr key={code}><td className="py-2 pr-6 font-mono">{code}</td><td className="py-2 text-gray-600">{desc}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionTitle>Common Error Codes</SectionTitle>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full text-sm">
          <thead><tr className="border-b border-gray-200">
            <th className="text-left py-2 pr-4 font-semibold text-gray-700">Code</th>
            <th className="text-left py-2 pr-4 font-semibold text-gray-700">Status</th>
            <th className="text-left py-2 font-semibold text-gray-700">Resolution</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-100">
            {[
              ['UNAUTHORIZED', '401', 'Include a valid API key'],
              ['INVALID_API_KEY', '401', 'Check the key is correct and active'],
              ['API_KEY_EXPIRED', '401', 'Create a new key'],
              ['INSUFFICIENT_SCOPE', '403', 'Add missing scope to API key'],
              ['VALIDATION_ERROR', '400', 'Check required fields and formats'],
              ['MODULE_NOT_FOUND', '404', 'Check module API name'],
              ['RECORD_NOT_FOUND', '404', 'Verify record ID exists'],
              ['RATE_LIMIT', '429', 'Wait and retry with backoff'],
            ].map(([code, status, res]) => (
              <tr key={code}>
                <td className="py-2 pr-4 font-mono text-sm text-red-600">{code}</td>
                <td className="py-2 pr-4 text-gray-500">{status}</td>
                <td className="py-2 text-gray-600">{res}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RateLimitsSection() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Rate Limits</h1>
      <p className="text-lg text-gray-600 mb-8">ERPnBox enforces rate limits to ensure fair usage and platform stability.</p>

      <SectionTitle>Default Limits</SectionTitle>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full text-sm">
          <thead><tr className="border-b border-gray-200">
            <th className="text-left py-2 pr-6 font-semibold text-gray-700">Scope</th>
            <th className="text-left py-2 pr-6 font-semibold text-gray-700">Limit</th>
            <th className="text-left py-2 font-semibold text-gray-700">Window</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-100">
            <tr><td className="py-2 pr-6">Global (per IP)</td><td className="py-2 pr-6">1,000 requests</td><td className="py-2">15 minutes</td></tr>
            <tr><td className="py-2 pr-6">Per API key</td><td className="py-2 pr-6">Configurable (default: 1,000)</td><td className="py-2">15 minutes</td></tr>
          </tbody>
        </table>
      </div>

      <SectionTitle>Best Practices</SectionTitle>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li><strong>Cache responses</strong> &mdash; Module metadata changes infrequently</li>
        <li><strong>Use pagination</strong> &mdash; Fetch in pages, not all at once</li>
        <li><strong>Implement backoff</strong> &mdash; On 429 responses, wait before retrying</li>
        <li><strong>Monitor usage</strong> &mdash; Track consumption via the usage endpoint</li>
      </ul>
    </div>
  );
}

// ─── Main Docs Page ─────────────────────────────────────────────

const sectionComponents: Record<Section, () => JSX.Element> = {
  overview: OverviewSection,
  auth: AuthSection,
  modules: ModulesSection,
  records: RecordsSection,
  webhooks: WebhooksSection,
  users: UsersSection,
  search: SearchSection,
  analytics: AnalyticsSection,
  errors: ErrorsSection,
  'rate-limits': RateLimitsSection,
};

export default function DocsPage() {
  const [active, setActive] = useState<Section>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const ActiveComponent = sectionComponents[active];

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="ERPnBox" className="h-10 w-auto" />
              <span className="text-xl font-bold text-gray-900">
                ERP<span className="text-brand-500">n</span>Box
              </span>
            </a>
            <span className="hidden sm:inline-block text-sm text-gray-400 border-l border-gray-200 pl-4 ml-2">API Documentation</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">Home</a>
            <a href="/#pricing" className="inline-flex items-center px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors shadow-sm">
              Get API Key
            </a>
          </div>
          {/* Mobile toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </header>

      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:block fixed lg:sticky top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-gray-50 border-r border-gray-200 overflow-y-auto`}>
          <nav className="p-4 space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => { setActive(s.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active === s.id
                    ? 'bg-brand-50 text-brand-700 border border-brand-200'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                </svg>
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 px-6 lg:px-12 py-10 max-w-4xl">
          <ActiveComponent />
          <div className="mt-16 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-400">ERPnBox API v1 &mdash; Need help? Contact <a href="mailto:support@erpnbox.com" className="text-brand-600 hover:underline">support@erpnbox.com</a></p>
          </div>
        </main>
      </div>
    </div>
  );
}
