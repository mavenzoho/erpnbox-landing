export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 mb-8"
        >
          &larr; Back to ERPnBox
        </a>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: March 25, 2026</p>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              ERPnBox ("we," "our," or "us") operates the ERPnBox platform, a cloud-based Customer
              Relationship Management (CRM) and Enterprise Resource Planning (ERP) solution. This
              Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you use our platform, including our website, applications, and integrations with
              third-party services such as Meta (Facebook/Instagram).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              2. Information We Collect
            </h2>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">2.1 Account Information</h3>
            <p className="text-gray-700 leading-relaxed">
              When you register for an ERPnBox account, we collect your name, email address, company
              name, and other information you provide during registration.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">2.2 CRM Data</h3>
            <p className="text-gray-700 leading-relaxed">
              Data you enter into ERPnBox modules (contacts, leads, deals, activities, etc.) is
              stored securely within your tenant-isolated environment. This data belongs to you and
              is processed solely to provide our services.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
              2.3 Social Media Integration Data (SocialSync)
            </h3>
            <p className="text-gray-700 leading-relaxed">
              When you connect your Facebook Pages through our SocialSync feature, we collect:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Facebook Page IDs and names you choose to connect</li>
              <li>Page access tokens (securely stored and encrypted) to retrieve lead data</li>
              <li>
                Lead form submissions from Facebook/Instagram Lead Ads, including names, email
                addresses, phone numbers, and other fields submitted by leads
              </li>
              <li>Form metadata (form IDs, form names)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-2">
              We access this data only through permissions you explicitly grant via the Facebook
              OAuth authorization flow. We do not access any data beyond what is required for the
              lead synchronization functionality.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">2.4 Usage and Log Data</h3>
            <p className="text-gray-700 leading-relaxed">
              We automatically collect certain information when you use our platform, including IP
              addresses, browser type, pages visited, and actions taken within the application. This
              data is used for security, analytics, and service improvement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Provide, maintain, and improve the ERPnBox platform</li>
              <li>Synchronize leads from Facebook/Instagram Lead Ads into your CRM</li>
              <li>Process and assign leads based on your configured rules</li>
              <li>Send system notifications, account updates, and security alerts</li>
              <li>Provide customer support</li>
              <li>Ensure the security and integrity of our platform</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              4. Data Sharing and Disclosure
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We do <strong>not</strong> sell, rent, or share your personal data or CRM data with
              third parties for their marketing purposes. We may share data only in the following
              circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>
                <strong>Service Providers:</strong> With trusted third-party providers who help us
                operate our platform (hosting, email delivery, analytics), under strict data
                processing agreements.
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law, court order, or
                governmental authority.
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a merger, acquisition, or
                sale of assets, with notice to affected users.
              </li>
              <li>
                <strong>With Your Consent:</strong> When you explicitly authorize sharing.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              5. Meta (Facebook) Platform Data
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our use of information received from Meta APIs adheres to the{' '}
              <a
                href="https://developers.facebook.com/terms/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:underline"
              >
                Meta Platform Terms
              </a>{' '}
              and{' '}
              <a
                href="https://developers.facebook.com/devpolicy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:underline"
              >
                Developer Policies
              </a>
              . Specifically:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>We only request permissions necessary for lead synchronization functionality</li>
              <li>
                Data obtained from Meta is used solely to sync leads into your CRM and is not used
                for any other purpose
              </li>
              <li>
                We do not transfer Meta data to third parties, including data brokers or advertising
                networks
              </li>
              <li>
                We do not use Meta data for purposes unrelated to the core functionality of our app
              </li>
              <li>
                You can disconnect your Facebook Pages at any time from Settings &gt; SocialSync,
                which revokes our access
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">6. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement industry-standard security measures to protect your data, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Encryption of data in transit (TLS/SSL) and sensitive data at rest</li>
              <li>Tenant-level data isolation — each organization's data is logically separated</li>
              <li>Role-based access controls and authentication via JWT tokens</li>
              <li>Regular security audits and monitoring</li>
              <li>Secure storage of access tokens and API credentials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">7. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your data for as long as your account is active or as needed to provide our
              services. CRM data is retained within your tenant environment until you delete it or
              close your account. Sync logs from SocialSync are retained for audit purposes and can
              be viewed in the SocialSync Dashboard. Upon account termination, all tenant data is
              permanently deleted within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">8. User Data Deletion</h2>
            <p className="text-gray-700 leading-relaxed">
              You have the right to request deletion of your data at any time. To request data
              deletion:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>
                <strong>Disconnect Facebook:</strong> Go to Settings &gt; SocialSync and click
                "Disconnect" to remove your Facebook connection and associated sync data.
              </li>
              <li>
                <strong>Delete Account:</strong> Contact us at{' '}
                <a href="mailto:support@erpnbox.com" className="text-brand-600 hover:underline">
                  support@erpnbox.com
                </a>{' '}
                to request full account and data deletion.
              </li>
              <li>
                <strong>Delete Specific Records:</strong> Use the CRM interface to delete individual
                records at any time.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-2">
              We will process deletion requests within 30 days and confirm completion via email.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">9. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Data portability — receive your data in a structured, machine-readable format</li>
              <li>Withdraw consent at any time for consent-based processing</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-2">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:support@erpnbox.com" className="text-brand-600 hover:underline">
                support@erpnbox.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">10. Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              We use essential cookies and local storage for authentication (JWT tokens) and user
              preferences (theme, navigation order). We do not use third-party tracking cookies or
              advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              11. Children's Privacy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              ERPnBox is a business application not intended for use by individuals under the age of
              16. We do not knowingly collect personal information from children. If we learn that
              we have collected data from a child, we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              12. Changes to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material
              changes by posting the updated policy on this page and updating the "Last updated"
              date. Your continued use of ERPnBox after changes constitutes acceptance of the
              updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">13. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please
              contact us:
            </p>
            <ul className="list-none pl-0 text-gray-700 space-y-1 mt-2">
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:support@erpnbox.com" className="text-brand-600 hover:underline">
                  support@erpnbox.com
                </a>
              </li>
              <li>
                <strong>Website:</strong>{' '}
                <a href="https://erpnbox.com" className="text-brand-600 hover:underline">
                  erpnbox.com
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ERPnBox. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 mb-8"
        >
          &larr; Back to ERPnBox
        </a>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: March 25, 2026</p>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using ERPnBox ("the Platform"), operated by ERPnBox ("we," "our," or
              "us"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree,
              you may not use the Platform. These Terms apply to all users, including
              administrators, team members, and any person accessing the Platform on behalf of an
              organization.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              2. Description of Service
            </h2>
            <p className="text-gray-700 leading-relaxed">
              ERPnBox is a cloud-based Customer Relationship Management (CRM) and Enterprise
              Resource Planning (ERP) platform that provides tools for managing contacts, leads,
              deals, activities, workflows, reporting, and third-party integrations including social
              media lead synchronization (SocialSync). The Platform is provided as a
              Software-as-a-Service (SaaS) solution.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              3. Account Registration
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                You must provide accurate, complete, and current information when creating an
                account.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your login credentials
                and for all activities that occur under your account.
              </li>
              <li>You must notify us immediately of any unauthorized use of your account.</li>
              <li>You must be at least 16 years of age to use the Platform.</li>
              <li>
                Each organization (tenant) operates in an isolated environment. The account
                administrator is responsible for managing users, roles, and permissions within their
                organization.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">4. Acceptable Use</h2>
            <p className="text-gray-700 leading-relaxed">You agree not to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>
                Use the Platform for any unlawful purpose or in violation of any applicable laws
              </li>
              <li>Attempt to gain unauthorized access to other users' accounts or data</li>
              <li>Upload malicious code, viruses, or harmful content</li>
              <li>Interfere with or disrupt the Platform's infrastructure or services</li>
              <li>Use the Platform to send spam, unsolicited communications, or bulk messages</li>
              <li>Reverse engineer, decompile, or disassemble any part of the Platform</li>
              <li>
                Resell, sublicense, or redistribute access to the Platform without authorization
              </li>
              <li>
                Use data obtained through third-party integrations (e.g., Facebook Lead Ads) for
                purposes other than your legitimate business operations within the Platform
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">5. Your Data</h2>
            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">5.1 Ownership</h3>
            <p className="text-gray-700 leading-relaxed">
              You retain full ownership of all data you enter into the Platform ("Your Data"),
              including CRM records, contacts, leads, documents, and any data synced from
              third-party services. We do not claim any ownership rights over Your Data.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">5.2 License to Us</h3>
            <p className="text-gray-700 leading-relaxed">
              You grant us a limited, non-exclusive license to process, store, and transmit Your
              Data solely for the purpose of providing and improving the Platform services. This
              license ends when you delete Your Data or terminate your account.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">5.3 Data Isolation</h3>
            <p className="text-gray-700 leading-relaxed">
              Each organization's data is logically isolated at the tenant level. Your Data is not
              accessible to other organizations using the Platform.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">5.4 Backups and Export</h3>
            <p className="text-gray-700 leading-relaxed">
              While we maintain regular backups of the Platform, you are responsible for maintaining
              your own backups of critical data. You may export Your Data at any time through the
              Platform's export features or API.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              6. Third-Party Integrations
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The Platform offers integrations with third-party services, including but not limited
              to Meta (Facebook/Instagram) for lead synchronization. When you enable these
              integrations:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>
                You authorize us to access and retrieve data from those services on your behalf
              </li>
              <li>
                You are responsible for complying with the third party's terms of service and
                policies
              </li>
              <li>
                We are not responsible for the availability, accuracy, or practices of third-party
                services
              </li>
              <li>You can disconnect third-party integrations at any time from your Settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              7. Intellectual Property
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The Platform, including its source code, design, features, documentation, and
              branding, is the intellectual property of ERPnBox and is protected by copyright,
              trademark, and other intellectual property laws. These Terms do not grant you any
              rights to use our trademarks, logos, or brand assets without prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              8. Service Availability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We strive to maintain high availability of the Platform but do not guarantee
              uninterrupted or error-free service. We may perform scheduled maintenance with
              reasonable advance notice. We are not liable for any downtime, data loss, or service
              interruptions caused by factors beyond our reasonable control, including third-party
              service outages, network failures, or force majeure events.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              9. Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To the maximum extent permitted by law, ERPnBox shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages, including but not limited to
              loss of profits, data, business opportunities, or goodwill, arising from your use of
              or inability to use the Platform. Our total liability for any claim arising from these
              Terms or your use of the Platform shall not exceed the amount you paid to us in the
              twelve (12) months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              10. Disclaimer of Warranties
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The Platform is provided "as is" and "as available" without warranties of any kind,
              whether express or implied, including but not limited to implied warranties of
              merchantability, fitness for a particular purpose, and non-infringement. We do not
              warrant that the Platform will meet your specific requirements or that it will be free
              of errors or security vulnerabilities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">11. Termination</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                You may terminate your account at any time by contacting us at{' '}
                <a href="mailto:support@erpnbox.com" className="text-brand-600 hover:underline">
                  support@erpnbox.com
                </a>
                .
              </li>
              <li>
                We may suspend or terminate your account if you violate these Terms, engage in
                abusive behavior, or fail to pay applicable fees.
              </li>
              <li>
                Upon termination, your access to the Platform will cease and Your Data will be
                permanently deleted within 30 days, unless retention is required by law.
              </li>
              <li>
                Sections regarding intellectual property, limitation of liability, and dispute
                resolution survive termination.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">12. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify you of material
              changes by posting the updated Terms on this page and updating the "Last updated"
              date. Your continued use of the Platform after changes constitutes acceptance of the
              revised Terms. If you do not agree with the changes, you must stop using the Platform
              and terminate your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">13. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the
              jurisdiction in which ERPnBox operates, without regard to conflict of law principles.
              Any disputes arising from these Terms shall be resolved through good-faith
              negotiation, and if unresolved, through binding arbitration or the courts of competent
              jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">14. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <ul className="list-none pl-0 text-gray-700 space-y-1 mt-2">
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:support@erpnbox.com" className="text-brand-600 hover:underline">
                  support@erpnbox.com
                </a>
              </li>
              <li>
                <strong>Website:</strong>{' '}
                <a href="https://erpnbox.com" className="text-brand-600 hover:underline">
                  erpnbox.com
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ERPnBox. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export function DataDeletion() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 mb-8"
        >
          &larr; Back to ERPnBox
        </a>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Data Deletion</h1>
        <p className="text-sm text-gray-500 mb-8">Facebook Data Deletion Instructions</p>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              How to Delete Your Data
            </h2>
            <p className="text-gray-700 leading-relaxed">
              ERPnBox allows you to delete data associated with your Facebook connection at any
              time. When you disconnect your Facebook Page from ERPnBox, we remove all associated
              connection data, access tokens, and sync configurations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              Option 1: Disconnect from ERPnBox
            </h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>Log in to your ERPnBox account</li>
              <li>
                Navigate to <strong>Settings &gt; SocialSync</strong>
              </li>
              <li>
                Click <strong>"Disconnect"</strong> next to the Facebook Page you want to remove
              </li>
              <li>
                This will immediately delete:
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li>Your Facebook Page connection and access tokens</li>
                  <li>All field mapping configurations for that Page</li>
                  <li>Webhook subscriptions for that Page</li>
                </ul>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              Option 2: Remove from Facebook
            </h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>
                Go to your{' '}
                <a
                  href="https://www.facebook.com/settings?tab=business_tools"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:underline"
                >
                  Facebook Settings &gt; Business Integrations
                </a>
              </li>
              <li>Find "ERPnBox" in the list of apps</li>
              <li>Click "Remove" to revoke all permissions</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              Option 3: Request Full Deletion
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To request complete deletion of all your data from ERPnBox, including your account,
              CRM records, and all associated data, please contact us:
            </p>
            <ul className="list-none pl-0 text-gray-700 space-y-1 mt-2">
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:support@erpnbox.com" className="text-brand-600 hover:underline">
                  support@erpnbox.com
                </a>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-2">
              We will process your deletion request within 30 days and send a confirmation email
              upon completion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              What Data Do We Store?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              When you connect a Facebook Page through SocialSync, we store:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Facebook Page ID and name</li>
              <li>Page access token (encrypted)</li>
              <li>Lead form field mappings you configure</li>
              <li>Lead data synced from Facebook Lead Ads (names, emails, phone numbers, etc.)</li>
              <li>Sync logs (timestamps, status, error messages)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-2">
              All data is stored in your isolated tenant environment and is not shared with other
              users or third parties.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ERPnBox. All rights reserved.
        </div>
      </div>
    </div>
  );
}
