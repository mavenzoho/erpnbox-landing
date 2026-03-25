// ─── Feature Marketing Pages ────────────────────────────────────────────────────
// Individual feature pages linked from the main website for SEO and marketing.

function FeatureLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="ERPnBox" className="h-10 w-auto" />
            <span className="text-xl font-bold text-gray-900">
              ERP<span className="text-brand-500">n</span>Box
            </span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            <a href="/#features" className="text-sm font-medium text-gray-600 hover:text-brand-600">
              Features
            </a>
            <a href="/docs" className="text-sm font-medium text-gray-600 hover:text-brand-600">
              Help Center
            </a>
            <a
              href="/developers"
              className="text-sm font-medium text-gray-600 hover:text-brand-600"
            >
              Developers
            </a>
            <a
              href="/#pricing"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 shadow-sm"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </nav>
      <div className="pt-16">{children}</div>
      {/* CTA */}
      <section className="py-20 bg-brand-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand-500/50 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-700/50 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-brand-100 mb-8">
            Start your free trial today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/#pricing"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-brand-600 font-semibold text-lg hover:bg-brand-50 shadow-lg"
            >
              Start Free Trial
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
            <a
              href="/docs"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-500/30 text-white font-semibold text-lg border border-brand-400/40 hover:bg-brand-500/50"
            >
              Read the Guide
            </a>
          </div>
        </div>
      </section>
      {/* Footer mini */}
      <footer className="bg-gray-900 text-gray-500 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} ERPnBox. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm">
            <a href="/" className="hover:text-white">
              Home
            </a>
            <a href="/docs" className="hover:text-white">
              Help Center
            </a>
            <a href="/developers" className="hover:text-white">
              API Docs
            </a>
            <a href="/#pricing" className="hover:text-white">
              Pricing
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureHero({
  badge,
  title,
  subtitle,
  gradient,
}: {
  badge: string;
  title: string;
  subtitle: string;
  gradient: string;
}) {
  return (
    <section className={`relative py-20 sm:py-28 overflow-hidden bg-gradient-to-br ${gradient}`}>
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-6">
          {badge}
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          {title}
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">{subtitle}</p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/#pricing"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-gray-900 font-semibold text-lg hover:bg-gray-100 shadow-lg"
          >
            Start Free Trial
          </a>
          <a
            href="/docs"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white/10 text-white font-semibold text-lg border border-white/20 hover:bg-white/20"
          >
            View Documentation
          </a>
        </div>
      </div>
    </section>
  );
}

function FeatureGrid({ features }: { features: { icon: string; title: string; desc: string }[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
      {features.map((f, i) => (
        <div
          key={i}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}

function ScreenPlaceholder({ title, desc }: { title: string; desc: string }) {
  return (
    <div
      className="my-12 rounded-2xl border-2 border-dashed border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center text-center p-12"
      style={{ aspectRatio: '16/9' }}
    >
      <svg
        className="w-16 h-16 text-gray-300 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 003.75 21z"
        />
      </svg>
      <p className="text-sm font-semibold text-gray-400">{title}</p>
      <p className="text-xs text-gray-400 mt-1 max-w-sm">{desc}</p>
    </div>
  );
}

// ─── CRM Feature Page ───────────────────────────────────────────────────────────

export function CrmFeaturePage() {
  return (
    <FeatureLayout>
      <FeatureHero
        badge="CRM & Sales"
        title="Close more deals with a CRM built for your workflow"
        subtitle="Manage leads, contacts, accounts, and deals through a fully customizable pipeline. Track every interaction and never let an opportunity slip."
        gradient="from-brand-600 to-blue-700"
      />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Everything you need to manage your sales
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              From first touch to closed deal, ERPnBox CRM gives your team the tools to sell
              smarter.
            </p>
          </div>
          <ScreenPlaceholder
            title="CRM Dashboard"
            desc="Sales dashboard with pipeline overview, KPIs, and activity feed"
          />
          <FeatureGrid
            features={[
              {
                icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
                title: 'Lead & Contact Management',
                desc: 'Capture leads from any source, qualify them with scoring rules, and convert to contacts when ready.',
              },
              {
                icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
                title: 'Visual Pipeline',
                desc: 'Drag-and-drop Kanban board for deals. See total value at each stage and identify bottlenecks instantly.',
              },
              {
                icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
                title: 'Dynamic Modules',
                desc: 'Create custom modules for any business entity. Add fields, set validations, and configure layouts without code.',
              },
              {
                icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
                title: 'Email Integration',
                desc: 'Send and receive emails directly from records. Auto-link conversations to the right contact or deal.',
              },
              {
                icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
                title: 'Global Search',
                desc: 'Find any record across all modules instantly. Search by name, email, phone, or any text field.',
              },
              {
                icon: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z',
                title: 'Tags & Organization',
                desc: 'Tag records with color-coded labels for flexible categorization that works across all modules.',
              },
            ]}
          />
        </div>
      </section>
    </FeatureLayout>
  );
}

// ─── Automation Feature Page ────────────────────────────────────────────────────

export function AutomationFeaturePage() {
  return (
    <FeatureLayout>
      <FeatureHero
        badge="Automation"
        title="Automate your business processes end-to-end"
        subtitle="Workflow rules, blueprints, custom functions, and assignment rules. Let the system do the repetitive work so your team can focus on closing."
        gradient="from-violet-600 to-purple-700"
      />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <ScreenPlaceholder
            title="Workflow Rule Builder"
            desc="Visual workflow builder with trigger, condition, and action configuration"
          />
          <FeatureGrid
            features={[
              {
                icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594',
                title: 'Workflow Rules',
                desc: 'Trigger field updates, emails, tasks, and webhooks when records are created or updated.',
              },
              {
                icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5',
                title: 'Blueprints',
                desc: 'Define structured processes with mandatory transitions, required fields, and approval gates.',
              },
              {
                icon: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5',
                title: 'Custom Functions',
                desc: 'Write JavaScript functions for complex logic. Execute on triggers, schedules, or API calls.',
              },
              {
                icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493',
                title: 'Assignment Rules',
                desc: 'Auto-assign records to users based on criteria, round-robin, or workload balancing.',
              },
              {
                icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                title: 'Approval Processes',
                desc: 'Multi-step approval workflows with notifications, delegation, and conditional routing.',
              },
              {
                icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
                title: 'Escalation Rules',
                desc: 'Auto-escalate stale records to managers with configurable time thresholds.',
              },
            ]}
          />
        </div>
      </section>
    </FeatureLayout>
  );
}

// ─── Analytics Feature Page ─────────────────────────────────────────────────────

export function AnalyticsFeaturePage() {
  return (
    <FeatureLayout>
      <FeatureHero
        badge="Analytics & Reports"
        title="Turn your data into actionable insights"
        subtitle="Build custom dashboards, track KPIs, and generate reports. Real-time analytics across all your modules."
        gradient="from-emerald-600 to-teal-700"
      />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <ScreenPlaceholder
            title="Analytics Dashboard"
            desc="Custom analytics dashboard with charts, KPI cards, and trend indicators"
          />
          <FeatureGrid
            features={[
              {
                icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
                title: 'Custom Charts',
                desc: 'Bar, line, pie, donut, and funnel charts. Build any visualization from your live data.',
              },
              {
                icon: 'M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.518l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941',
                title: 'KPI Dashboard',
                desc: 'Define targets, track progress, and compare performance across users, teams, and time periods.',
              },
              {
                icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
                title: 'Saved Reports',
                desc: 'Save analytics as reports, organize in folders, and schedule automatic email delivery.',
              },
              {
                icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5',
                title: 'Scheduled Reports',
                desc: 'Get reports delivered to your inbox daily, weekly, or monthly. Never miss a metric.',
              },
            ]}
          />
        </div>
      </section>
    </FeatureLayout>
  );
}

// ─── HRMS Feature Page ──────────────────────────────────────────────────────────

export function HrmsFeaturePage() {
  return (
    <FeatureLayout>
      <FeatureHero
        badge="HRMS"
        title="Manage your workforce from one platform"
        subtitle="Attendance, shifts, leave, payroll, departments, and more. A complete HR management system integrated with your CRM."
        gradient="from-amber-500 to-orange-600"
      />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <ScreenPlaceholder
            title="HRMS Overview"
            desc="HR dashboard showing attendance summary, upcoming leaves, shift schedule, and payroll status"
          />
          <FeatureGrid
            features={[
              {
                icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
                title: 'Attendance',
                desc: 'Check-in/out, break logging, geofencing, regularization, and comprehensive policies with penalty rules.',
              },
              {
                icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5',
                title: 'Shift Management',
                desc: 'Define shifts, create rotating patterns, and assign employees with a visual calendar.',
              },
              {
                icon: 'M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9',
                title: 'Leave Management',
                desc: 'Leave types, accrual rules, approval workflows, balance tracking, and team calendar.',
              },
              {
                icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z',
                title: 'Payroll',
                desc: 'Salary components, tax rules, pay runs, pay slips, loans, and bonus/misconduct tracking.',
              },
              {
                icon: 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21',
                title: 'Departments',
                desc: 'Hierarchical department structure for organizational modeling and reporting.',
              },
              {
                icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z',
                title: 'Locations',
                desc: 'Multi-location support with geofencing for attendance and shift assignment by site.',
              },
            ]}
          />
        </div>
      </section>
    </FeatureLayout>
  );
}

// ─── Security Feature Page ──────────────────────────────────────────────────────

export function SecurityFeaturePage() {
  return (
    <FeatureLayout>
      <FeatureHero
        badge="Security & Access Control"
        title="Enterprise-grade security for your data"
        subtitle="Role-based access, field-level permissions, sharing rules, record locking, and complete audit trails."
        gradient="from-gray-800 to-gray-900"
      />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <ScreenPlaceholder
            title="Security Overview"
            desc="Role hierarchy tree, permission matrix, and audit log overview"
          />
          <FeatureGrid
            features={[
              {
                icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
                title: 'Role Hierarchy',
                desc: "Define organizational hierarchy that controls data visibility. Managers see their team's data automatically.",
              },
              {
                icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z',
                title: 'Profiles & Permissions',
                desc: 'Module-level and field-level permissions. Control who can view, create, edit, and delete.',
              },
              {
                icon: 'M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z',
                title: 'Sharing Rules',
                desc: 'Extend access beyond the hierarchy with criteria-based and owner-based sharing rules.',
              },
              {
                icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z',
                title: 'Record Locking',
                desc: 'Lock records manually or automatically based on criteria. Role-based exceptions for overrides.',
              },
              {
                icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
                title: 'Audit Trail',
                desc: 'Complete log of every action. Who did what, when, from where. Essential for compliance.',
              },
              {
                icon: 'M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z',
                title: 'API Key Security',
                desc: 'Scoped API keys with expiration dates. Keys are hashed at rest and shown only once.',
              },
            ]}
          />
        </div>
      </section>
    </FeatureLayout>
  );
}

// ─── Support Page ───────────────────────────────────────────────────────────────

export function SupportPage() {
  return (
    <FeatureLayout>
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">How can we help?</h1>
            <p className="mt-4 text-lg text-gray-600">
              Find answers, get support, and learn how to make the most of ERPnBox.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              {
                title: 'Help Center',
                desc: 'Comprehensive guides for every feature',
                href: '/docs',
                icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
              },
              {
                title: 'API Documentation',
                desc: 'Build integrations with our REST API',
                href: '/developers',
                icon: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5',
              },
              {
                title: 'Email Support',
                desc: 'Get help from our support team',
                href: 'mailto:support@erpnbox.com',
                icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
              },
              {
                title: 'GitHub',
                desc: 'Report issues and track updates',
                href: 'https://github.com/mavenzoho/erpnbox',
                icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418',
              },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="group flex gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:border-brand-200 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-100">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-700">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <div className="max-w-2xl mx-auto space-y-4 mt-6 text-left">
              {[
                {
                  q: 'How do I reset my password?',
                  a: 'Click "Forgot Password" on the login page. Enter your email and follow the reset link sent to your inbox.',
                },
                {
                  q: 'Can I import data from another CRM?',
                  a: 'Yes! Export your data as CSV from your current CRM, then use our Import tool to map and import all records.',
                },
                {
                  q: 'How many users can I add?',
                  a: 'The free plan includes 3 users. Professional and Enterprise plans support unlimited users.',
                },
                {
                  q: 'Is my data secure?',
                  a: 'Yes. ERPnBox uses row-level tenant isolation, encrypted connections (TLS), hashed passwords, and complete audit logging.',
                },
                {
                  q: 'Can I create custom modules?',
                  a: 'Absolutely! Use the Module Designer to create any custom module with custom fields, layouts, and validation rules.',
                },
                {
                  q: 'Do you offer an API?',
                  a: 'Yes. ERPnBox has a full REST API with API key authentication, scoped permissions, and webhook support.',
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <summary className="cursor-pointer px-5 py-4 text-sm font-semibold text-gray-900 flex items-center justify-between">
                    {faq.q}
                    <svg
                      className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-600">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </FeatureLayout>
  );
}
