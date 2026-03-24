import { useState, createContext, useContext } from 'react';

type Lang = 'en' | 'ar';
const LangContext = createContext<{ lang: Lang; t: (key: string) => string; toggle: () => void }>({
  lang: 'en', t: (k) => k, toggle: () => {},
});
const useLang = () => useContext(LangContext);

const translations: Record<string, Record<Lang, string>> = {
  'nav.features': { en: 'Features', ar: 'المميزات' },
  'nav.templates': { en: 'Templates', ar: 'القوالب' },
  'nav.ai': { en: 'AI Agents', ar: 'وكلاء الذكاء الاصطناعي' },
  'nav.pricing': { en: 'Pricing', ar: 'الأسعار' },
  'nav.signin': { en: 'Sign In', ar: 'تسجيل الدخول' },
  'nav.trial': { en: 'Start Free Trial', ar: 'ابدأ تجربة مجانية' },
  'hero.badge': { en: 'Now with AI-Powered Module Creation', ar: 'الآن مع إنشاء الوحدات بالذكاء الاصطناعي' },
  'hero.title1': { en: 'Your Business,', ar: 'أعمالك،' },
  'hero.title2': { en: 'Unboxed', ar: 'بلا حدود' },
  'hero.sub': { en: 'The modular ERP platform with ready-to-use industry templates. Launch in minutes with AI agents that build your custom modules, workflows, and automations.', ar: 'منصة ERP المعيارية مع قوالب جاهزة للاستخدام. انطلق في دقائق مع وكلاء الذكاء الاصطناعي الذين يبنون وحداتك وسير العمل والأتمتة المخصصة.' },
  'hero.trial': { en: 'Start Free Trial', ar: 'ابدأ تجربة مجانية' },
  'hero.demo': { en: 'Watch Demo', ar: 'شاهد العرض' },
  'hero.proof': { en: 'No credit card required \u00b7 14-day free trial \u00b7 Cancel anytime', ar: 'لا حاجة لبطاقة ائتمان \u00b7 تجربة مجانية 14 يوم \u00b7 إلغاء في أي وقت' },
  'feat.label': { en: 'Everything You Need', ar: 'كل ما تحتاجه' },
  'feat.title': { en: 'One platform, unlimited possibilities', ar: 'منصة واحدة، إمكانيات غير محدودة' },
  'feat.sub': { en: 'From lead capture to deal close, from workflow automation to AI insights \u2014 ERPnBox handles it all.', ar: 'من التقاط العملاء المحتملين إلى إغلاق الصفقات، ومن أتمتة سير العمل إلى رؤى الذكاء الاصطناعي \u2014 ERPnBox يتولى كل شيء.' },
  'feat.0.title': { en: 'Dynamic Modules', ar: 'وحدات ديناميكية' },
  'feat.0.desc': { en: 'Create custom modules with any field type. No coding required \u2014 just define your data model and go.', ar: 'أنشئ وحدات مخصصة بأي نوع حقل. لا حاجة للبرمجة \u2014 حدد نموذج بياناتك وانطلق.' },
  'feat.1.title': { en: 'CRM & Contact Management', ar: 'إدارة علاقات العملاء وجهات الاتصال' },
  'feat.1.desc': { en: 'Manage leads, contacts, accounts, and deals through a fully customizable pipeline.', ar: 'أدر العملاء المحتملين وجهات الاتصال والحسابات والصفقات من خلال مسار قابل للتخصيص بالكامل.' },
  'feat.2.title': { en: 'Workflow Automation', ar: 'أتمتة سير العمل' },
  'feat.2.desc': { en: 'Build automated workflows with conditions, field updates, email alerts, webhooks, and assignment rules.', ar: 'أنشئ سير عمل آلي مع شروط وتحديثات الحقول وتنبيهات البريد الإلكتروني والويب هوك وقواعد التعيين.' },
  'feat.3.title': { en: 'Roles & Profiles', ar: 'الأدوار والملفات الشخصية' },
  'feat.3.desc': { en: 'Enterprise-grade RBAC with role hierarchy, field-level permissions, and data sharing rules.', ar: 'نظام صلاحيات متقدم مع تسلسل الأدوار وأذونات على مستوى الحقل وقواعد مشاركة البيانات.' },
  'feat.4.title': { en: 'KPI Tracking', ar: 'تتبع مؤشرات الأداء' },
  'feat.4.desc': { en: 'Define performance indicators and assign them to individuals, roles, or teams with real-time dashboards.', ar: 'حدد مؤشرات الأداء وعيّنها للأفراد أو الأدوار أو الفرق مع لوحات معلومات في الوقت الفعلي.' },
  'feat.5.title': { en: 'Meeting Scheduler', ar: 'جدولة الاجتماعات' },
  'feat.5.desc': { en: 'Intuitive calendar-based meeting creation with drag-and-drop time selection and attendee management.', ar: 'إنشاء اجتماعات بتقويم سهل مع اختيار الوقت بالسحب والإفلات وإدارة الحضور.' },
  'feat.6.title': { en: 'Email Integration', ar: 'تكامل البريد الإلكتروني' },
  'feat.6.desc': { en: 'Send emails directly from records with customizable templates and full activity tracking.', ar: 'أرسل رسائل بريد إلكتروني مباشرة من السجلات مع قوالب قابلة للتخصيص وتتبع كامل للنشاط.' },
  'feat.7.title': { en: 'Custom Functions', ar: 'الدوال المخصصة' },
  'feat.7.desc': { en: 'Write serverless functions in JavaScript that execute on triggers, schedules, or API calls.', ar: 'اكتب دوال بدون خادم بلغة JavaScript تنفذ عند المحفزات أو الجداول أو استدعاءات API.' },
  'feat.8.title': { en: 'Multi-Tenant SaaS', ar: 'SaaS متعدد المستأجرين' },
  'feat.8.desc': { en: 'Built for scale with row-level tenant isolation, per-tenant customization, and platform admin controls.', ar: 'مبني للتوسع مع عزل المستأجرين على مستوى الصف وتخصيص لكل مستأجر وأدوات إدارة المنصة.' },
  'tmpl.label': { en: 'Ready-to-Use Templates', ar: 'قوالب جاهزة للاستخدام' },
  'tmpl.title': { en: 'Launch your CRM in minutes, not months', ar: 'أطلق نظام CRM الخاص بك في دقائق، وليس أشهر' },
  'tmpl.sub': { en: 'Choose an industry template pre-loaded with modules, fields, workflows, and sample data. Customize everything to fit your business perfectly.', ar: 'اختر قالب صناعي محمّل مسبقاً بالوحدات والحقول وسير العمل وبيانات عينة. خصص كل شيء ليناسب عملك بشكل مثالي.' },
  'tmpl.use': { en: 'Use this template', ar: 'استخدم هذا القالب' },
  'tmpl.more': { en: 'More templates added monthly. Or create your own from scratch.', ar: 'يتم إضافة المزيد من القوالب شهرياً. أو أنشئ قالبك من الصفر.' },
  'tmpl.0.name': { en: 'Real Estate CRM', ar: 'إدارة العقارات' },
  'tmpl.0.desc': { en: 'Properties, listings, agents, viewings, commissions, and closing pipelines.', ar: 'العقارات والقوائم والوكلاء والمعاينات والعمولات ومسارات الإغلاق.' },
  'tmpl.1.name': { en: 'Sales CRM', ar: 'إدارة المبيعات' },
  'tmpl.1.desc': { en: 'Full sales pipeline with leads, contacts, accounts, deals, and activities.', ar: 'مسار مبيعات كامل مع العملاء المحتملين وجهات الاتصال والحسابات والصفقات والأنشطة.' },
  'tmpl.2.name': { en: 'Recruitment', ar: 'التوظيف' },
  'tmpl.2.desc': { en: 'Candidates, job openings, interviews, offers, and onboarding tracking.', ar: 'المرشحون وفرص العمل والمقابلات والعروض وتتبع التهيئة.' },
  'tmpl.3.name': { en: 'Project Management', ar: 'إدارة المشاريع' },
  'tmpl.3.desc': { en: 'Projects, tasks, milestones, timesheets, and team collaboration.', ar: 'المشاريع والمهام والمراحل وجداول الوقت والتعاون الجماعي.' },
  'tmpl.4.name': { en: 'Education', ar: 'التعليم' },
  'tmpl.4.desc': { en: 'Students, courses, enrollments, grades, and fee management.', ar: 'الطلاب والدورات والتسجيل والدرجات وإدارة الرسوم.' },
  'tmpl.5.name': { en: 'Healthcare', ar: 'الرعاية الصحية' },
  'tmpl.5.desc': { en: 'Patients, appointments, treatments, prescriptions, and billing.', ar: 'المرضى والمواعيد والعلاجات والوصفات والفواتير.' },
  'ai.badge': { en: 'Powered by AI', ar: 'مدعوم بالذكاء الاصطناعي' },
  'ai.title': { en: 'AI Agents that build your ERP', ar: 'وكلاء ذكاء اصطناعي يبنون نظام ERP الخاص بك' },
  'ai.sub': { en: 'Stop configuring. Start describing. Our AI agents turn your words into fully functional modules, workflows, and automations.', ar: 'توقف عن التكوين. ابدأ بالوصف. وكلاء الذكاء الاصطناعي لدينا يحولون كلماتك إلى وحدات وسير عمل وأتمتة كاملة الوظائف.' },
  'ai.0.title': { en: 'AI Module Creator', ar: 'منشئ الوحدات بالذكاء الاصطناعي' },
  'ai.0.desc': { en: 'Describe your business process in plain English. Our AI agent designs the perfect module with fields, validations, and workflows \u2014 ready in seconds.', ar: 'صف عملية عملك بلغة بسيطة. وكيل الذكاء الاصطناعي يصمم الوحدة المثالية بالحقول والتحققات وسير العمل \u2014 جاهزة في ثوانٍ.' },
  'ai.1.title': { en: 'Smart Field Suggestions', ar: 'اقتراحات الحقول الذكية' },
  'ai.1.desc': { en: 'AI analyzes your industry and suggests optimal field types, picklist values, and validation rules based on best practices.', ar: 'الذكاء الاصطناعي يحلل صناعتك ويقترح أنواع الحقول المثلى وقيم القوائم وقواعد التحقق بناءً على أفضل الممارسات.' },
  'ai.2.title': { en: 'Workflow Builder Agent', ar: 'وكيل بناء سير العمل' },
  'ai.2.desc': { en: 'Tell the AI what should happen when a deal closes or a lead goes cold. It builds the complete automation workflow for you.', ar: 'أخبر الذكاء الاصطناعي بما يجب أن يحدث عند إغلاق صفقة أو فقدان عميل محتمل. يبني سير العمل الآلي الكامل لك.' },
  'ai.3.title': { en: 'Natural Language Queries', ar: 'استعلامات باللغة الطبيعية' },
  'ai.3.desc': { en: 'Ask questions like "Show me all deals over $50K closing this month" and get instant results. No filters to configure.', ar: 'اطرح أسئلة مثل "أرني جميع الصفقات التي تزيد عن 50 ألف والتي تُغلق هذا الشهر" واحصل على نتائج فورية. لا حاجة لتكوين فلاتر.' },
  'ai.4.title': { en: 'Template Generator', ar: 'مولّد القوالب' },
  'ai.4.desc': { en: 'Describe your industry and business model. AI generates a complete template with modules, fields, workflows, and sample data.', ar: 'صف صناعتك ونموذج عملك. الذكاء الاصطناعي يولّد قالباً كاملاً بالوحدات والحقول وسير العمل وبيانات العينة.' },
  'ai.5.title': { en: 'Predictive Insights', ar: 'رؤى تنبؤية' },
  'ai.5.desc': { en: 'AI analyzes your data patterns to predict deal outcomes, suggest best next actions, and identify at-risk accounts.', ar: 'الذكاء الاصطناعي يحلل أنماط بياناتك للتنبؤ بنتائج الصفقات واقتراح أفضل الإجراءات التالية وتحديد الحسابات المعرضة للخطر.' },
  'ai.try': { en: 'Try it yourself', ar: 'جرّب بنفسك' },
  'ai.prompt': { en: '"Create a module for tracking customer support tickets with priority levels, assignee, SLA timer, and auto-escalation workflow"', ar: '"أنشئ وحدة لتتبع تذاكر دعم العملاء مع مستويات الأولوية والمكلّف ومؤقت SLA وسير عمل التصعيد التلقائي"' },
  'ai.result': { en: 'AI generates: 8 fields, 2 workflows, 1 assignment rule \u2014 in 10 seconds', ar: 'الذكاء الاصطناعي يولّد: 8 حقول، 2 سير عمل، 1 قاعدة تعيين \u2014 في 10 ثوانٍ' },
  'how.label': { en: 'How It Works', ar: 'كيف يعمل' },
  'how.title': { en: 'From zero to live in 3 steps', ar: 'من الصفر إلى الإطلاق في 3 خطوات' },
  'how.0.title': { en: 'Choose a Template', ar: 'اختر قالباً' },
  'how.0.desc': { en: 'Pick an industry template or start from scratch. Templates come with modules, fields, workflows, and sample data.', ar: 'اختر قالب صناعي أو ابدأ من الصفر. القوالب تأتي مع وحدات وحقول وسير عمل وبيانات عينة.' },
  'how.1.title': { en: 'Customize with AI', ar: 'خصص بالذكاء الاصطناعي' },
  'how.1.desc': { en: 'Describe what you need in plain English. AI agents build custom modules, fields, and automations instantly.', ar: 'صف ما تحتاجه بلغة بسيطة. وكلاء الذكاء الاصطناعي يبنون وحدات وحقول وأتمتة مخصصة فوراً.' },
  'how.2.title': { en: 'Go Live', ar: 'انطلق' },
  'how.2.desc': { en: 'Invite your team, import data, and start working. Your custom ERP is ready on your own domain.', ar: 'ادعُ فريقك واستورد البيانات وابدأ العمل. نظام ERP المخصص جاهز على نطاقك الخاص.' },
  'price.label': { en: 'Pricing', ar: 'الأسعار' },
  'price.title': { en: 'Simple, transparent pricing', ar: 'أسعار بسيطة وشفافة' },
  'price.sub': { en: 'Start free. Scale as you grow. No hidden fees.', ar: 'ابدأ مجاناً. توسع مع نموك. لا رسوم خفية.' },
  'price.starter': { en: 'Starter', ar: 'المبتدئ' },
  'price.starter.desc': { en: 'For individuals and small teams getting started.', ar: 'للأفراد والفرق الصغيرة في البداية.' },
  'price.starter.cta': { en: 'Start Free', ar: 'ابدأ مجاناً' },
  'price.pro': { en: 'Professional', ar: 'الاحترافي' },
  'price.pro.desc': { en: 'For growing teams that need full customization.', ar: 'للفرق النامية التي تحتاج تخصيصاً كاملاً.' },
  'price.pro.cta': { en: 'Start Free Trial', ar: 'ابدأ تجربة مجانية' },
  'price.ent': { en: 'Enterprise', ar: 'المؤسسات' },
  'price.ent.desc': { en: 'For organizations with advanced security needs.', ar: 'للمؤسسات ذات احتياجات الأمان المتقدمة.' },
  'price.ent.cta': { en: 'Contact Sales', ar: 'تواصل مع المبيعات' },
  'price.free': { en: 'Free', ar: 'مجاني' },
  'price.forever': { en: 'forever', ar: 'للأبد' },
  'price.peruser': { en: '/user/month', ar: '/مستخدم/شهر' },
  'price.custom': { en: 'Custom', ar: 'مخصص' },
  'price.f.3users': { en: '3 users included', ar: '3 مستخدمين مشمولين' },
  'price.f.5mod': { en: '5 custom modules', ar: '5 وحدات مخصصة' },
  'price.f.1000': { en: '1,000 records per module', ar: '1,000 سجل لكل وحدة' },
  'price.f.1tmpl': { en: '1 industry template', ar: 'قالب صناعي واحد' },
  'price.f.basic': { en: 'Basic workflow automation', ar: 'أتمتة سير عمل أساسية' },
  'price.f.email': { en: 'Email support', ar: 'دعم بالبريد الإلكتروني' },
  'price.f.unluser': { en: 'Unlimited users', ar: 'مستخدمون غير محدودين' },
  'price.f.unlmod': { en: 'Unlimited modules', ar: 'وحدات غير محدودة' },
  'price.f.unlrec': { en: 'Unlimited records', ar: 'سجلات غير محدودة' },
  'price.f.alltmpl': { en: 'All industry templates', ar: 'جميع القوالب الصناعية' },
  'price.f.adv': { en: 'Advanced workflows & functions', ar: 'سير عمل ودوال متقدمة' },
  'price.f.aimod': { en: 'AI module creator', ar: 'منشئ وحدات بالذكاء الاصطناعي' },
  'price.f.roles': { en: 'Role hierarchy & profiles', ar: 'تسلسل الأدوار والملفات الشخصية' },
  'price.f.priority': { en: 'Priority support', ar: 'دعم ذو أولوية' },
  'price.f.everything': { en: 'Everything in Professional', ar: 'كل ما في الاحترافي' },
  'price.f.multitenant': { en: 'Multi-tenant platform admin', ar: 'إدارة منصة متعددة المستأجرين' },
  'price.f.customai': { en: 'Custom AI agent training', ar: 'تدريب وكيل ذكاء اصطناعي مخصص' },
  'price.f.sso': { en: 'SSO & advanced security', ar: 'تسجيل دخول موحد وأمان متقدم' },
  'price.f.infra': { en: 'Dedicated infrastructure', ar: 'بنية تحتية مخصصة' },
  'price.f.integrations': { en: 'Custom integrations', ar: 'تكاملات مخصصة' },
  'price.f.sla': { en: 'SLA guarantee', ar: 'ضمان SLA' },
  'price.f.csm': { en: 'Dedicated success manager', ar: 'مدير نجاح مخصص' },
  'cta.title': { en: 'Ready to unbox your business potential?', ar: 'مستعد لإطلاق إمكانات عملك؟' },
  'cta.sub': { en: 'Join thousands of businesses running on ERPnBox. Start with a template, customize with AI, and deploy on your domain today.', ar: 'انضم إلى آلاف الشركات التي تعمل على ERPnBox. ابدأ بقالب، خصص بالذكاء الاصطناعي، وانشر على نطاقك اليوم.' },
  'cta.trial': { en: 'Start Free Trial', ar: 'ابدأ تجربة مجانية' },
  'cta.demo': { en: 'Schedule a Demo', ar: 'احجز عرضاً توضيحياً' },
  'footer.tagline': { en: 'The modular ERP platform that grows with your business.', ar: 'منصة ERP المعيارية التي تنمو مع عملك.' },
  'footer.product': { en: 'Product', ar: 'المنتج' },
  'footer.integrations': { en: 'Integrations', ar: 'التكاملات' },
  'footer.company': { en: 'Company', ar: 'الشركة' },
  'footer.about': { en: 'About', ar: 'عن الشركة' },
  'footer.blog': { en: 'Blog', ar: 'المدونة' },
  'footer.careers': { en: 'Careers', ar: 'الوظائف' },
  'footer.contact': { en: 'Contact', ar: 'اتصل بنا' },
  'footer.legal': { en: 'Legal', ar: 'قانوني' },
  'footer.privacy': { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
  'footer.terms': { en: 'Terms of Service', ar: 'شروط الخدمة' },
  'footer.security': { en: 'Security', ar: 'الأمان' },
  'footer.gdpr': { en: 'GDPR', ar: 'حماية البيانات' },
  'footer.copy': { en: 'ERPnBox. All rights reserved.', ar: 'ERPnBox. جميع الحقوق محفوظة.' },
  'mock.deals': { en: 'Open Deals', ar: 'صفقات مفتوحة' },
  'mock.leads': { en: 'New Leads', ar: 'عملاء جدد' },
  'mock.meetings': { en: 'Meetings Today', ar: 'اجتماعات اليوم' },
  'mock.tasks': { en: 'Tasks Due', ar: 'مهام مستحقة' },
  'mock.pipeline': { en: 'Revenue Pipeline', ar: 'مسار الإيرادات' },
  'mock.topmod': { en: 'Top Modules', ar: 'أهم الوحدات' },
  'Agent': { en: 'Agent', ar: 'وكيل' },
  'Intelligence': { en: 'Intelligence', ar: 'ذكاء' },
};

// ─── SVG Icon Components ──────────────────────────────────────────────────────

function IconBox({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  );
}

function IconUsers({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

function IconCog({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconBolt({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  );
}

function IconShield({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function IconChart({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function IconCalendar({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function IconMail({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function IconGlobe({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}

function IconSparkles({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

function IconArrowRight({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function IconCheck({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function IconPlay({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function IconMenu({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function IconX({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: IconBox,
    title: 'Dynamic Modules',
    description: 'Create custom modules with any field type. No coding required — just define your data model and go.',
  },
  {
    icon: IconUsers,
    title: 'CRM & Contact Management',
    description: 'Manage leads, contacts, accounts, and deals through a fully customizable pipeline.',
  },
  {
    icon: IconCog,
    title: 'Workflow Automation',
    description: 'Build automated workflows with conditions, field updates, email alerts, webhooks, and assignment rules.',
  },
  {
    icon: IconShield,
    title: 'Roles & Profiles',
    description: 'Enterprise-grade RBAC with role hierarchy, field-level permissions, and data sharing rules.',
  },
  {
    icon: IconChart,
    title: 'KPI Tracking',
    description: 'Define performance indicators and assign them to individuals, roles, or teams with real-time dashboards.',
  },
  {
    icon: IconCalendar,
    title: 'Meeting Scheduler',
    description: 'Intuitive calendar-based meeting creation with drag-and-drop time selection and attendee management.',
  },
  {
    icon: IconMail,
    title: 'Email Integration',
    description: 'Send emails directly from records with customizable templates and full activity tracking.',
  },
  {
    icon: IconBolt,
    title: 'Custom Functions',
    description: 'Write serverless functions in JavaScript that execute on triggers, schedules, or API calls.',
  },
  {
    icon: IconGlobe,
    title: 'Multi-Tenant SaaS',
    description: 'Built for scale with row-level tenant isolation, per-tenant customization, and platform admin controls.',
  },
];

const TEMPLATES = [
  {
    name: 'Real Estate CRM',
    description: 'Properties, listings, agents, viewings, commissions, and closing pipelines.',
    modules: ['Properties', 'Listings', 'Viewings', 'Agents', 'Commissions'],
    color: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Sales CRM',
    description: 'Full sales pipeline with leads, contacts, accounts, deals, and activities.',
    modules: ['Leads', 'Contacts', 'Accounts', 'Deals', 'Calls', 'Meetings'],
    color: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Recruitment',
    description: 'Candidates, job openings, interviews, offers, and onboarding tracking.',
    modules: ['Candidates', 'Job Openings', 'Interviews', 'Offers', 'Placements'],
    color: 'from-violet-500 to-purple-600',
  },
  {
    name: 'Project Management',
    description: 'Projects, tasks, milestones, timesheets, and team collaboration.',
    modules: ['Projects', 'Tasks', 'Milestones', 'Timesheets', 'Teams'],
    color: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Education',
    description: 'Students, courses, enrollments, grades, and fee management.',
    modules: ['Students', 'Courses', 'Enrollments', 'Grades', 'Payments'],
    color: 'from-rose-500 to-pink-600',
  },
  {
    name: 'Healthcare',
    description: 'Patients, appointments, treatments, prescriptions, and billing.',
    modules: ['Patients', 'Appointments', 'Treatments', 'Prescriptions', 'Billing'],
    color: 'from-cyan-500 to-blue-600',
  },
];

const AI_FEATURES = [
  {
    title: 'AI Module Creator',
    description: 'Describe your business process in plain English. Our AI agent designs the perfect module with fields, validations, and workflows — ready in seconds.',
    badge: 'Agent',
  },
  {
    title: 'Smart Field Suggestions',
    description: 'AI analyzes your industry and suggests optimal field types, picklist values, and validation rules based on best practices.',
    badge: 'Intelligence',
  },
  {
    title: 'Workflow Builder Agent',
    description: 'Tell the AI what should happen when a deal closes or a lead goes cold. It builds the complete automation workflow for you.',
    badge: 'Agent',
  },
  {
    title: 'Natural Language Queries',
    description: 'Ask questions like "Show me all deals over $50K closing this month" and get instant results. No filters to configure.',
    badge: 'Intelligence',
  },
  {
    title: 'Template Generator',
    description: 'Describe your industry and business model. AI generates a complete template with modules, fields, workflows, and sample data.',
    badge: 'Agent',
  },
  {
    title: 'Predictive Insights',
    description: 'AI analyzes your data patterns to predict deal outcomes, suggest best next actions, and identify at-risk accounts.',
    badge: 'Intelligence',
  },
];


// ─── Components ────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, t, toggle } = useLang();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="ERPnBox" className="h-10 w-auto" />
            <span className="text-xl font-bold text-brand-900">
              ERP<span className="text-brand-500">n</span>Box
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">{t('nav.features')}</a>
            <a href="#templates" className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">{t('nav.templates')}</a>
            <a href="#ai" className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">{t('nav.ai')}</a>
            <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">{t('nav.pricing')}</a>
            <a href="/docs" className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">Help Center</a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggle}
              className="px-2.5 py-1 rounded-md text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
            <a href="https://app.erpnbox.com/login" className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">
              {t('nav.signin')}
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors shadow-sm"
            >
              {t('nav.trial')}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              className="px-2 py-1 rounded-md text-xs font-semibold border border-gray-200 text-gray-600"
            >
              {lang === 'en' ? 'ع' : 'En'}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {open ? <IconX /> : <IconMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <a href="#features" onClick={() => setOpen(false)} className="block text-sm font-medium text-gray-700 py-2">{t('nav.features')}</a>
          <a href="#templates" onClick={() => setOpen(false)} className="block text-sm font-medium text-gray-700 py-2">{t('nav.templates')}</a>
          <a href="#ai" onClick={() => setOpen(false)} className="block text-sm font-medium text-gray-700 py-2">{t('nav.ai')}</a>
          <a href="#pricing" onClick={() => setOpen(false)} className="block text-sm font-medium text-gray-700 py-2">{t('nav.pricing')}</a>
          <a href="/docs" onClick={() => setOpen(false)} className="block text-sm font-medium text-gray-700 py-2">Help Center</a>
          <div className="pt-3 border-t border-gray-100 space-y-2">
            <a href="https://app.erpnbox.com/login" className="block text-sm font-medium text-gray-600 py-2">{t('nav.signin')}</a>
            <a href="#pricing" className="block text-center px-4 py-2.5 rounded-lg bg-brand-600 text-white text-sm font-semibold">
              {t('nav.trial')}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const { t } = useLang();
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-brand-100/60 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-gradient-to-b from-blue-100/40 to-transparent rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-sm font-medium mb-8">
            <IconSparkles className="w-4 h-4" />
            {t('hero.badge')}
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            {t('hero.title1')}{' '}
            <span className="text-gradient from-brand-500 to-brand-300">{t('hero.title2')}</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">{t('hero.sub')}</p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#pricing" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-600 text-white font-semibold text-lg hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/25 hover:shadow-xl hover:shadow-brand-600/30">
              {t('hero.trial')}
              <IconArrowRight className="w-5 h-5" />
            </a>
            <a href="#features" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-gray-700 font-semibold text-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
              <IconPlay className="w-5 h-5 text-brand-600" />
              {t('hero.demo')}
            </a>
          </div>
          <p className="mt-8 text-sm text-gray-500">{t('hero.proof')}</p>
        </div>
        <div className="mt-16 relative">
          <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/60 border border-gray-200 overflow-hidden mx-auto max-w-5xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white rounded-md border border-gray-200 px-3 py-1 text-xs text-gray-400 max-w-xs mx-auto">app.erpnbox.com/dashboard</div>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-b from-gray-50 to-white">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { key: 'mock.deals', value: '$284,000', change: '+12%', color: 'text-emerald-600 bg-emerald-50' },
                  { key: 'mock.leads', value: '147', change: '+8%', color: 'text-blue-600 bg-blue-50' },
                  { key: 'mock.meetings', value: '12', change: '', color: 'text-violet-600 bg-violet-50' },
                  { key: 'mock.tasks', value: '23', change: '-3', color: 'text-amber-600 bg-amber-50' },
                ].map((stat) => (
                  <div key={stat.key} className="bg-white rounded-lg border border-gray-100 p-4">
                    <p className="text-xs text-gray-500">{t(stat.key)}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    {stat.change && <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${stat.color}`}>{stat.change}</span>}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 bg-white rounded-lg border border-gray-100 p-4 h-48">
                  <p className="text-sm font-semibold text-gray-700 mb-3">{t('mock.pipeline')}</p>
                  <div className="flex items-end gap-2 h-32">
                    {[40, 65, 45, 80, 55, 70, 90, 60, 85, 75, 95, 88].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-brand-500 to-brand-300" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-100 p-4 h-48">
                  <p className="text-sm font-semibold text-gray-700 mb-3">{t('mock.topmod')}</p>
                  <div className="space-y-3">
                    {[{ name: 'Deals', pct: 85 }, { name: 'Leads', pct: 72 }, { name: 'Contacts', pct: 60 }, { name: 'Meetings', pct: 45 }].map((m) => (
                      <div key={m.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">{m.name}</span>
                          <span className="text-gray-400">{m.pct}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: `${m.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </div>
      </div>
    </section>
  );
}

function Features() {
  const { t } = useLang();
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-3">{t('feat.label')}</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{t('feat.title')}</h2>
          <p className="mt-4 text-lg text-gray-600">{t('feat.sub')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-100 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t(`feat.${i}.title`)}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{t(`feat.${i}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Templates() {
  const { t } = useLang();
  return (
    <section id="templates" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-3">{t('tmpl.label')}</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{t('tmpl.title')}</h2>
          <p className="mt-4 text-lg text-gray-600">{t('tmpl.sub')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMPLATES.map((template, i) => (
            <div key={i} className="relative group overflow-hidden rounded-2xl border border-gray-200 bg-white hover:shadow-lg transition-all">
              <div className={`h-32 bg-gradient-to-br ${template.color} p-6 flex items-end`}>
                <h3 className="text-xl font-bold text-white">{t(`tmpl.${i}.name`)}</h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">{t(`tmpl.${i}.desc`)}</p>
                <div className="flex flex-wrap gap-1.5">
                  {template.modules.map((mod) => (
                    <span key={mod} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">{mod}</span>
                  ))}
                </div>
                <a href="#pricing" className="mt-4 inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700 group-hover:gap-2 gap-1 transition-all">
                  {t('tmpl.use')}
                  <IconArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">{t('tmpl.more')}</p>
        </div>
      </div>
    </section>
  );
}

function AISection() {
  const { t } = useLang();
  return (
    <section id="ai" className="py-24 bg-gradient-to-b from-brand-950 to-brand-900 relative overflow-hidden">
      <div className="absolute inset-0 -z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-800/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-700/30 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-800/50 border border-brand-700/50 text-brand-300 text-sm font-medium mb-6">
            <IconSparkles className="w-4 h-4" />
            {t('ai.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">{t('ai.title')}</h2>
          <p className="mt-4 text-lg text-brand-200">{t('ai.sub')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AI_FEATURES.map((feature, i) => (
            <div key={i} className="bg-brand-800/40 backdrop-blur-sm rounded-xl p-6 border border-brand-700/40 hover:border-brand-600/60 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  feature.badge === 'Agent'
                    ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                }`}>{t(feature.badge)}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t(`ai.${i}.title`)}</h3>
              <p className="text-sm text-brand-300 leading-relaxed">{t(`ai.${i}.desc`)}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-brand-800/60 backdrop-blur rounded-2xl border border-brand-700/50 p-6">
            <p className="text-xs text-brand-400 uppercase tracking-wide mb-3">{t('ai.try')}</p>
            <div className="bg-brand-900/80 rounded-xl p-4 border border-brand-700/30">
              <p className="text-brand-200 text-sm font-mono">
                <span className="text-brand-500">&gt;</span> {t('ai.prompt')}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-brand-300 text-sm">
              <IconSparkles className="w-4 h-4 text-brand-400" />
              {t('ai.result')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const { t } = useLang();
  const steps = ['01', '02', '03'];
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-3">{t('how.label')}</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{t('how.title')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((num, i) => (
            <div key={num} className="relative">
              {i < 2 && <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-brand-200" />}
              <div className="text-center">
                <div className="w-24 h-24 rounded-2xl bg-white border-2 border-brand-200 flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <span className="text-3xl font-extrabold text-brand-600">{num}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t(`how.${i}.title`)}</h3>
                <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">{t(`how.${i}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const { t } = useLang();
  const plans = [
    { nameKey: 'price.starter', priceKey: 'price.free', periodKey: 'price.forever', descKey: 'price.starter.desc', ctaKey: 'price.starter.cta', highlighted: false,
      featureKeys: ['price.f.3users', 'price.f.5mod', 'price.f.1000', 'price.f.1tmpl', 'price.f.basic', 'price.f.email'] },
    { nameKey: 'price.pro', priceKey: '$15', periodKey: 'price.peruser', descKey: 'price.pro.desc', ctaKey: 'price.pro.cta', highlighted: true,
      featureKeys: ['price.f.unlmod', 'price.f.unlrec', 'price.f.alltmpl', 'price.f.adv', 'price.f.aimod', 'price.f.roles', 'price.f.priority'] },
    { nameKey: 'price.ent', priceKey: 'price.custom', periodKey: '', descKey: 'price.ent.desc', ctaKey: 'price.ent.cta', highlighted: false,
      featureKeys: ['price.f.everything', 'price.f.multitenant', 'price.f.customai', 'price.f.sso', 'price.f.infra', 'price.f.integrations', 'price.f.sla', 'price.f.csm'] },
  ];
  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-3">{t('price.label')}</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{t('price.title')}</h2>
          <p className="mt-4 text-lg text-gray-600">{t('price.sub')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const price = plan.priceKey.startsWith('price.') ? t(plan.priceKey) : plan.priceKey;
            return (
              <div key={plan.nameKey} className={`rounded-2xl p-8 ${plan.highlighted ? 'bg-brand-600 text-white shadow-xl shadow-brand-600/25 ring-4 ring-brand-600/20 scale-105' : 'bg-white border border-gray-200 shadow-sm'}`}>
                <h3 className={`text-lg font-semibold ${plan.highlighted ? 'text-brand-100' : 'text-gray-900'}`}>{t(plan.nameKey)}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className={`text-4xl font-extrabold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>{price}</span>
                  {plan.periodKey && <span className={`text-sm ${plan.highlighted ? 'text-brand-200' : 'text-gray-500'}`}>{t(plan.periodKey)}</span>}
                </div>
                <p className={`mt-2 text-sm ${plan.highlighted ? 'text-brand-200' : 'text-gray-500'}`}>{t(plan.descKey)}</p>
                <ul className="mt-6 space-y-3">
                  {plan.featureKeys.map((fk) => (
                    <li key={fk} className="flex items-start gap-2">
                      <IconCheck className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-brand-200' : 'text-brand-500'}`} />
                      <span className={`text-sm ${plan.highlighted ? 'text-brand-100' : 'text-gray-600'}`}>{t(fk)}</span>
                    </li>
                  ))}
                </ul>
                <a href="https://app.erpnbox.com/register" className={`mt-8 block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all ${plan.highlighted ? 'bg-white text-brand-600 hover:bg-brand-50 shadow-lg' : 'bg-brand-600 text-white hover:bg-brand-700'}`}>{t(plan.ctaKey)}</a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  const { t } = useLang();
  return (
    <section className="py-20 bg-brand-600 relative overflow-hidden">
      <div className="absolute inset-0 -z-0">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand-500/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-700/50 rounded-full blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{t('cta.title')}</h2>
        <p className="text-lg text-brand-100 mb-8 max-w-2xl mx-auto">{t('cta.sub')}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://app.erpnbox.com/register" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-brand-600 font-semibold text-lg hover:bg-brand-50 transition-all shadow-lg">
            {t('cta.trial')}
            <IconArrowRight className="w-5 h-5" />
          </a>
          <a href="#" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-500/30 text-white font-semibold text-lg border border-brand-400/40 hover:bg-brand-500/50 transition-all">
            {t('cta.demo')}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logo.png" alt="ERPnBox" className="h-9 w-auto" />
              <span className="text-lg font-bold text-white">ERP<span className="text-brand-400">n</span>Box</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{t('footer.tagline')}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t('footer.product')}</h4>
            <ul className="space-y-2.5">
              <li><a href="/features/crm" className="text-sm hover:text-white transition-colors">CRM</a></li>
              <li><a href="/features/automation" className="text-sm hover:text-white transition-colors">Automation</a></li>
              <li><a href="/features/analytics" className="text-sm hover:text-white transition-colors">Analytics</a></li>
              <li><a href="/features/hrms" className="text-sm hover:text-white transition-colors">HRMS</a></li>
              <li><a href="/features/security" className="text-sm hover:text-white transition-colors">Security</a></li>
              <li><a href="#pricing" className="text-sm hover:text-white transition-colors">{t('nav.pricing')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2.5">
              <li><a href="/docs" className="text-sm hover:text-white transition-colors">Help Center</a></li>
              <li><a href="/developers" className="text-sm hover:text-white transition-colors">API Docs</a></li>
              <li><a href="/support" className="text-sm hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">{t('footer.contact')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2.5">
              <li><a href="/privacy-policy" className="text-sm hover:text-white transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="/terms-of-service" className="text-sm hover:text-white transition-colors">{t('footer.terms')}</a></li>
              <li><a href="/data-deletion" className="text-sm hover:text-white transition-colors">Data Deletion</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">{t('footer.security')}</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">{t('footer.gdpr')}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} {t('footer.copy')}</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-500 hover:text-white transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors" aria-label="GitHub">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  const t = (key: string) => translations[key]?.[lang] ?? key;
  const toggle = () => setLang((l) => (l === 'en' ? 'ar' : 'en'));

  return (
    <LangContext.Provider value={{ lang, t, toggle }}>
      <div className="min-h-screen bg-white" dir={lang === 'ar' ? 'rtl' : 'ltr'} style={lang === 'ar' ? { fontFamily: "'Noto Sans Arabic', 'Inter', system-ui, sans-serif" } : undefined}>
        <Navbar />
        <Hero />
        <Features />
        <Templates />
        <AISection />
        <HowItWorks />
        <Pricing />
        <CTABanner />
        <Footer />
      </div>
    </LangContext.Provider>
  );
}
