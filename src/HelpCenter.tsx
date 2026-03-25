import { useState } from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────────

type Category =
  | 'getting-started'
  | 'crm'
  | 'automation'
  | 'analytics'
  | 'email'
  | 'admin'
  | 'hrms'
  | 'integrations';

interface Section {
  id: string;
  label: string;
  category: Category;
}

interface CategoryInfo {
  id: Category;
  label: string;
  icon: string;
  description: string;
}

// ─── Data ───────────────────────────────────────────────────────────────────────

const CATEGORIES: CategoryInfo[] = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
    description: 'Set up your account and learn the basics',
  },
  {
    id: 'crm',
    label: 'CRM',
    icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
    description: 'Manage leads, contacts, deals, and more',
  },
  {
    id: 'automation',
    label: 'Automation',
    icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z',
    description: 'Workflows, blueprints, and custom functions',
  },
  {
    id: 'analytics',
    label: 'Analytics & Reports',
    icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
    description: 'Dashboards, KPIs, and saved reports',
  },
  {
    id: 'email',
    label: 'Email',
    icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
    description: 'Email accounts, compose, and CRM linking',
  },
  {
    id: 'admin',
    label: 'Administration',
    icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
    description: 'Users, roles, profiles, and security',
  },
  {
    id: 'hrms',
    label: 'HRMS',
    icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
    description: 'Attendance, shifts, leave, and payroll',
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: 'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244',
    description: 'API keys, webhooks, and social sync',
  },
];

const SECTIONS: Section[] = [
  // Getting Started
  { id: 'welcome', label: 'Welcome to ERPnBox', category: 'getting-started' },
  { id: 'registration', label: 'Registration & First Login', category: 'getting-started' },
  { id: 'dashboard-overview', label: 'Dashboard Overview', category: 'getting-started' },
  { id: 'navigation', label: 'Navigation & Layout', category: 'getting-started' },
  { id: 'quick-setup', label: 'Quick Setup Checklist', category: 'getting-started' },
  // CRM
  { id: 'modules-overview', label: 'Modules Overview', category: 'crm' },
  { id: 'records-list', label: 'Records List View', category: 'crm' },
  { id: 'records-detail', label: 'Record Detail Page', category: 'crm' },
  { id: 'records-create', label: 'Creating & Editing Records', category: 'crm' },
  { id: 'kanban-view', label: 'Kanban Board View', category: 'crm' },
  { id: 'leads', label: 'Leads Management', category: 'crm' },
  { id: 'lead-conversion', label: 'Lead Conversion', category: 'crm' },
  { id: 'contacts-accounts', label: 'Contacts & Accounts', category: 'crm' },
  { id: 'deals-pipeline', label: 'Deals & Pipeline', category: 'crm' },
  { id: 'tags', label: 'Tags & Categorization', category: 'crm' },
  { id: 'import-data', label: 'Importing Data', category: 'crm' },
  { id: 'global-search', label: 'Global Search', category: 'crm' },
  { id: 'field-history', label: 'Field History & Audit Trail', category: 'crm' },
  // Automation
  { id: 'workflow-rules', label: 'Workflow Rules', category: 'automation' },
  { id: 'blueprints', label: 'Blueprints (Process Flows)', category: 'automation' },
  { id: 'custom-functions', label: 'Custom Functions', category: 'automation' },
  { id: 'assignment-rules', label: 'Assignment Rules', category: 'automation' },
  { id: 'approval-processes', label: 'Approval Processes', category: 'automation' },
  { id: 'escalation-rules', label: 'Escalation Rules', category: 'automation' },
  { id: 'scoring-rules', label: 'Scoring Rules', category: 'automation' },
  { id: 'scheduled-actions', label: 'Scheduled Actions', category: 'automation' },
  { id: 'validation-rules', label: 'Validation Rules', category: 'automation' },
  // Analytics
  { id: 'analytics-engine', label: 'Analytics Engine', category: 'analytics' },
  { id: 'kpi-dashboard', label: 'KPI Dashboard', category: 'analytics' },
  { id: 'saved-reports', label: 'Saved Reports', category: 'analytics' },
  { id: 'dashboard-cards', label: 'Dashboard Cards', category: 'analytics' },
  // Email
  { id: 'email-accounts', label: 'Email Account Setup', category: 'email' },
  { id: 'email-compose', label: 'Compose & Send', category: 'email' },
  { id: 'email-crm-link', label: 'CRM Record Linking', category: 'email' },
  { id: 'email-templates', label: 'Email Templates', category: 'email' },
  // Administration
  { id: 'users-management', label: 'User Management', category: 'admin' },
  { id: 'roles-hierarchy', label: 'Roles & Hierarchy', category: 'admin' },
  { id: 'profiles-permissions', label: 'Profiles & Permissions', category: 'admin' },
  { id: 'sharing-rules', label: 'Sharing Rules', category: 'admin' },
  { id: 'teams', label: 'Teams', category: 'admin' },
  { id: 'org-settings', label: 'Organization Settings', category: 'admin' },
  { id: 'module-designer', label: 'Module Designer', category: 'admin' },
  { id: 'global-picklists', label: 'Global Picklists', category: 'admin' },
  { id: 'record-locking', label: 'Record Locking', category: 'admin' },
  { id: 'document-templates', label: 'Document Templates', category: 'admin' },
  { id: 'audit-log', label: 'Audit Log', category: 'admin' },
  { id: 'login-history', label: 'Login History', category: 'admin' },
  // HRMS
  { id: 'attendance', label: 'Attendance Management', category: 'hrms' },
  { id: 'shifts', label: 'Shift Management', category: 'hrms' },
  { id: 'leave-management', label: 'Leave Management', category: 'hrms' },
  { id: 'payroll', label: 'Payroll', category: 'hrms' },
  { id: 'departments', label: 'Departments', category: 'hrms' },
  { id: 'locations', label: 'Locations', category: 'hrms' },
  // Integrations
  { id: 'api-keys', label: 'API Keys', category: 'integrations' },
  { id: 'webhooks-guide', label: 'Webhooks', category: 'integrations' },
  { id: 'social-sync', label: 'Social Media Sync', category: 'integrations' },
  { id: 'app-marketplace', label: 'App Marketplace', category: 'integrations' },
];

// ─── Screenshot Placeholder Component ───────────────────────────────────────────

function ScreenshotPlaceholder({
  title,
  description,
  aspectRatio = '16/9',
  screenshot,
}: {
  title: string;
  description: string;
  aspectRatio?: string;
  screenshot?: string;
}) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = screenshot ? `/docs/screenshots/${screenshot}.png` : null;

  // If we have a screenshot file, try to show it
  if (imgSrc && !imgError) {
    return (
      <div className="my-6">
        <img
          src={imgSrc}
          alt={title}
          className="rounded-xl border border-gray-200 shadow-sm w-full"
          onError={() => setImgError(true)}
        />
        <p className="text-xs text-gray-400 text-center mt-2">{title}</p>
      </div>
    );
  }

  // Fallback placeholder
  return (
    <div
      className="my-6 rounded-xl border-2 border-dashed border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center text-center p-8"
      style={{ aspectRatio }}
    >
      <svg
        className="w-12 h-12 text-gray-300 mb-3"
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
      <p className="text-xs text-gray-400 mt-1 max-w-xs">{description}</p>
    </div>
  );
}

// ─── Shared Components ──────────────────────────────────────────────────────────

function Heading({ children }: { children: React.ReactNode }) {
  return <h1 className="text-3xl font-bold text-gray-900 mb-3">{children}</h1>;
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold text-gray-900 mt-10 mb-3 pb-2 border-b border-gray-200">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-600 leading-relaxed mb-4">{children}</p>;
}

function Callout({
  type = 'info',
  children,
}: {
  type?: 'info' | 'tip' | 'warning';
  children: React.ReactNode;
}) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    tip: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
  };
  const icons = {
    info: 'M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z',
    tip: 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18',
    warning:
      'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z',
  };
  return (
    <div className={`rounded-lg border p-4 my-4 ${styles[type]}`}>
      <div className="flex gap-3">
        <svg
          className="w-5 h-5 flex-shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={icons[type]} />
        </svg>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

function StepList({ steps }: { steps: { title: string; desc: string }[] }) {
  return (
    <ol className="space-y-4 my-4">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">
            {i + 1}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{step.title}</p>
            <p className="text-sm text-gray-600 mt-0.5">{step.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function KeyboardShortcut({ keys }: { keys: string }) {
  return (
    <span className="inline-flex gap-1">
      {keys.split('+').map((k, i) => (
        <kbd
          key={i}
          className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-mono text-gray-700"
        >
          {k.trim()}
        </kbd>
      ))}
    </span>
  );
}

// ─── Content Sections ───────────────────────────────────────────────────────────

function WelcomeSection() {
  return (
    <div>
      <Heading>Welcome to ERPnBox</Heading>
      <P>
        ERPnBox is a modular, multi-tenant ERP platform designed for businesses of all sizes.
        Starting with a powerful CRM, it extends to HRMS, automation, analytics, and beyond &mdash;
        all customizable without writing a single line of code.
      </P>

      <ScreenshotPlaceholder
        title="ERPnBox Dashboard"
        description="The main dashboard showing KPIs, pipeline overview, and recent activity"
        screenshot="dashboard-overview"
      />

      <SubHeading>What You Can Do with ERPnBox</SubHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
        {[
          {
            title: 'Manage Your Pipeline',
            desc: 'Track leads, contacts, accounts, and deals through customizable stages.',
          },
          {
            title: 'Automate Workflows',
            desc: 'Set up rules that trigger actions automatically when conditions are met.',
          },
          {
            title: 'Analyze Performance',
            desc: 'Build dashboards with KPIs, charts, and real-time analytics.',
          },
          {
            title: 'Customize Everything',
            desc: 'Create custom modules, fields, layouts, and validation rules.',
          },
          {
            title: 'Manage Your Team',
            desc: 'Handle attendance, shifts, leave, and payroll in one place.',
          },
          {
            title: 'Integrate & Extend',
            desc: 'Connect via API, webhooks, and the app marketplace.',
          },
        ].map((item) => (
          <div key={item.title} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
            <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      <SubHeading>How This Guide Is Organized</SubHeading>
      <P>
        This guide is organized by feature area. Use the sidebar to navigate to any topic. Each
        section includes step-by-step instructions, screenshots, and tips to help you get the most
        out of ERPnBox.
      </P>

      <Callout type="tip">
        <strong>New to ERPnBox?</strong> Start with the <strong>Getting Started</strong> section to
        set up your account, then explore the <strong>CRM</strong> section to learn the core
        features.
      </Callout>
    </div>
  );
}

function RegistrationSection() {
  return (
    <div>
      <Heading>Registration & First Login</Heading>
      <P>
        Getting started with ERPnBox takes just a few minutes. Here's how to create your account and
        log in for the first time.
      </P>

      <SubHeading>Creating Your Account</SubHeading>
      <StepList
        steps={[
          {
            title: 'Visit the registration page',
            desc: 'Go to app.erpnbox.com/register or click "Start Free Trial" on the website.',
          },
          {
            title: 'Choose an industry template',
            desc: 'Select a pre-built template (Real Estate, Sales, Recruitment, etc.) or start from scratch.',
          },
          {
            title: 'Fill in your details',
            desc: 'Enter your company name, full name, email address, and create a password.',
          },
          {
            title: 'Verify your email',
            desc: 'Check your inbox for a verification email and click the confirmation link.',
          },
          {
            title: 'Log in to your workspace',
            desc: 'Use your credentials to access your new ERPnBox workspace.',
          },
        ]}
      />

      <ScreenshotPlaceholder
        title="Registration Page"
        description="The registration form with template selection, company details, and account creation fields"
        screenshot="dashboard-overview"
      />

      <SubHeading>First Login Experience</SubHeading>
      <P>
        When you first log in, ERPnBox presents your dashboard pre-populated with your chosen
        template's modules and sample data. You'll be logged in as a <strong>Super Admin</strong>{' '}
        with full access to all features and settings.
      </P>

      <ScreenshotPlaceholder
        title="First Login Dashboard"
        description="Dashboard view after first login showing template modules, sample data, and the getting started guide"
        screenshot="dashboard-overview"
      />

      <Callout type="info">
        <strong>Your role:</strong> As the account creator, you automatically receive the{' '}
        <strong>Super Admin</strong> role, giving you full control over the entire workspace
        including settings, user management, and all modules.
      </Callout>

      <SubHeading>Inviting Team Members</SubHeading>
      <P>
        Ready to bring your team onboard? Navigate to <strong>Settings → Users</strong> to invite
        colleagues. Each user receives an email with a link to set their password and join your
        workspace.
      </P>
    </div>
  );
}

function DashboardOverviewSection() {
  return (
    <div>
      <Heading>Dashboard Overview</Heading>
      <P>
        The dashboard is your command center &mdash; it provides an at-a-glance view of your most
        important metrics, recent activity, and quick actions.
      </P>

      <ScreenshotPlaceholder
        title="Main Dashboard"
        description="Full dashboard view with KPI cards, pipeline chart, activity feed, and quick action buttons"
        screenshot="dashboard-overview"
      />

      <SubHeading>Dashboard Components</SubHeading>

      <H3>KPI Cards</H3>
      <P>
        The top row displays key performance indicators that update in real-time. Default KPIs
        include open deals, new leads, meetings today, and tasks due. You can customize these in{' '}
        <strong>Settings → KPI Manager</strong>.
      </P>

      <ScreenshotPlaceholder
        title="KPI Cards Row"
        description="Four KPI cards showing metrics like Open Deals ($284K), New Leads (147), Meetings Today (12), Tasks Due (23)"
        aspectRatio="4/1"
        screenshot="kpi-dashboard"
      />

      <H3>Pipeline Chart</H3>
      <P>
        A visual bar chart showing your revenue pipeline over time. Hover over any bar to see the
        exact value. Click to drill down into the records for that period.
      </P>

      <H3>Module Activity</H3>
      <P>
        The right panel shows usage metrics across your modules, helping you understand which areas
        of your CRM are most active.
      </P>

      <H3>Recent Activity Feed</H3>
      <P>
        A chronological feed of recent actions across your workspace &mdash; record creates,
        updates, stage changes, notes, and more.
      </P>

      <SubHeading>Customizing Your Dashboard</SubHeading>
      <P>
        Admins can customize the dashboard by adding, removing, or rearranging dashboard cards. Go
        to <strong>Settings → Dashboard Cards</strong> to configure what appears on the dashboard
        for each role.
      </P>
    </div>
  );
}

function NavigationSection() {
  return (
    <div>
      <Heading>Navigation & Layout</Heading>
      <P>ERPnBox uses a clean, efficient layout with a collapsible sidebar and a top header bar.</P>

      <ScreenshotPlaceholder
        title="Application Layout"
        description="Full application layout showing the left sidebar with module navigation, top header with search and profile, and main content area"
        screenshot="dashboard-overview"
      />

      <SubHeading>Sidebar Navigation</SubHeading>
      <P>The left sidebar contains:</P>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Dashboard</strong> &mdash; Your home screen with KPIs and activity
        </li>
        <li>
          <strong>Module links</strong> &mdash; Quick access to Leads, Contacts, Accounts, Deals,
          and all custom modules
        </li>
        <li>
          <strong>Email</strong> &mdash; Your integrated email inbox
        </li>
        <li>
          <strong>Reports</strong> &mdash; Analytics and saved reports
        </li>
        <li>
          <strong>Settings</strong> &mdash; Administration and configuration (admin users only)
        </li>
      </ul>

      <Callout type="tip">
        <strong>Customize navigation:</strong> Admins can reorder, hide, or group modules in the
        sidebar via <strong>Settings → Navigation</strong>.
      </Callout>

      <SubHeading>Top Header Bar</SubHeading>
      <P>The top bar provides:</P>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Global Search</strong> (<KeyboardShortcut keys="Ctrl + K" />) &mdash; Search
          across all modules instantly
        </li>
        <li>
          <strong>Quick Create</strong> (<strong>+</strong> button) &mdash; Create a new record in
          any module
        </li>
        <li>
          <strong>Notifications</strong> &mdash; Bell icon shows unread notifications
        </li>
        <li>
          <strong>Profile Menu</strong> &mdash; Your avatar with options for profile, preferences,
          and logout
        </li>
      </ul>

      <SubHeading>Responsive Design</SubHeading>
      <P>
        ERPnBox is fully responsive. On tablets and smaller screens, the sidebar collapses to an
        icon-only view, and the layout adapts to fit your screen.
      </P>
    </div>
  );
}

function QuickSetupSection() {
  return (
    <div>
      <Heading>Quick Setup Checklist</Heading>
      <P>
        Follow this checklist to get your ERPnBox workspace fully configured and ready for your
        team.
      </P>

      <div className="space-y-3 my-6">
        {[
          {
            title: 'Complete your organization profile',
            desc: 'Go to Settings → Company Settings to add your logo, address, timezone, and currency.',
            link: 'org-settings',
          },
          {
            title: 'Set up your modules',
            desc: 'Review the template modules or create custom ones in Settings → Modules.',
            link: 'modules-overview',
          },
          {
            title: 'Configure roles & profiles',
            desc: "Define your team's access levels in Settings → Roles and Settings → Profiles.",
            link: 'roles-hierarchy',
          },
          {
            title: 'Invite your team',
            desc: 'Add users in Settings → Users and assign them appropriate roles.',
            link: 'users-management',
          },
          {
            title: 'Import your data',
            desc: 'Bulk import existing data from CSV files using the Import tool.',
            link: 'import-data',
          },
          {
            title: 'Set up email integration',
            desc: 'Connect your email accounts for sending and receiving within ERPnBox.',
            link: 'email-accounts',
          },
          {
            title: 'Configure automation',
            desc: 'Set up workflow rules, assignment rules, and blueprints for your processes.',
            link: 'workflow-rules',
          },
          {
            title: 'Build your dashboards',
            desc: 'Configure KPIs and dashboard cards for real-time visibility.',
            link: 'kpi-dashboard',
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100"
          >
            <div className="flex-shrink-0 w-6 h-6 rounded border-2 border-gray-300 flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-gray-400">{i + 1}</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
              <p className="text-sm text-gray-600 mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModulesOverviewSection() {
  return (
    <div>
      <Heading>Modules Overview</Heading>
      <P>
        Modules are the building blocks of ERPnBox. Each module represents a business entity &mdash;
        like Leads, Contacts, Deals, or any custom object you define. Modules contain fields
        (columns) and records (rows of data).
      </P>

      <ScreenshotPlaceholder
        title="Module List"
        description="Settings → Modules page showing all active modules with their icons, record counts, and actions (edit, deactivate, delete)"
        screenshot="modules-overview"
      />

      <SubHeading>Default Modules</SubHeading>
      <P>
        Depending on your chosen template, your workspace comes with pre-configured modules. A
        typical Sales CRM template includes:
      </P>

      <div className="overflow-x-auto my-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 pr-4 font-semibold text-gray-700">Module</th>
              <th className="text-left py-2 pr-4 font-semibold text-gray-700">Purpose</th>
              <th className="text-left py-2 font-semibold text-gray-700">Key Fields</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              ['Leads', 'Potential customers to qualify', 'Name, Email, Phone, Source, Stage'],
              ['Contacts', 'Qualified individuals', 'Name, Email, Phone, Account, Title'],
              ['Accounts', 'Organizations / companies', 'Name, Industry, Website, Revenue'],
              ['Deals', 'Sales opportunities', 'Name, Amount, Stage, Close Date, Account'],
              ['Tasks', 'Action items & follow-ups', 'Subject, Due Date, Priority, Status'],
              ['Meetings', 'Scheduled meetings', 'Title, Date, Time, Attendees, Location'],
              ['Calls', 'Phone call logs', 'Subject, Date, Duration, Type, Related To'],
            ].map(([mod, purpose, fields]) => (
              <tr key={mod}>
                <td className="py-2 pr-4 font-medium text-gray-900">{mod}</td>
                <td className="py-2 pr-4 text-gray-600">{purpose}</td>
                <td className="py-2 text-gray-500 text-xs">{fields}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubHeading>Creating Custom Modules</SubHeading>
      <P>
        Need to track something not covered by the default modules? Create custom modules in{' '}
        <strong>Settings → Modules → New Module</strong>.
      </P>

      <StepList
        steps={[
          {
            title: 'Go to Settings → Modules',
            desc: 'Click the "+ New Module" button in the top right corner.',
          },
          {
            title: 'Define module basics',
            desc: 'Enter the module name, API name, icon, and description.',
          },
          {
            title: 'Add fields',
            desc: "Use the Module Designer to drag-and-drop field types and configure each field's properties.",
          },
          {
            title: 'Configure layout',
            desc: 'Arrange fields into sections for the create/edit form and detail view.',
          },
          {
            title: 'Activate the module',
            desc: 'Toggle the module to active. It will appear in the sidebar navigation.',
          },
        ]}
      />

      <ScreenshotPlaceholder
        title="Module Designer"
        description="The Module Designer interface showing the field palette on the left, the layout canvas in the center, and field properties panel on the right"
        screenshot="module-designer"
      />

      <SubHeading>Field Types</SubHeading>
      <P>ERPnBox supports a rich set of field types to model any kind of data:</P>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-4">
        {[
          { type: 'Text', desc: 'Single-line text' },
          { type: 'Text Area', desc: 'Multi-line text' },
          { type: 'Email', desc: 'Email with validation' },
          { type: 'Phone', desc: 'Phone number' },
          { type: 'Number', desc: 'Integer values' },
          { type: 'Decimal', desc: 'Decimal numbers' },
          { type: 'Currency', desc: 'Money amounts' },
          { type: 'Date', desc: 'Date picker' },
          { type: 'Date/Time', desc: 'Date + time picker' },
          { type: 'Boolean', desc: 'Yes/No checkbox' },
          { type: 'Picklist', desc: 'Single-select dropdown' },
          { type: 'Multi-Picklist', desc: 'Multi-select dropdown' },
          { type: 'Lookup', desc: 'Link to another module' },
          { type: 'URL', desc: 'Web address' },
          { type: 'Auto Number', desc: 'Auto-incrementing ID' },
          { type: 'Formula', desc: 'Calculated field' },
        ].map((f) => (
          <div key={f.type} className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
            <p className="text-sm font-medium text-gray-900">{f.type}</p>
            <p className="text-xs text-gray-500">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecordsListSection() {
  return (
    <div>
      <Heading>Records List View</Heading>
      <P>
        The list view is where you browse, search, filter, and manage records within any module. It
        provides a spreadsheet-like table with powerful tools for working with your data.
      </P>

      <ScreenshotPlaceholder
        title="Records List View"
        description="List view showing a table of Lead records with columns (Name, Email, Stage, Source, Owner), search bar, filters, bulk actions toolbar, and pagination controls"
        screenshot="records-list-leads"
      />

      <SubHeading>Searching & Filtering</SubHeading>
      <P>
        Use the search bar at the top to instantly find records by any text field. For more precise
        filtering:
      </P>

      <StepList
        steps={[
          { title: 'Click the filter icon', desc: 'Opens the filter panel with available fields.' },
          {
            title: 'Select a field to filter by',
            desc: 'Choose from any field in the module (Stage, Owner, Date, etc.).',
          },
          {
            title: 'Set the condition',
            desc: 'Equals, contains, is empty, between dates, and more.',
          },
          { title: 'Apply multiple filters', desc: 'Stack multiple filters with AND logic.' },
        ]}
      />

      <SubHeading>Column Customization</SubHeading>
      <P>
        Customize which columns are visible and their order. Click the column settings icon to
        show/hide fields, or drag column headers to reorder them.
      </P>

      <SubHeading>Sorting</SubHeading>
      <P>
        Click any column header to sort ascending. Click again for descending. A small arrow
        indicates the current sort direction.
      </P>

      <SubHeading>Bulk Actions</SubHeading>
      <P>Select multiple records using the checkboxes, then use the bulk actions toolbar to:</P>
      <ul className="list-disc list-inside space-y-1 text-gray-600 mb-4">
        <li>
          <strong>Mass Update</strong> &mdash; Change a field value across all selected records
        </li>
        <li>
          <strong>Mass Delete</strong> &mdash; Delete selected records (with confirmation)
        </li>
        <li>
          <strong>Mass Email</strong> &mdash; Send emails to selected contacts/leads
        </li>
        <li>
          <strong>Add Tags</strong> &mdash; Tag selected records for categorization
        </li>
        <li>
          <strong>Change Owner</strong> &mdash; Reassign records to another user
        </li>
      </ul>

      <SubHeading>Pagination</SubHeading>
      <P>
        Records are paginated for performance. Use the pagination controls at the bottom to navigate
        between pages. You can also adjust the number of records per page (20, 50, or 100).
      </P>
    </div>
  );
}

function RecordsDetailSection() {
  return (
    <div>
      <Heading>Record Detail Page</Heading>
      <P>
        The detail page shows all information about a single record, including its field values,
        related records, activity timeline, and action buttons.
      </P>

      <ScreenshotPlaceholder
        title="Record Detail Page"
        description="Detail view of a Lead record showing header with name and stage badge, field values in sections, related records tabs (Activities, Notes, Attachments), timeline on the right, and action buttons (Edit, Convert, Delete)"
        screenshot="records-detail"
      />

      <SubHeading>Page Layout</SubHeading>
      <P>The detail page is organized into several key areas:</P>

      <H3>Header Section</H3>
      <P>
        Displays the record name, current stage/status badge, owner, and quick action buttons (Edit,
        Delete, Clone, Print). For leads, you'll also see the Convert button.
      </P>

      <H3>Field Details</H3>
      <P>
        All fields are displayed in organized sections. Fields are shown in a two-column layout with
        labels and values. Empty fields are hidden by default (toggle "Show All" to reveal them).
      </P>

      <H3>Related Records</H3>
      <P>
        Tabs at the bottom show records linked via lookup fields. For example, an Account detail
        page shows related Contacts, Deals, and Activities.
      </P>

      <H3>Activity Timeline</H3>
      <P>
        A chronological timeline on the right sidebar shows all interactions: emails sent, notes
        added, stage changes, field updates, calls, meetings, and tasks.
      </P>

      <SubHeading>Inline Editing</SubHeading>
      <P>
        Click any field value on the detail page to edit it inline without opening the full edit
        form. Press <KeyboardShortcut keys="Enter" /> to save or <KeyboardShortcut keys="Escape" />{' '}
        to cancel.
      </P>

      <Callout type="tip">
        <strong>Quick Tip:</strong> Use the "Watch" button to follow a record and receive
        notifications whenever it's updated.
      </Callout>
    </div>
  );
}

function RecordsCreateSection() {
  return (
    <div>
      <Heading>Creating & Editing Records</Heading>
      <P>
        ERPnBox provides a dynamic form system that adapts to each module's field configuration.
        Create and edit records with built-in validation and smart defaults.
      </P>

      <ScreenshotPlaceholder
        title="Create Record Form"
        description="Dynamic form for creating a new Lead with sections for Contact Information (Name, Email, Phone), Lead Details (Source, Stage, Industry), and Additional Information fields"
        screenshot="records-create"
      />

      <SubHeading>Creating a New Record</SubHeading>
      <StepList
        steps={[
          {
            title: 'Navigate to the module',
            desc: 'Click the module name in the sidebar (e.g., Leads).',
          },
          {
            title: 'Click "+ New Record"',
            desc: 'Opens the creation form with all fields for this module.',
          },
          {
            title: 'Fill in the fields',
            desc: 'Required fields are marked with a red asterisk (*). The form validates as you type.',
          },
          {
            title: 'Set the record owner',
            desc: 'Defaults to you. Change it to assign to another team member.',
          },
          {
            title: 'Save',
            desc: 'Click "Save" to create the record, or "Save & New" to create and immediately start another.',
          },
        ]}
      />

      <SubHeading>Editing a Record</SubHeading>
      <P>There are two ways to edit:</P>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Full Edit Form:</strong> Click the "Edit" button on the detail page to open the
          full form.
        </li>
        <li>
          <strong>Inline Edit:</strong> Click any field value on the detail page to edit just that
          field.
        </li>
      </ul>

      <SubHeading>Form Features</SubHeading>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Auto-save drafts</strong> &mdash; Unsaved changes are preserved if you navigate
          away
        </li>
        <li>
          <strong>Lookup search</strong> &mdash; Lookup fields show a searchable dropdown of related
          records
        </li>
        <li>
          <strong>Field validation</strong> &mdash; Email, phone, URL, and custom validation rules
          are enforced in real-time
        </li>
        <li>
          <strong>Conditional visibility</strong> &mdash; Fields can show/hide based on other field
          values
        </li>
        <li>
          <strong>Default values</strong> &mdash; Admins can set default values for fields to speed
          up data entry
        </li>
      </ul>
    </div>
  );
}

function KanbanViewSection() {
  return (
    <div>
      <Heading>Kanban Board View</Heading>
      <P>
        The Kanban view provides a visual, drag-and-drop interface for managing records by their
        stage or status. It's ideal for pipeline management, task tracking, and any stage-based
        workflow.
      </P>

      <ScreenshotPlaceholder
        title="Kanban Board"
        description="Kanban board view of Deals module with columns for each stage (New, Qualified, Proposal, Negotiation, Won, Lost). Cards show deal name, amount, owner, and close date. Drag handles visible on hover."
        screenshot="kanban-view"
      />

      <SubHeading>Switching to Kanban View</SubHeading>
      <P>
        On any module's list page, click the view toggle in the top-right corner to switch between{' '}
        <strong>List View</strong> and <strong>Kanban View</strong>. The Kanban view is available
        for any module that has a Picklist field (used as the column grouping).
      </P>

      <SubHeading>Using the Kanban Board</SubHeading>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Drag & Drop:</strong> Move cards between columns to change their stage/status
        </li>
        <li>
          <strong>Quick View:</strong> Click a card to see a summary without leaving the board
        </li>
        <li>
          <strong>Column Totals:</strong> Each column header shows the count and sum (for currency
          fields) of records
        </li>
        <li>
          <strong>Color Coding:</strong> Cards are color-coded by owner or priority for quick
          identification
        </li>
      </ul>

      <SubHeading>Configuring Kanban Columns</SubHeading>
      <P>
        The Kanban view groups records by a Picklist field. By default, it uses the "Stage" field.
        To change the grouping field, click the settings gear icon on the Kanban view and select a
        different Picklist field.
      </P>

      <Callout type="tip">
        <strong>Best Practice:</strong> Use the Kanban view for Deals to visually manage your sales
        pipeline. Drag deals between stages as they progress, and see the total value at each stage
        instantly.
      </Callout>
    </div>
  );
}

function LeadsSection() {
  return (
    <div>
      <Heading>Leads Management</Heading>
      <P>
        Leads are potential customers who have shown interest in your product or service. ERPnBox
        helps you capture, qualify, and convert leads through a structured process.
      </P>

      <ScreenshotPlaceholder
        title="Leads Module"
        description="Leads list view with stage filter chips (New, Contacted, Qualified, Unqualified), sortable columns, and color-coded stage badges"
        screenshot="leads"
      />

      <SubHeading>Lead Lifecycle</SubHeading>
      <P>A typical lead moves through these stages:</P>
      <div className="flex flex-wrap gap-2 my-4">
        {['New', 'Contacted', 'Qualified', 'Unqualified', 'Converted'].map((stage, i) => (
          <div key={stage} className="flex items-center gap-2">
            <div
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                stage === 'Converted'
                  ? 'bg-emerald-100 text-emerald-700'
                  : stage === 'Unqualified'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-brand-100 text-brand-700'
              }`}
            >
              {stage}
            </div>
            {i < 4 && <span className="text-gray-300">→</span>}
          </div>
        ))}
      </div>

      <SubHeading>Capturing Leads</SubHeading>
      <P>Leads can enter your system through multiple channels:</P>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Manual Entry</strong> &mdash; Create leads directly in ERPnBox
        </li>
        <li>
          <strong>CSV Import</strong> &mdash; Bulk import from spreadsheets
        </li>
        <li>
          <strong>API</strong> &mdash; Send leads from web forms, chatbots, or other tools
        </li>
        <li>
          <strong>Social Sync</strong> &mdash; Capture leads from Facebook/Instagram
        </li>
        <li>
          <strong>Webhooks</strong> &mdash; Receive leads from third-party platforms
        </li>
      </ul>

      <SubHeading>Working with Leads</SubHeading>
      <P>From the lead detail page, you can:</P>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>Send emails directly to the lead</li>
        <li>Log calls and meetings</li>
        <li>Add notes and attachments</li>
        <li>Track field changes with history</li>
        <li>Convert qualified leads to Contacts + Deals</li>
      </ul>
    </div>
  );
}

function LeadConversionSection() {
  return (
    <div>
      <Heading>Lead Conversion</Heading>
      <P>
        When a lead is qualified and ready to enter your sales pipeline, convert it to create linked
        Contact, Account, and Deal records in one step.
      </P>

      <ScreenshotPlaceholder
        title="Lead Conversion Dialog"
        description="Lead conversion modal showing three sections: Create Contact (pre-filled from lead), Create/Select Account, Create Deal (with amount and stage), and a mapping summary"
        screenshot="lead-conversion"
      />

      <SubHeading>How to Convert a Lead</SubHeading>
      <StepList
        steps={[
          { title: 'Open the lead detail page', desc: 'Navigate to the lead you want to convert.' },
          { title: 'Click "Convert"', desc: 'The Convert button appears in the header actions.' },
          {
            title: 'Review the Contact',
            desc: 'Lead data is auto-mapped to Contact fields. Review and adjust as needed.',
          },
          {
            title: 'Create or select an Account',
            desc: 'Create a new Account or link to an existing one.',
          },
          {
            title: 'Optionally create a Deal',
            desc: 'Toggle on Deal creation and set the amount, stage, and close date.',
          },
          {
            title: 'Confirm conversion',
            desc: 'Click "Convert" to create all records and link them together.',
          },
        ]}
      />

      <SubHeading>Conversion Settings</SubHeading>
      <P>
        Admins can configure lead conversion mapping in{' '}
        <strong>Settings → Lead Conversion Settings</strong>:
      </P>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Field Mapping:</strong> Define how lead fields map to Contact, Account, and Deal
          fields
        </li>
        <li>
          <strong>Required fields:</strong> Set which fields must be filled before conversion
        </li>
        <li>
          <strong>Post-conversion actions:</strong> Configure what happens to the original lead
          record
        </li>
      </ul>

      <Callout type="info">
        After conversion, the original lead is marked as "Converted" and links to the new Contact,
        Account, and Deal records.
      </Callout>
    </div>
  );
}

function ContactsAccountsSection() {
  return (
    <div>
      <Heading>Contacts & Accounts</Heading>
      <P>
        Contacts represent individual people you do business with. Accounts represent organizations
        or companies. Together, they form the foundation of your customer database.
      </P>

      <SubHeading>Contacts</SubHeading>
      <P>
        Contacts are linked to Accounts and can be associated with multiple Deals. The contact
        detail page shows all related records and a complete interaction history.
      </P>

      <ScreenshotPlaceholder
        title="Contact Detail Page"
        description="Contact detail showing personal info, linked Account, related Deals list, email history, and activity timeline"
        screenshot="contacts-accounts"
      />

      <SubHeading>Accounts</SubHeading>
      <P>
        Accounts aggregate all contacts and deals for a single organization. The account detail page
        provides a 360-degree view of your relationship with that company.
      </P>

      <ScreenshotPlaceholder
        title="Account Detail Page"
        description="Account detail showing company info, all linked Contacts in a grid, Deals pipeline summary, total revenue, and interaction timeline"
        screenshot="contacts-accounts"
      />

      <SubHeading>Account Hierarchy</SubHeading>
      <P>
        Link parent and child accounts to model corporate hierarchies. A parent account can have
        multiple child accounts, and the hierarchy is visualized in the account detail view.
      </P>
    </div>
  );
}

function DealsPipelineSection() {
  return (
    <div>
      <Heading>Deals & Pipeline</Heading>
      <P>
        Deals track your sales opportunities from qualification to close. The pipeline view gives
        you a visual overview of all deals at each stage.
      </P>

      <ScreenshotPlaceholder
        title="Deals Pipeline"
        description="Kanban view of Deals with columns: Qualification ($50K), Proposal ($120K), Negotiation ($80K), Closed Won ($200K), Closed Lost. Cards show deal name, amount, close date, and owner avatar"
        screenshot="deals-pipeline"
      />

      <SubHeading>Deal Stages</SubHeading>
      <P>Default deal stages (customizable):</P>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 pr-4 font-semibold text-gray-700">Stage</th>
              <th className="text-left py-2 pr-4 font-semibold text-gray-700">Probability</th>
              <th className="text-left py-2 font-semibold text-gray-700">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              ['Qualification', '10%', 'Initial assessment of the opportunity'],
              ['Needs Analysis', '25%', 'Understanding customer requirements'],
              ['Proposal', '50%', 'Formal proposal submitted'],
              ['Negotiation', '75%', 'Terms being negotiated'],
              ['Closed Won', '100%', 'Deal successfully closed'],
              ['Closed Lost', '0%', 'Opportunity lost to competitor or other reason'],
            ].map(([stage, prob, desc]) => (
              <tr key={stage}>
                <td className="py-2 pr-4 font-medium text-gray-900">{stage}</td>
                <td className="py-2 pr-4 text-gray-600">{prob}</td>
                <td className="py-2 text-gray-500">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubHeading>Pipeline Management</SubHeading>
      <P>
        Use the Kanban view for visual pipeline management. Each column shows the total number of
        deals and total value. Drag deals between stages to update their status.
      </P>

      <Callout type="tip">
        <strong>Role Pipeline Config:</strong> Admins can configure which stages and pipeline
        settings are available per role in <strong>Settings → Role Pipeline</strong>.
      </Callout>
    </div>
  );
}

function TagsSection() {
  return (
    <div>
      <Heading>Tags & Categorization</Heading>
      <P>
        Tags provide a flexible way to categorize and organize records across any module. Unlike
        picklist fields, tags are free-form and a record can have multiple tags.
      </P>

      <ScreenshotPlaceholder
        title="Tags on Records"
        description="Record list view with colored tag pills visible on each row. A tag filter panel on the right shows available tags with record counts."
        screenshot="tags"
      />

      <SubHeading>Adding Tags</SubHeading>
      <P>
        Add tags to records from the detail page or in bulk from the list view. Type a tag name to
        add an existing tag or create a new one on the fly.
      </P>

      <SubHeading>Managing Tags</SubHeading>
      <P>
        Admins can manage all tags in <strong>Settings → Tags</strong>:
      </P>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Create tags</strong> with custom colors
        </li>
        <li>
          <strong>Merge tags</strong> to consolidate duplicates
        </li>
        <li>
          <strong>Delete tags</strong> (removes from all records)
        </li>
        <li>
          <strong>View tag counts</strong> to see how many records use each tag
        </li>
      </ul>
    </div>
  );
}

function ImportDataSection() {
  return (
    <div>
      <Heading>Importing Data</Heading>
      <P>
        ERPnBox's import tool lets you bulk-import records from CSV files into any module. The
        import wizard guides you through field mapping and handles duplicates.
      </P>

      <ScreenshotPlaceholder
        title="Import Wizard"
        description="Three-step import wizard: Step 1 - Upload CSV file, Step 2 - Map CSV columns to module fields with auto-matching, Step 3 - Review and confirm with duplicate handling options"
        screenshot="import-data"
      />

      <SubHeading>Import Process</SubHeading>
      <StepList
        steps={[
          {
            title: 'Navigate to the module',
            desc: 'Go to the module where you want to import records.',
          },
          { title: 'Click "Import"', desc: 'Opens the import wizard.' },
          { title: 'Upload your CSV', desc: 'Drag and drop or browse to select your CSV file.' },
          {
            title: 'Map fields',
            desc: 'The wizard auto-maps columns by name. Manually adjust any mismatched fields.',
          },
          {
            title: 'Configure options',
            desc: 'Choose how to handle duplicates (skip, overwrite, or create new).',
          },
          { title: 'Start import', desc: 'Review the summary and click "Import" to begin.' },
        ]}
      />

      <SubHeading>Import History</SubHeading>
      <P>
        View all past imports in <strong>Settings → Import History</strong>. Each import shows the
        total records, successful, failed, and skipped counts with a downloadable error report.
      </P>

      <Callout type="warning">
        <strong>Large imports:</strong> For files with more than 10,000 records, the import runs in
        the background. You'll receive a notification when it completes.
      </Callout>
    </div>
  );
}

function GlobalSearchSection() {
  return (
    <div>
      <Heading>Global Search</Heading>
      <P>
        Search across all modules instantly with the global search bar. Press{' '}
        <KeyboardShortcut keys="Ctrl + K" /> from anywhere to open it.
      </P>

      <ScreenshotPlaceholder
        title="Global Search"
        description="Search overlay showing results grouped by module (2 Leads, 1 Contact, 1 Deal) with matching text highlighted and module icons"
        screenshot="global-search"
      />

      <SubHeading>Search Features</SubHeading>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Cross-module search</strong> &mdash; Results from all modules in one view
        </li>
        <li>
          <strong>Instant results</strong> &mdash; Results appear as you type (min 2 characters)
        </li>
        <li>
          <strong>Module filter</strong> &mdash; Narrow results to a specific module
        </li>
        <li>
          <strong>Text highlighting</strong> &mdash; Matched text is highlighted in results
        </li>
        <li>
          <strong>Recent searches</strong> &mdash; Quick access to your last searches
        </li>
      </ul>
    </div>
  );
}

function FieldHistorySection() {
  return (
    <div>
      <Heading>Field History & Audit Trail</Heading>
      <P>
        Track every change made to important fields with the Field History feature. See who changed
        what, when, and the old vs. new values.
      </P>

      <ScreenshotPlaceholder
        title="Field History"
        description="Field history timeline on a Deal record showing: Stage changed from 'Proposal' to 'Negotiation' by John on Mar 15, Amount changed from $50K to $75K by Sarah on Mar 14"
        screenshot="field-history"
      />

      <SubHeading>Enabling Field History</SubHeading>
      <P>Field history tracking must be enabled per module and per field:</P>
      <StepList
        steps={[
          { title: 'Go to Settings → Field History', desc: 'Select the module you want to track.' },
          {
            title: 'Select fields to track',
            desc: 'Choose up to 20 fields per module for history tracking.',
          },
          {
            title: 'Save configuration',
            desc: 'Changes are tracked from this point forward (not retroactive).',
          },
        ]}
      />
    </div>
  );
}

// ─── Automation Sections ────────────────────────────────────────────────────────

function WorkflowRulesSection() {
  return (
    <div>
      <Heading>Workflow Rules</Heading>
      <P>
        Workflow rules automate actions when records meet specific conditions. They're the backbone
        of automation in ERPnBox &mdash; automatically sending emails, updating fields, creating
        tasks, and calling webhooks.
      </P>

      <ScreenshotPlaceholder
        title="Workflow Rules List"
        description="List of workflow rules showing name, module, trigger type (Create/Edit), status (Active/Inactive), and execution count for each rule"
        screenshot="workflow-rules"
      />

      <SubHeading>How Workflow Rules Work</SubHeading>
      <P>A workflow rule has three parts:</P>
      <div className="space-y-3 my-4">
        {[
          {
            title: 'Trigger',
            desc: 'When the rule fires: on record creation, on edit, on creation or edit, or on a specific field change.',
          },
          {
            title: 'Conditions',
            desc: 'Optional filter criteria. E.g., "Stage equals Qualified" or "Amount greater than $10,000".',
          },
          {
            title: 'Actions',
            desc: 'What happens: field updates, email alerts, task creation, webhook calls, or custom function execution.',
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
          >
            <div className="font-semibold text-gray-900 text-sm min-w-[80px]">{item.title}</div>
            <div className="text-sm text-gray-600">{item.desc}</div>
          </div>
        ))}
      </div>

      <ScreenshotPlaceholder
        title="Workflow Rule Editor"
        description="Rule editor showing trigger selection (On Create/Edit), condition builder with field/operator/value rows, and action configuration panel with Email Alert, Field Update, and Webhook options"
        screenshot="workflow-rules"
      />

      <SubHeading>Creating a Workflow Rule</SubHeading>
      <StepList
        steps={[
          { title: 'Go to Settings → Workflow Rules', desc: 'Click "+ New Rule" to start.' },
          { title: 'Select the module', desc: 'Choose which module this rule applies to.' },
          {
            title: 'Set the trigger',
            desc: 'When should this rule evaluate? On create, edit, or both.',
          },
          {
            title: 'Define conditions (optional)',
            desc: 'Add field-based conditions that must be true for the rule to fire.',
          },
          {
            title: 'Add actions',
            desc: 'Configure one or more actions: field updates, emails, tasks, webhooks, or functions.',
          },
          {
            title: 'Activate the rule',
            desc: 'Toggle the rule to active. It will start evaluating immediately.',
          },
        ]}
      />

      <SubHeading>Action Types</SubHeading>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 pr-4 font-semibold text-gray-700">Action</th>
              <th className="text-left py-2 font-semibold text-gray-700">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              ['Field Update', 'Automatically set a field to a specific value'],
              ['Email Alert', 'Send an email using a template to specified recipients'],
              ['Task Creation', 'Create a follow-up task assigned to a user or role'],
              ['Webhook', 'Send an HTTP POST to an external URL'],
              ['Custom Function', 'Execute a JavaScript function for complex logic'],
            ].map(([action, desc]) => (
              <tr key={action}>
                <td className="py-2 pr-4 font-medium text-gray-900">{action}</td>
                <td className="py-2 text-gray-600">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="tip">
        <strong>Execution Order:</strong> When multiple rules match, they execute in the order shown
        in the rule list. Drag to reorder rules and control execution priority.
      </Callout>
    </div>
  );
}

function BlueprintsSection() {
  return (
    <div>
      <Heading>Blueprints (Process Flows)</Heading>
      <P>
        Blueprints define structured, multi-step processes with mandatory transitions, required
        fields, and approval gates. Think of them as state machines for your records.
      </P>

      <ScreenshotPlaceholder
        title="Blueprint Editor"
        description="Visual blueprint editor showing a flowchart-style process: New → (Qualify) → Qualified → (Send Proposal) → Proposal Sent → (Negotiate) → Won/Lost. Each transition shows required fields and conditions."
        screenshot="blueprints"
      />

      <SubHeading>Blueprint vs. Workflow Rules</SubHeading>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 pr-4 font-semibold text-gray-700">Feature</th>
              <th className="text-left py-2 pr-4 font-semibold text-gray-700">Workflow Rules</th>
              <th className="text-left py-2 font-semibold text-gray-700">Blueprints</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-2 pr-4 text-gray-700">Approach</td>
              <td className="py-2 pr-4 text-gray-600">Reactive (fires when conditions match)</td>
              <td className="py-2 text-gray-600">Prescriptive (enforces a process)</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 text-gray-700">Transitions</td>
              <td className="py-2 pr-4 text-gray-600">Any stage change allowed</td>
              <td className="py-2 text-gray-600">Only defined transitions allowed</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 text-gray-700">Required fields</td>
              <td className="py-2 pr-4 text-gray-600">Global validation only</td>
              <td className="py-2 text-gray-600">Per-transition requirements</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 text-gray-700">Best for</td>
              <td className="py-2 pr-4 text-gray-600">Notifications, auto-updates</td>
              <td className="py-2 text-gray-600">Structured sales processes, approvals</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SubHeading>Creating a Blueprint</SubHeading>
      <StepList
        steps={[
          {
            title: 'Go to Settings → Blueprints',
            desc: 'Click "+ New Blueprint" to open the visual editor.',
          },
          {
            title: 'Select module and field',
            desc: 'Choose the module and the Picklist field (usually Stage) to build the process around.',
          },
          { title: 'Define states', desc: 'Add the states (stages) that records move through.' },
          {
            title: 'Draw transitions',
            desc: 'Connect states with transitions. Each transition defines how a record moves between states.',
          },
          {
            title: 'Configure transition requirements',
            desc: 'For each transition, set required fields, conditions, and who is allowed to perform it.',
          },
          {
            title: 'Activate',
            desc: 'Enable the blueprint. Records in this module will now follow the defined process.',
          },
        ]}
      />
    </div>
  );
}

function CustomFunctionsSection() {
  return (
    <div>
      <Heading>Custom Functions</Heading>
      <P>
        Custom functions let you write JavaScript code that runs server-side when triggered by
        workflows, buttons, API calls, or schedules. They enable complex business logic beyond what
        no-code automation can handle.
      </P>

      <ScreenshotPlaceholder
        title="Function Editor"
        description="Monaco code editor showing a JavaScript function with syntax highlighting, parameters panel on the right, test execution button, and execution log below"
        screenshot="custom-functions"
      />

      <SubHeading>Function Capabilities</SubHeading>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>Read and update records across any module</li>
        <li>Make HTTP requests to external APIs</li>
        <li>Send emails programmatically</li>
        <li>Perform calculations and data transformations</li>
        <li>Log messages for debugging</li>
      </ul>

      <SubHeading>Execution Triggers</SubHeading>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Workflow Action:</strong> Run as part of a workflow rule
        </li>
        <li>
          <strong>Custom Button:</strong> Run when a user clicks a button on a record
        </li>
        <li>
          <strong>API Call:</strong> Invoke via the public API
        </li>
        <li>
          <strong>Schedule:</strong> Run on a cron schedule (hourly, daily, etc.)
        </li>
      </ul>

      <Callout type="warning">
        <strong>Sandboxed execution:</strong> Functions run in an isolated sandbox with a 30-second
        timeout and limited memory. They cannot access the file system or spawn processes.
      </Callout>
    </div>
  );
}

function AssignmentRulesSection() {
  return (
    <div>
      <Heading>Assignment Rules</Heading>
      <P>
        Assignment rules automatically assign new records to users based on criteria you define. Use
        them to distribute leads evenly, route deals to the right team, or assign tasks by
        geography.
      </P>

      <ScreenshotPlaceholder
        title="Assignment Rules"
        description="Assignment rule configuration showing module selection, criteria rows (If Source = Website, assign to Sales Team A), round-robin toggle, and threshold settings"
        screenshot="assignment-rules"
      />

      <SubHeading>Assignment Methods</SubHeading>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Round Robin:</strong> Distributes records evenly among team members in rotation
        </li>
        <li>
          <strong>Criteria-Based:</strong> Assigns to specific users based on field values
        </li>
        <li>
          <strong>Load Balanced:</strong> Assigns to the user with the fewest open records (using
          assignment thresholds)
        </li>
      </ul>

      <SubHeading>Assignment Thresholds</SubHeading>
      <P>
        Set maximum capacity per user in <strong>Settings → Assignment Thresholds</strong>. When a
        user reaches their threshold, new records are routed to the next available person.
      </P>
    </div>
  );
}

function ApprovalProcessesSection() {
  return (
    <div>
      <Heading>Approval Processes</Heading>
      <P>
        Approval processes add human oversight to critical operations. When a record meets certain
        criteria, it's submitted for approval before it can proceed.
      </P>

      <ScreenshotPlaceholder
        title="Approval Process"
        description="Approval process configuration showing: Entry criteria (Deal Amount > $100K), approval steps (Step 1: Manager approval, Step 2: VP approval), and actions on approval/rejection"
        screenshot="approval-processes"
      />

      <SubHeading>How Approvals Work</SubHeading>
      <StepList
        steps={[
          {
            title: 'Record meets entry criteria',
            desc: 'The record is automatically submitted for approval when conditions are met.',
          },
          {
            title: 'Approver is notified',
            desc: 'The designated approver receives an email and in-app notification.',
          },
          {
            title: 'Review and decide',
            desc: 'The approver can approve, reject, or delegate to another user.',
          },
          {
            title: 'Actions execute',
            desc: 'On approval: field updates, emails, etc. On rejection: different set of actions.',
          },
        ]}
      />
    </div>
  );
}

function EscalationRulesSection() {
  return (
    <div>
      <Heading>Escalation Rules</Heading>
      <P>
        Escalation rules automatically notify managers or reassign records when they've been idle
        for too long. They ensure nothing falls through the cracks.
      </P>

      <SubHeading>Configuring Escalations</SubHeading>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Timer field:</strong> Which date/time field to monitor (e.g., Created Date, Last
          Activity)
        </li>
        <li>
          <strong>Threshold:</strong> How long before escalation (e.g., 24 hours, 3 days)
        </li>
        <li>
          <strong>Actions:</strong> Email notification, record reassignment, or field update
        </li>
        <li>
          <strong>Repeat:</strong> Optionally re-escalate if still idle after additional time
        </li>
      </ul>
    </div>
  );
}

function ScoringRulesSection() {
  return (
    <div>
      <Heading>Scoring Rules</Heading>
      <P>
        Lead and deal scoring helps your team prioritize records based on data-driven criteria.
        Define scoring rules to automatically calculate a score for each record.
      </P>

      <ScreenshotPlaceholder
        title="Scoring Rules"
        description="Scoring rule configuration showing criteria table: Industry = Technology (+20), Revenue > $1M (+15), Source = Referral (+10), No Email (-10). Total score preview on the right."
        screenshot="scoring-rules"
      />

      <SubHeading>Score Criteria</SubHeading>
      <P>
        Add positive or negative score values based on field conditions. The total score is
        displayed on the record and can be used for filtering, sorting, and assignment.
      </P>
    </div>
  );
}

function ScheduledActionsSection() {
  return (
    <div>
      <Heading>Scheduled Actions</Heading>
      <P>
        Scheduled actions execute at specific times relative to a record's field value. For example,
        send a follow-up email 3 days after a meeting or escalate a deal 7 days before its close
        date.
      </P>

      <SubHeading>Use Cases</SubHeading>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>Send a reminder email 1 day before a task due date</li>
        <li>Update a field 30 days after record creation</li>
        <li>Trigger a webhook 7 days before a deal close date</li>
        <li>Create a follow-up task after an email is sent</li>
      </ul>
    </div>
  );
}

function ValidationRulesSection() {
  return (
    <div>
      <Heading>Validation Rules</Heading>
      <P>
        Validation rules enforce data quality by preventing records from being saved when conditions
        aren't met. They run on both create and update operations.
      </P>

      <SubHeading>Examples</SubHeading>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>"Close Date must be in the future when Stage is not Closed Won or Closed Lost"</li>
        <li>"Discount cannot exceed 30% without manager approval"</li>
        <li>"Phone or Email must be provided (at least one)"</li>
      </ul>
    </div>
  );
}

// ─── Analytics Sections ─────────────────────────────────────────────────────────

function AnalyticsEngineSection() {
  return (
    <div>
      <Heading>Analytics Engine</Heading>
      <P>
        ERPnBox's analytics engine lets you build custom charts and aggregate queries across any
        module. Create bar charts, pie charts, line graphs, and more &mdash; all from your live
        data.
      </P>

      <ScreenshotPlaceholder
        title="Analytics Builder"
        description="Analytics builder interface with module selector, metric type (Count/Sum/Avg), field selector, group-by options, and a live chart preview showing a bar chart of Deals by Stage"
        screenshot="analytics-engine"
      />

      <SubHeading>Chart Types</SubHeading>
      <div className="grid grid-cols-2 gap-3 my-4">
        {[
          { type: 'Bar Chart', desc: 'Compare values across categories' },
          { type: 'Line Chart', desc: 'Show trends over time' },
          { type: 'Pie Chart', desc: 'Show proportions of a whole' },
          { type: 'Donut Chart', desc: 'Like pie, with a center metric' },
          { type: 'Funnel', desc: 'Visualize conversion stages' },
          { type: 'Table', desc: 'Tabular data with totals' },
        ].map((c) => (
          <div key={c.type} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <p className="text-sm font-medium text-gray-900">{c.type}</p>
            <p className="text-xs text-gray-500 mt-0.5">{c.desc}</p>
          </div>
        ))}
      </div>

      <SubHeading>Aggregate Functions</SubHeading>
      <ul className="list-disc list-inside space-y-1 text-gray-600 mb-4">
        <li>
          <strong>Count</strong> &mdash; Number of records matching criteria
        </li>
        <li>
          <strong>Sum</strong> &mdash; Total of a numeric field
        </li>
        <li>
          <strong>Average</strong> &mdash; Mean value of a numeric field
        </li>
        <li>
          <strong>Min / Max</strong> &mdash; Lowest or highest value
        </li>
      </ul>
    </div>
  );
}

function KpiDashboardSection() {
  return (
    <div>
      <Heading>KPI Dashboard</Heading>
      <P>
        The KPI Dashboard displays real-time key performance indicators for individuals, teams, or
        the entire organization. Track targets, measure progress, and motivate your team.
      </P>

      <ScreenshotPlaceholder
        title="KPI Dashboard"
        description="KPI dashboard showing cards with target vs actual metrics: Revenue Target (85% of $500K), Deals Closed (12/15), Calls Made (45/50). Progress bars and trend arrows for each KPI."
        screenshot="kpi-dashboard"
      />

      <SubHeading>Creating KPIs</SubHeading>
      <StepList
        steps={[
          {
            title: 'Go to Settings → KPI Manager',
            desc: 'Click "+ New KPI" to create a new performance indicator.',
          },
          {
            title: 'Define the metric',
            desc: 'Choose module, aggregate function, and optional filters.',
          },
          {
            title: 'Set targets',
            desc: 'Define target values for daily, weekly, monthly, or quarterly periods.',
          },
          {
            title: 'Assign to users/roles',
            desc: 'Assign KPIs to specific users, roles, or teams.',
          },
          {
            title: 'Enable on dashboard',
            desc: 'Toggle dashboard visibility to show the KPI on the main dashboard.',
          },
        ]}
      />
    </div>
  );
}

function SavedReportsSection() {
  return (
    <div>
      <Heading>Saved Reports</Heading>
      <P>
        Save your analytics configurations as reports for easy access. Organize reports into folders
        and schedule them for automatic email delivery.
      </P>

      <ScreenshotPlaceholder
        title="Reports Page"
        description="Reports page showing folder tree on the left (My Reports, Sales Reports, Management), report cards in the center with chart previews, and a scheduled reports indicator"
        screenshot="saved-reports"
      />

      <SubHeading>Report Folders</SubHeading>
      <P>
        Organize reports into folders for easy navigation. Create folders for different teams,
        departments, or report types.
      </P>

      <SubHeading>Scheduled Reports</SubHeading>
      <P>
        Configure reports to be emailed automatically on a schedule (daily, weekly, or monthly) to
        specified recipients.
      </P>
    </div>
  );
}

function DashboardCardsSection() {
  return (
    <div>
      <Heading>Dashboard Cards</Heading>
      <P>
        Dashboard cards are configurable widgets that display on the main dashboard. Admins can
        create cards showing metrics, charts, lists, or custom content.
      </P>

      <SubHeading>Card Types</SubHeading>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Metric Card:</strong> Single number with optional trend indicator
        </li>
        <li>
          <strong>Chart Card:</strong> Embedded analytics chart
        </li>
        <li>
          <strong>List Card:</strong> Top N records sorted by a field
        </li>
        <li>
          <strong>Activity Card:</strong> Recent activity feed
        </li>
      </ul>
    </div>
  );
}

// ─── Email Sections ─────────────────────────────────────────────────────────────

function EmailAccountsSection() {
  return (
    <div>
      <Heading>Email Account Setup</Heading>
      <P>
        Connect your email accounts to ERPnBox to send and receive emails directly within the
        platform. ERPnBox supports any IMAP/SMTP email provider.
      </P>

      <ScreenshotPlaceholder
        title="Email Account Setup"
        description="Email account setup form with fields for IMAP server, port, username, SMTP server, port, encryption type. Test connection button and connected status indicator."
        screenshot="email-accounts"
      />

      <SubHeading>Connecting an Email Account</SubHeading>
      <StepList
        steps={[
          { title: 'Go to Email → Account Setup', desc: 'Click "Add Email Account" to start.' },
          {
            title: 'Enter IMAP settings',
            desc: 'Server hostname, port (993 for SSL), username, and password.',
          },
          {
            title: 'Enter SMTP settings',
            desc: 'Server hostname, port (587 for TLS), authentication credentials.',
          },
          {
            title: 'Test connection',
            desc: 'Click "Test" to verify both IMAP and SMTP connections.',
          },
          {
            title: 'Start sync',
            desc: 'Once connected, ERPnBox begins syncing your recent emails.',
          },
        ]}
      />

      <SubHeading>Supported Providers</SubHeading>
      <P>
        Works with any standard IMAP/SMTP provider: Gmail, Outlook/Office 365, Yahoo, Zoho Mail,
        custom mail servers, and more.
      </P>

      <Callout type="info">
        <strong>Gmail users:</strong> You'll need to enable "Less secure app access" or use an App
        Password if 2FA is enabled.
      </Callout>
    </div>
  );
}

function EmailComposeSection() {
  return (
    <div>
      <Heading>Compose & Send</Heading>
      <P>
        Send emails directly from ERPnBox with a rich text editor. Emails are linked to CRM records
        and appear in the activity timeline.
      </P>

      <ScreenshotPlaceholder
        title="Email Compose"
        description="Email compose modal with To/CC/BCC fields, subject line, rich text editor with formatting toolbar, template selector dropdown, and CRM record link indicator"
        screenshot="email-compose"
      />

      <SubHeading>Composing an Email</SubHeading>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Rich text editor:</strong> Bold, italic, lists, links, and more
        </li>
        <li>
          <strong>Templates:</strong> Insert pre-built email templates with merge fields
        </li>
        <li>
          <strong>Attachments:</strong> Attach files from your computer
        </li>
        <li>
          <strong>CC/BCC:</strong> Add additional recipients
        </li>
        <li>
          <strong>CRM linking:</strong> Emails are automatically linked to the associated record
        </li>
      </ul>
    </div>
  );
}

function EmailCrmLinkSection() {
  return (
    <div>
      <Heading>CRM Record Linking</Heading>
      <P>
        ERPnBox automatically links emails to CRM records by matching email addresses. You can also
        manually link emails to specific records.
      </P>

      <ScreenshotPlaceholder
        title="CRM Link Sidebar"
        description="Email view with a CRM sidebar on the right showing the linked Contact record, related Deals, and recent activities for that contact"
        screenshot="email-crm-link"
      />

      <SubHeading>Automatic Linking</SubHeading>
      <P>
        When you receive or send an email, ERPnBox scans the email addresses against your Contacts
        and Leads. If a match is found, the email is automatically linked to that record.
      </P>

      <SubHeading>Manual Linking</SubHeading>
      <P>
        For emails that aren't automatically linked, click the "Link to CRM" button to search and
        select a record to link the email to.
      </P>
    </div>
  );
}

function EmailTemplatesSection() {
  return (
    <div>
      <Heading>Email Templates</Heading>
      <P>
        Create reusable email templates with merge fields that automatically populate with record
        data. Use them in manual emails, workflow rules, and approval processes.
      </P>

      <ScreenshotPlaceholder
        title="Email Template Editor"
        description="Template editor with drag-and-drop blocks, merge field inserter (${'${'}firstName}, ${'${'}dealAmount}), preview panel, and HTML source toggle"
        screenshot="email-templates"
      />

      <SubHeading>Merge Fields</SubHeading>
      <P>
        Insert dynamic content using merge fields like{' '}
        <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">{'${firstName}'}</code>,{' '}
        <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">{'${company}'}</code>, and{' '}
        <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">{'${dealAmount}'}</code>. These
        are replaced with actual record values when the email is sent.
      </P>
    </div>
  );
}

// ─── Administration Sections ────────────────────────────────────────────────────

function UsersManagementSection() {
  return (
    <div>
      <Heading>User Management</Heading>
      <P>
        Manage who has access to your ERPnBox workspace. Create users, assign roles, and control
        access levels.
      </P>

      <ScreenshotPlaceholder
        title="User Management"
        description="Users list page showing name, email, role badge, profile, last login date, and status (Active/Inactive) for each user. 'Invite User' button in the top right."
        screenshot="users-management"
      />

      <SubHeading>Inviting Users</SubHeading>
      <StepList
        steps={[
          { title: 'Go to Settings → Users', desc: 'Click "Invite User" button.' },
          { title: 'Enter user details', desc: 'Name, email, role, and profile assignment.' },
          {
            title: 'Send invitation',
            desc: 'The user receives an email with a link to set their password.',
          },
          {
            title: 'User activates account',
            desc: 'Once they set their password, they can log in.',
          },
        ]}
      />

      <SubHeading>User Statuses</SubHeading>
      <ul className="list-disc list-inside space-y-1 text-gray-600 mb-4">
        <li>
          <strong>Active:</strong> Can log in and access the system
        </li>
        <li>
          <strong>Inactive:</strong> Cannot log in. Records are preserved.
        </li>
        <li>
          <strong>Pending:</strong> Invitation sent, not yet activated
        </li>
      </ul>
    </div>
  );
}

function RolesHierarchySection() {
  return (
    <div>
      <Heading>Roles & Hierarchy</Heading>
      <P>
        Roles define the organizational hierarchy and determine data visibility. Users higher in the
        hierarchy can see records owned by users below them.
      </P>

      <ScreenshotPlaceholder
        title="Role Hierarchy"
        description="Visual tree diagram of role hierarchy: CEO at top, then VP Sales and VP Marketing, then Sales Manager and Marketing Manager, then Sales Rep and Marketing Specialist at the bottom"
        screenshot="roles-hierarchy"
      />

      <SubHeading>Role Hierarchy</SubHeading>
      <P>The role hierarchy controls data access through inheritance:</P>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>Users can see their own records plus records owned by users in subordinate roles</li>
        <li>Managers automatically see their team's data without additional sharing rules</li>
        <li>The hierarchy is separate from job titles &mdash; it's purely about data access</li>
      </ul>

      <SubHeading>Default Roles</SubHeading>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 pr-4 font-semibold text-gray-700">Role</th>
              <th className="text-left py-2 font-semibold text-gray-700">Access Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-2 pr-4 font-medium text-gray-900">Super Admin</td>
              <td className="py-2 text-gray-600">
                Full access to everything including settings and user management
              </td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium text-gray-900">Admin</td>
              <td className="py-2 text-gray-600">Full access to all records and most settings</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium text-gray-900">Manager</td>
              <td className="py-2 text-gray-600">
                Access to own + subordinate records, limited settings
              </td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium text-gray-900">Sales Rep</td>
              <td className="py-2 text-gray-600">
                Access to own records only (unless sharing rules grant more)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProfilesPermissionsSection() {
  return (
    <div>
      <Heading>Profiles & Permissions</Heading>
      <P>
        Profiles define what users <em>can do</em> in each module &mdash; create, view, edit, or
        delete records. They work alongside roles (which control <em>what data</em> users see).
      </P>

      <ScreenshotPlaceholder
        title="Profile Editor"
        description="Profile permissions grid showing modules as rows (Leads, Contacts, Deals, Tasks) and permissions as columns (View, Create, Edit, Delete) with toggle switches"
        screenshot="profiles-permissions"
      />

      <SubHeading>Module-Level Permissions</SubHeading>
      <P>For each module, a profile grants or denies:</P>
      <ul className="list-disc list-inside space-y-1 text-gray-600 mb-4">
        <li>
          <strong>View:</strong> See records in the list and detail views
        </li>
        <li>
          <strong>Create:</strong> Create new records
        </li>
        <li>
          <strong>Edit:</strong> Modify existing records
        </li>
        <li>
          <strong>Delete:</strong> Remove records
        </li>
      </ul>

      <SubHeading>Field-Level Permissions</SubHeading>
      <P>
        Profiles can also control visibility and editability of individual fields within each
        module. For example, you can hide the "Revenue" field from Sales Reps while keeping it
        visible for Managers.
      </P>
    </div>
  );
}

function SharingRulesSection() {
  return (
    <div>
      <Heading>Sharing Rules</Heading>
      <P>
        Sharing rules extend data access beyond the role hierarchy. They let you grant additional
        visibility to specific users, roles, or teams without changing the hierarchy.
      </P>

      <SubHeading>Types of Sharing Rules</SubHeading>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Owner-Based:</strong> Share records owned by users in one role with users in
          another role
        </li>
        <li>
          <strong>Criteria-Based:</strong> Share records matching specific field conditions with
          designated users/roles
        </li>
      </ul>

      <SubHeading>Access Levels</SubHeading>
      <ul className="list-disc list-inside space-y-1 text-gray-600 mb-4">
        <li>
          <strong>Read Only:</strong> Can view but not edit shared records
        </li>
        <li>
          <strong>Read/Write:</strong> Can view and edit shared records
        </li>
      </ul>
    </div>
  );
}

function TeamsSection() {
  return (
    <div>
      <Heading>Teams</Heading>
      <P>
        Teams are cross-functional groups of users who collaborate on shared records. Unlike roles
        (which are hierarchical), teams are flat and flexible.
      </P>

      <SubHeading>Team Features</SubHeading>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>Create teams for projects, regions, or functional groups</li>
        <li>Share records with entire teams</li>
        <li>Use teams in assignment rules and sharing rules</li>
        <li>Track team KPIs on the dashboard</li>
      </ul>
    </div>
  );
}

function OrgSettingsSection() {
  return (
    <div>
      <Heading>Organization Settings</Heading>
      <P>
        Configure your workspace's global settings including company information, locale, currency,
        and branding.
      </P>

      <ScreenshotPlaceholder
        title="Company Settings"
        description="Organization settings page with tabs: General (name, logo, address), Locale (timezone, date format, currency), Email (SMTP config), and Branding (colors, logo)"
        screenshot="org-settings"
      />

      <SubHeading>Settings Categories</SubHeading>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Company Info:</strong> Name, address, phone, website, industry
        </li>
        <li>
          <strong>Locale:</strong> Timezone, date format, number format, language
        </li>
        <li>
          <strong>Currency:</strong> Default currency and exchange rates
        </li>
        <li>
          <strong>Fiscal Year:</strong> Start month for fiscal year calculations
        </li>
        <li>
          <strong>Branding:</strong> Logo upload and primary colors
        </li>
      </ul>
    </div>
  );
}

function ModuleDesignerSection() {
  return (
    <div>
      <Heading>Module Designer</Heading>
      <P>
        The Module Designer is a visual tool for creating and editing modules. Add fields, configure
        layouts, and set up relationships &mdash; all without writing code.
      </P>

      <ScreenshotPlaceholder
        title="Module Designer"
        description="Visual module designer with a field palette (Text, Number, Date, Lookup, etc.) on the left, a drag-and-drop layout canvas in the center with sections and fields, and a properties panel on the right"
        screenshot="module-designer"
      />

      <SubHeading>Designer Features</SubHeading>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Field Palette:</strong> Drag field types from the palette onto the layout
        </li>
        <li>
          <strong>Sections:</strong> Organize fields into collapsible sections
        </li>
        <li>
          <strong>Properties Panel:</strong> Configure each field's label, API name, default value,
          validation, and more
        </li>
        <li>
          <strong>Layout Preview:</strong> See how the form will look to users in real-time
        </li>
        <li>
          <strong>Relationship Builder:</strong> Create Lookup fields that link to other modules
        </li>
      </ul>
    </div>
  );
}

function GlobalPicklistsSection() {
  return (
    <div>
      <Heading>Global Picklists</Heading>
      <P>
        Global Picklists are shared dropdown value sets that can be reused across multiple modules
        and fields. Define once, use everywhere.
      </P>

      <SubHeading>Benefits</SubHeading>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>Single source of truth for shared values (e.g., Industry, Country, Priority)</li>
        <li>Update in one place, reflects everywhere</li>
        <li>Consistent data across modules</li>
      </ul>
    </div>
  );
}

function RecordLockingSection() {
  return (
    <div>
      <Heading>Record Locking</Heading>
      <P>
        Record locking prevents changes to records that should no longer be editable. Use
        criteria-based rules to automatically lock records (e.g., after approval or deal closure).
      </P>

      <SubHeading>Locking Methods</SubHeading>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Manual Lock:</strong> Users with permission can lock/unlock individual records
        </li>
        <li>
          <strong>Criteria-Based Auto-Lock:</strong> Records matching conditions are automatically
          locked (e.g., Stage = "Closed Won")
        </li>
        <li>
          <strong>Role-Based Exceptions:</strong> Certain roles can still edit locked records
        </li>
      </ul>
    </div>
  );
}

function DocumentTemplatesSection() {
  return (
    <div>
      <Heading>Document Templates</Heading>
      <P>
        Create document templates with merge fields for generating PDFs (quotes, invoices,
        contracts) directly from record data.
      </P>

      <ScreenshotPlaceholder
        title="Document Template Editor"
        description="Template editor with WYSIWYG editor, merge field inserter, page layout controls, and PDF preview panel"
        screenshot="document-templates"
      />

      <SubHeading>Template Features</SubHeading>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>Rich text editing with formatting options</li>
        <li>Dynamic merge fields from any module</li>
        <li>Table support for line items</li>
        <li>PDF generation with print-ready layout</li>
        <li>Module-specific templates (different templates per module)</li>
      </ul>
    </div>
  );
}

function AuditLogSection() {
  return (
    <div>
      <Heading>Audit Log</Heading>
      <P>
        The audit log records every significant action in your workspace &mdash; who did what, when,
        and on which record. Essential for compliance and troubleshooting.
      </P>

      <ScreenshotPlaceholder
        title="Audit Log"
        description="Audit log table with columns: Timestamp, User, Action (Created/Updated/Deleted), Module, Record Name, and IP Address. Filter controls at the top."
        screenshot="audit-log"
      />

      <SubHeading>Logged Events</SubHeading>
      <ul className="list-disc list-inside space-y-1 text-gray-600 mb-4">
        <li>Record creation, updates, and deletions</li>
        <li>User login and logout</li>
        <li>Settings changes</li>
        <li>Role and permission modifications</li>
        <li>Import and export operations</li>
      </ul>
    </div>
  );
}

function LoginHistorySection() {
  return (
    <div>
      <Heading>Login History</Heading>
      <P>
        Monitor all login activity across your organization. See who logged in, when, from what IP
        address, and whether the attempt succeeded or failed.
      </P>

      <SubHeading>Security Monitoring</SubHeading>
      <P>
        Use login history to detect suspicious activity such as failed login attempts, logins from
        unusual locations, or access outside business hours.
      </P>
    </div>
  );
}

// ─── HRMS Sections ──────────────────────────────────────────────────────────────

function AttendanceSection() {
  return (
    <div>
      <Heading>Attendance Management</Heading>
      <P>
        Track employee attendance with check-in/out, break logging, geofencing, and comprehensive
        attendance policies.
      </P>

      <ScreenshotPlaceholder
        title="Attendance Dashboard"
        description="Attendance overview showing today's status grid (Present/Absent/Late), check-in/out times, break duration, and monthly attendance calendar view"
        screenshot="attendance"
      />

      <SubHeading>Attendance Features</SubHeading>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Check-in/Check-out:</strong> Record arrival and departure times
        </li>
        <li>
          <strong>Break Logging:</strong> Track break types and durations
        </li>
        <li>
          <strong>Geofencing:</strong> Verify check-ins happen within designated locations
        </li>
        <li>
          <strong>Attendance Policies:</strong> Define rules for late arrivals, early departures,
          overtime
        </li>
        <li>
          <strong>Regularization:</strong> Allow employees to request corrections for missed punches
        </li>
        <li>
          <strong>On-Duty Requests:</strong> Log time spent on official duties outside the office
        </li>
        <li>
          <strong>Hourly Permissions:</strong> Request short-duration leaves within the workday
        </li>
      </ul>

      <SubHeading>Attendance Policies</SubHeading>
      <P>
        Configure attendance policies with penalty rules in <strong>Settings → Attendance</strong>.
        Policies define grace periods, late thresholds, overtime rules, and penalty calculations.
      </P>
    </div>
  );
}

function ShiftsSection() {
  return (
    <div>
      <Heading>Shift Management</Heading>
      <P>
        Define work shifts, create shift patterns, and assign employees to shifts. Supports rotating
        schedules, split shifts, and overtime tracking.
      </P>

      <ScreenshotPlaceholder
        title="Shift Calendar"
        description="Weekly shift calendar showing employees as rows and days as columns. Color-coded shift blocks (Morning=blue, Evening=orange, Night=purple) with drag-to-assign interaction."
        screenshot="shifts"
      />

      <SubHeading>Shift Features</SubHeading>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Shift Definitions:</strong> Name, start/end time, break durations, grace periods
        </li>
        <li>
          <strong>Shift Patterns:</strong> Rotating schedules (e.g., 5 days on, 2 off)
        </li>
        <li>
          <strong>Employee Assignment:</strong> Assign shifts to individuals or groups
        </li>
        <li>
          <strong>Calendar View:</strong> Visual shift schedule with drag-and-drop
        </li>
      </ul>
    </div>
  );
}

function LeaveManagementSection() {
  return (
    <div>
      <Heading>Leave Management</Heading>
      <P>
        Manage all types of employee leave &mdash; annual, sick, personal, compensatory, and more.
        Define policies, track balances, and process requests.
      </P>

      <ScreenshotPlaceholder
        title="Leave Management"
        description="Leave management page showing leave balance summary cards (Annual: 12/20, Sick: 3/10), pending requests list, and a team calendar view showing who's off when"
        screenshot="leave-management"
      />

      <SubHeading>Leave Types & Policies</SubHeading>
      <P>
        Configure leave types and policies in <strong>Settings → Leave Policy</strong>:
      </P>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Leave Types:</strong> Annual, Sick, Personal, Maternity, Compensatory Off
        </li>
        <li>
          <strong>Accrual Rules:</strong> How leave is earned (monthly, quarterly, annually)
        </li>
        <li>
          <strong>Carry Forward:</strong> Rules for unused leave rollover
        </li>
        <li>
          <strong>Approval Workflow:</strong> Who approves leave requests
        </li>
      </ul>

      <SubHeading>Employee Leave Flow</SubHeading>
      <StepList
        steps={[
          {
            title: 'Employee submits request',
            desc: 'Select leave type, dates, and provide a reason.',
          },
          {
            title: 'Manager receives notification',
            desc: 'Email and in-app notification for approval.',
          },
          { title: 'Manager approves/rejects', desc: 'With optional comments.' },
          { title: 'Balance updated', desc: 'Approved leave is deducted from the balance.' },
        ]}
      />
    </div>
  );
}

function PayrollSection() {
  return (
    <div>
      <Heading>Payroll</Heading>
      <P>
        Process payroll with salary components, tax calculations, bonus/misconduct tracking, loans,
        and automated pay runs.
      </P>

      <ScreenshotPlaceholder
        title="Payroll Dashboard"
        description="Payroll settings page with tabs: Salary Components, Tax Regulations, Pay Runs. Shows a pay run summary with total gross, deductions, net pay, and per-employee breakdown"
        screenshot="payroll"
      />

      <SubHeading>Payroll Features</SubHeading>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Salary Components:</strong> Define earnings (Basic, HRA, Allowances) and
          deductions (Tax, Insurance, Loans)
        </li>
        <li>
          <strong>Compensation Templates:</strong> Reusable salary structures for roles/grades
        </li>
        <li>
          <strong>Tax Regulations:</strong> Configure tax brackets and rules
        </li>
        <li>
          <strong>Bonus & Misconduct:</strong> Track bonuses and disciplinary deductions
        </li>
        <li>
          <strong>Loans:</strong> Manage employee loans with EMI tracking and payroll deduction
        </li>
        <li>
          <strong>Pay Runs:</strong> Process monthly payroll for all or selected employees
        </li>
        <li>
          <strong>Pay Slips:</strong> Auto-generated, downloadable pay slips
        </li>
        <li>
          <strong>Salary Revisions:</strong> Track salary changes with effective dates
        </li>
      </ul>

      <SubHeading>Processing a Pay Run</SubHeading>
      <StepList
        steps={[
          { title: 'Select pay period', desc: 'Choose the month/period for the pay run.' },
          {
            title: 'Review calculations',
            desc: 'System auto-calculates gross, deductions, and net pay per employee.',
          },
          { title: 'Apply adjustments', desc: 'Add one-time bonuses, deductions, or corrections.' },
          { title: 'Approve and finalize', desc: 'Lock the pay run and generate pay slips.' },
        ]}
      />
    </div>
  );
}

function DepartmentsSection() {
  return (
    <div>
      <Heading>Departments</Heading>
      <P>
        Organize your company into departments with a hierarchical structure. Departments can be
        used for reporting, permissions, and payroll grouping.
      </P>

      <SubHeading>Department Hierarchy</SubHeading>
      <P>
        Departments support parent-child relationships, allowing you to build a tree structure that
        mirrors your organizational chart. Navigate the tree view in{' '}
        <strong>Settings → Departments</strong>.
      </P>
    </div>
  );
}

function LocationsSection() {
  return (
    <div>
      <Heading>Locations</Heading>
      <P>
        Define company locations (offices, branches, sites) with address details and geofence
        coordinates. Locations are used for attendance geofencing, shift assignment, and reporting.
      </P>

      <SubHeading>Location Features</SubHeading>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Hierarchy:</strong> Organize locations in a tree (Country → City → Office)
        </li>
        <li>
          <strong>Geofencing:</strong> Set GPS coordinates and radius for attendance verification
        </li>
        <li>
          <strong>Assignment:</strong> Link employees to their primary location
        </li>
      </ul>
    </div>
  );
}

// ─── Integrations Sections ──────────────────────────────────────────────────────

function ApiKeysSection() {
  return (
    <div>
      <Heading>API Keys</Heading>
      <P>
        API keys allow external applications to access your ERPnBox data programmatically. Create
        keys with specific scopes to control what each integration can do.
      </P>

      <ScreenshotPlaceholder
        title="API Key Manager"
        description="API Keys page showing active keys with name, scopes, created date, last used date, expiration, and usage count. 'Create API Key' button and revoke actions."
        screenshot="api-keys"
      />

      <SubHeading>Creating an API Key</SubHeading>
      <StepList
        steps={[
          { title: 'Go to Settings → API Keys', desc: 'Click "Create API Key".' },
          {
            title: 'Name your key',
            desc: 'Give it a descriptive name (e.g., "Website Contact Form").',
          },
          { title: 'Select scopes', desc: 'Choose which operations this key can perform.' },
          { title: 'Set expiration (optional)', desc: 'Keys can be set to expire after a period.' },
          { title: 'Copy the key', desc: 'The key is shown only once. Store it securely.' },
        ]}
      />

      <Callout type="warning">
        <strong>Security:</strong> API keys are shown only once at creation. Store them in
        environment variables, never in source code. Rotate keys regularly.
      </Callout>

      <P>
        For full API documentation, visit the{' '}
        <a href="/developers" className="text-brand-600 hover:underline font-medium">
          Developer Portal
        </a>
        .
      </P>
    </div>
  );
}

function WebhooksGuideSection() {
  return (
    <div>
      <Heading>Webhooks</Heading>
      <P>
        Webhooks send real-time HTTP POST notifications to your server when events happen in
        ERPnBox. Use them to sync data, trigger external workflows, or build integrations.
      </P>

      <ScreenshotPlaceholder
        title="Webhook Configuration"
        description="Webhook setup form showing URL field, event checkboxes (record.created, record.updated, record.deleted), module filter, field filters, and a secret key for signature verification"
        screenshot="webhooks-guide"
      />

      <SubHeading>Supported Events</SubHeading>
      <ul className="list-disc list-inside space-y-1 text-gray-600 mb-4">
        <li>
          <strong>record.created</strong> &mdash; When a new record is created in any module
        </li>
        <li>
          <strong>record.updated</strong> &mdash; When a record's data changes
        </li>
        <li>
          <strong>record.deleted</strong> &mdash; When a record is deleted
        </li>
      </ul>

      <SubHeading>Delivery & Retry</SubHeading>
      <P>
        ERPnBox expects a 2xx response within 10 seconds. Failed deliveries are retried with
        exponential backoff (10s, 60s, 5min). View delivery logs in the webhook detail page.
      </P>

      <P>
        For detailed webhook documentation, visit the{' '}
        <a href="/developers" className="text-brand-600 hover:underline font-medium">
          Developer Portal → Webhooks
        </a>
        .
      </P>
    </div>
  );
}

function SocialSyncSection() {
  return (
    <div>
      <Heading>Social Media Sync</Heading>
      <P>
        Connect your Facebook and Instagram business accounts to capture leads, manage
        conversations, and sync social interactions with your CRM.
      </P>

      <ScreenshotPlaceholder
        title="Social Sync Dashboard"
        description="Social sync dashboard showing connected Facebook page, recent messages/comments, lead forms synced, and engagement metrics"
        screenshot="social-sync"
      />

      <SubHeading>Capabilities</SubHeading>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
        <li>
          <strong>Lead Form Sync:</strong> Facebook Lead Ads automatically create leads in ERPnBox
        </li>
        <li>
          <strong>Message Inbox:</strong> Reply to Facebook/Instagram messages from within ERPnBox
        </li>
        <li>
          <strong>Comment Tracking:</strong> Monitor and respond to comments on your posts
        </li>
        <li>
          <strong>Activity Linking:</strong> Social interactions appear in the CRM record timeline
        </li>
      </ul>
    </div>
  );
}

function AppMarketplaceSection() {
  return (
    <div>
      <Heading>App Marketplace</Heading>
      <P>
        Extend ERPnBox with pre-built apps from the marketplace. Install apps to add new
        functionality, integrations, and modules to your workspace.
      </P>

      <ScreenshotPlaceholder
        title="App Marketplace"
        description="App marketplace grid showing available apps with icons, descriptions, install buttons, and rating badges. Categories: Communication, Analytics, Productivity"
        screenshot="app-marketplace"
      />

      <SubHeading>Installing Apps</SubHeading>
      <P>
        Browse the marketplace in <strong>Settings → App Marketplace</strong>. Click "Install" on
        any app to add it to your workspace. Apps may add new modules, fields, automations, or
        integrations.
      </P>
    </div>
  );
}

// ─── Section Router ─────────────────────────────────────────────────────────────

const sectionComponents: Record<string, () => JSX.Element> = {
  welcome: WelcomeSection,
  registration: RegistrationSection,
  'dashboard-overview': DashboardOverviewSection,
  navigation: NavigationSection,
  'quick-setup': QuickSetupSection,
  'modules-overview': ModulesOverviewSection,
  'records-list': RecordsListSection,
  'records-detail': RecordsDetailSection,
  'records-create': RecordsCreateSection,
  'kanban-view': KanbanViewSection,
  leads: LeadsSection,
  'lead-conversion': LeadConversionSection,
  'contacts-accounts': ContactsAccountsSection,
  'deals-pipeline': DealsPipelineSection,
  tags: TagsSection,
  'import-data': ImportDataSection,
  'global-search': GlobalSearchSection,
  'field-history': FieldHistorySection,
  'workflow-rules': WorkflowRulesSection,
  blueprints: BlueprintsSection,
  'custom-functions': CustomFunctionsSection,
  'assignment-rules': AssignmentRulesSection,
  'approval-processes': ApprovalProcessesSection,
  'escalation-rules': EscalationRulesSection,
  'scoring-rules': ScoringRulesSection,
  'scheduled-actions': ScheduledActionsSection,
  'validation-rules': ValidationRulesSection,
  'analytics-engine': AnalyticsEngineSection,
  'kpi-dashboard': KpiDashboardSection,
  'saved-reports': SavedReportsSection,
  'dashboard-cards': DashboardCardsSection,
  'email-accounts': EmailAccountsSection,
  'email-compose': EmailComposeSection,
  'email-crm-link': EmailCrmLinkSection,
  'email-templates': EmailTemplatesSection,
  'users-management': UsersManagementSection,
  'roles-hierarchy': RolesHierarchySection,
  'profiles-permissions': ProfilesPermissionsSection,
  'sharing-rules': SharingRulesSection,
  teams: TeamsSection,
  'org-settings': OrgSettingsSection,
  'module-designer': ModuleDesignerSection,
  'global-picklists': GlobalPicklistsSection,
  'record-locking': RecordLockingSection,
  'document-templates': DocumentTemplatesSection,
  'audit-log': AuditLogSection,
  'login-history': LoginHistorySection,
  attendance: AttendanceSection,
  shifts: ShiftsSection,
  'leave-management': LeaveManagementSection,
  payroll: PayrollSection,
  departments: DepartmentsSection,
  locations: LocationsSection,
  'api-keys': ApiKeysSection,
  'webhooks-guide': WebhooksGuideSection,
  'social-sync': SocialSyncSection,
  'app-marketplace': AppMarketplaceSection,
};

// ─── Main Help Center ───────────────────────────────────────────────────────────

export default function HelpCenter() {
  const [activeSection, setActiveSection] = useState('welcome');
  const [expandedCategories, setExpandedCategories] = useState<Set<Category>>(
    new Set(['getting-started'])
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCategory = (cat: Category) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const selectSection = (id: string, category: Category) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    if (!expandedCategories.has(category)) {
      setExpandedCategories((prev) => new Set([...prev, category]));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredSections =
    searchQuery.length >= 2
      ? SECTIONS.filter((s) => s.label.toLowerCase().includes(searchQuery.toLowerCase()))
      : null;

  const ActiveComponent = sectionComponents[activeSection] || WelcomeSection;
  const activeCategory =
    SECTIONS.find((s) => s.id === activeSection)?.category || 'getting-started';

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="ERPnBox" className="h-10 w-auto" />
              <span className="text-xl font-bold text-gray-900">
                ERP<span className="text-brand-500">n</span>Box
              </span>
            </a>
            <span className="hidden sm:inline-block text-sm text-gray-400 border-l border-gray-200 pl-4 ml-2">
              Help Center
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors hidden sm:inline"
            >
              Home
            </a>
            <a
              href="/developers"
              className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors hidden sm:inline"
            >
              API Docs
            </a>
            <a
              href="/#pricing"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors shadow-sm"
            >
              Get Started
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
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
                  d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside
          className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:block fixed lg:sticky top-16 left-0 z-40 w-72 h-[calc(100vh-4rem)] bg-gray-50 border-r border-gray-200 overflow-y-auto`}
        >
          <div className="p-4">
            {/* Search */}
            <div className="relative mb-4">
              <svg
                className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search docs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>

            {/* Search results */}
            {filteredSections && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">{filteredSections.length} results</p>
                {filteredSections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      selectSection(s.id, s.category);
                      setSearchQuery('');
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <span className="font-medium">{s.label}</span>
                    <span className="text-xs text-gray-400 ml-2">
                      {CATEGORIES.find((c) => c.id === s.category)?.label}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Category nav */}
            {!filteredSections && (
              <nav className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const catSections = SECTIONS.filter((s) => s.category === cat.id);
                  const isExpanded = expandedCategories.has(cat.id);
                  const isActiveCategory = activeCategory === cat.id;
                  return (
                    <div key={cat.id}>
                      <button
                        onClick={() => toggleCategory(cat.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                          isActiveCategory
                            ? 'text-brand-700 bg-brand-50'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <svg
                          className="w-4 h-4 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
                        </svg>
                        <span className="flex-1 text-left">{cat.label}</span>
                        <svg
                          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </button>
                      {isExpanded && (
                        <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-gray-200 pl-3">
                          {catSections.map((s) => (
                            <button
                              key={s.id}
                              onClick={() => selectSection(s.id, cat.id)}
                              className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
                                activeSection === s.id
                                  ? 'text-brand-700 bg-brand-50 font-medium'
                                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                              }`}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            )}
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 px-6 lg:px-12 py-10 max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <a href="/docs" className="hover:text-brand-600">
              Help Center
            </a>
            <span>/</span>
            <span>{CATEGORIES.find((c) => c.id === activeCategory)?.label}</span>
            <span>/</span>
            <span className="text-gray-600">
              {SECTIONS.find((s) => s.id === activeSection)?.label}
            </span>
          </div>

          <ActiveComponent />

          {/* Navigation footer */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              {(() => {
                const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
                const prev = currentIndex > 0 ? SECTIONS[currentIndex - 1] : null;
                const next = currentIndex < SECTIONS.length - 1 ? SECTIONS[currentIndex + 1] : null;
                return (
                  <>
                    {prev ? (
                      <button
                        onClick={() => selectSection(prev.id, prev.category)}
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-600"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                          />
                        </svg>
                        {prev.label}
                      </button>
                    ) : (
                      <div />
                    )}
                    {next ? (
                      <button
                        onClick={() => selectSection(next.id, next.category)}
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-600"
                      >
                        {next.label}
                        <svg
                          className="w-4 h-4"
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
                      </button>
                    ) : (
                      <div />
                    )}
                  </>
                );
              })()}
            </div>
            <div className="text-center mt-8">
              <p className="text-sm text-gray-400">
                Need more help? Contact{' '}
                <a href="mailto:support@erpnbox.com" className="text-brand-600 hover:underline">
                  support@erpnbox.com
                </a>{' '}
                &middot;{' '}
                <a href="/developers" className="text-brand-600 hover:underline">
                  API Documentation
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
