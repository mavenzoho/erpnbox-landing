/**
 * ERPnBox Documentation Screenshot Generator
 *
 * Takes screenshots by navigating the app via UI clicks (not page.goto)
 * because the SPA stores auth in React state, not cookies.
 *
 * Usage:
 *   npx playwright install chromium
 *   ERPNBOX_PASS=xxx npx tsx scripts/take-screenshots.ts
 */

import { chromium, type Page, type Browser } from 'playwright';
import { resolve, dirname, join } from 'path';
import { mkdirSync, readdirSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = process.env.ERPNBOX_URL || 'http://localhost:3000';
const EMAIL = process.env.ERPNBOX_EMAIL || 'tarek@zocube.com';
const PASSWORD = process.env.ERPNBOX_PASS;

if (!PASSWORD) {
  console.error('ERROR: Set ERPNBOX_PASS environment variable');
  process.exit(1);
}

const SCREENSHOT_DIR = resolve(__dirname, '../public/docs/screenshots');
mkdirSync(SCREENSHOT_DIR, { recursive: true });

let successCount = 0;
let failCount = 0;

// ─── Helpers ────────────────────────────────────────────────────────────────────

async function screenshot(page: Page, name: string): Promise<void> {
  try {
    await page.screenshot({ path: join(SCREENSHOT_DIR, `${name}.png`), fullPage: false });
    console.log(`  ✅ ${name}.png`);
    successCount++;
  } catch (e) {
    console.log(`  ❌ ${name} - ${(e as Error).message}`);
    failCount++;
  }
}

async function clickNav(page: Page, text: string): Promise<boolean> {
  try {
    // Try top navbar links first
    const link = page.locator(`nav a:has-text("${text}"), header a:has-text("${text}")`).first();
    if (await link.isVisible({ timeout: 2000 })) {
      await link.click();
      await page.waitForTimeout(4000);
      return true;
    }
  } catch {}
  try {
    // Try any visible link/button with that text
    const el = page.locator(`a:has-text("${text}"), button:has-text("${text}")`).first();
    if (await el.isVisible({ timeout: 2000 })) {
      await el.click();
      await page.waitForTimeout(4000);
      return true;
    }
  } catch {}
  console.log(`  ⚠️  Could not find link: "${text}"`);
  return false;
}

async function clickSettingsCard(page: Page, text: string): Promise<boolean> {
  try {
    // Settings cards are <Link> (rendered as <a>) wrapping a Card with h3.name
    // Try exact h3 match first, then broader link match
    const h3Link = page.locator(`a:has(h3:text("${text}"))`).first();
    if (await h3Link.isVisible({ timeout: 2000 })) {
      await h3Link.click({ timeout: 5000 });
      await page.waitForTimeout(4000);
      return true;
    }
    // Fallback: any link containing the text
    const link = page.locator(`a:has-text("${text}")`).first();
    if (await link.isVisible({ timeout: 2000 })) {
      await link.click({ timeout: 5000 });
      await page.waitForTimeout(4000);
      return true;
    }
  } catch (e) {
    console.log(`  ⚠️  Card click error "${text}": ${(e as Error).message.substring(0, 50)}`);
    return false;
  }
  console.log(`  ⚠️  Could not find settings card: "${text}"`);
  return false;
}

async function goToSettings(page: Page): Promise<void> {
  // Click the gear/settings icon in the top nav
  const gear = page.locator('a[href*="settings"], a[href*="admin/settings"]').first();
  if (await gear.isVisible({ timeout: 3000 }).catch(() => false)) {
    await gear.click();
    await page.waitForTimeout(3000);
    return;
  }
  // Try clicking the gear SVG icon
  const gearIcon = page.locator('header svg, nav svg').locator('..').filter({ hasText: '' });
  const links = await page.locator('a').all();
  for (const link of links) {
    const href = await link.getAttribute('href');
    if (href && (href.includes('settings') || href.includes('admin'))) {
      await link.click();
      await page.waitForTimeout(3000);
      return;
    }
  }
}

async function goToSettingsTab(page: Page, tabName: string): Promise<void> {
  // Settings page has tabs: Platform, Automation, CRM, HRMS, Developer
  const tab = page.locator(`button:has-text("${tabName}"), a:has-text("${tabName}")`).first();
  if (await tab.isVisible({ timeout: 2000 }).catch(() => false)) {
    await tab.click();
    await page.waitForTimeout(3000);
  }
}

async function goBack(page: Page): Promise<void> {
  await page.goBack({ waitUntil: 'domcontentloaded' }).catch(() => {});
  await page.waitForTimeout(2000);
}

// ─── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log('📸 ERPnBox Documentation Screenshot Generator');
  console.log(`   URL: ${BASE_URL}`);
  console.log(`   Output: ${SCREENSHOT_DIR}\n`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  try {
    // ─── Login ────────────────────────────────────────────────────────
    console.log('🔐 Logging in...');
    await page.goto(`${BASE_URL}/login`, { timeout: 30000 });
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    await page.waitForSelector('input[type="email"]', { timeout: 15000 });
    await page.fill('input[type="email"]', EMAIL);
    await page.fill('input[type="password"]', PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForFunction(() => !window.location.pathname.includes('/login'), { timeout: 30000 });
    await page.waitForTimeout(5000);
    console.log(`✅ Logged in (${page.url()})\n`);

    // ─── Dashboard ──────────────────────────────────────────────────
    console.log('📷 Dashboard & Top Nav Pages...\n');
    await screenshot(page, 'dashboard-overview');

    // ─── Leads ──────────────────────────────────────────────────────
    if (await clickNav(page, 'Leads')) {
      await screenshot(page, 'leads');
      await screenshot(page, 'records-list-leads');

      // Click first lead for detail view
      try {
        const firstLead = page.locator('table tbody tr a').first();
        if (await firstLead.isVisible({ timeout: 2000 })) {
          await firstLead.click({ timeout: 5000 });
          await page.waitForTimeout(4000);
          await screenshot(page, 'records-detail');

          // Look for Convert button
          try {
            const convertBtn = page.locator('button:has-text("Convert")').first();
            if (await convertBtn.isVisible({ timeout: 2000 })) {
              await convertBtn.click({ timeout: 5000 });
              await page.waitForTimeout(3000);
              await screenshot(page, 'lead-conversion');
              await page.keyboard.press('Escape');
              await page.waitForTimeout(1000);
            }
          } catch {}
          await goBack(page);
        }
      } catch (e) { console.log(`  ⚠️  Lead detail: ${(e as Error).message.substring(0, 60)}`); }

      // Try to find New Lead button (the prominent green one in top right)
      try {
        const newBtn = page.locator('button:has-text("New Lead")').last();
        if (await newBtn.isVisible({ timeout: 2000 })) {
          await newBtn.click({ timeout: 5000 });
          await page.waitForTimeout(3000);
          await screenshot(page, 'records-create');
          await page.keyboard.press('Escape');
          await page.waitForTimeout(1000);
        }
      } catch (e) { console.log(`  ⚠️  New Lead button: ${(e as Error).message.substring(0, 60)}`); }

      // Try kanban view toggle
      try {
        const viewBtns = page.locator('button svg').locator('..');
        const allBtns = await viewBtns.all();
        for (const btn of allBtns.slice(0, 10)) {
          const title = await btn.getAttribute('title').catch(() => '');
          if (title && title.toLowerCase().includes('kanban')) {
            await btn.click({ timeout: 5000 });
            await page.waitForTimeout(3000);
            await screenshot(page, 'kanban-view');
            break;
          }
        }
      } catch (e) { console.log(`  ⚠️  Kanban: ${(e as Error).message.substring(0, 60)}`); }
    }

    // ─── Deals ──────────────────────────────────────────────────────
    if (await clickNav(page, 'Deals')) {
      await screenshot(page, 'records-list-deals');
      await screenshot(page, 'deals-pipeline');

      // Try kanban
      const kanbanBtn = page.locator('button[title*="Kanban"], button[aria-label*="kanban"], [class*="kanban"]').first();
      if (await kanbanBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        await kanbanBtn.click();
        await page.waitForTimeout(3000);
        await screenshot(page, 'kanban-view');
      }
    }

    // ─── Contacts (via More menu or direct) ─────────────────────────
    if (await clickNav(page, 'TCR') || await clickNav(page, 'Contacts')) {
      await screenshot(page, 'contacts-accounts');
    }

    // ─── Analytics ──────────────────────────────────────────────────
    if (await clickNav(page, 'Analytics')) {
      await screenshot(page, 'analytics-engine');
      await screenshot(page, 'saved-reports');
    }

    // ─── Dashboard (click back) ─────────────────────────────────────
    await clickNav(page, 'Dashboard');
    await screenshot(page, 'kpi-dashboard');

    // ─── Email ──────────────────────────────────────────────────────
    // Try clicking email link or navigate via More menu
    console.log('\n📷 Email...\n');
    if (await clickNav(page, 'Email') || await clickNav(page, 'More')) {
      await page.waitForTimeout(2000);
      if (page.url().includes('email') || await clickNav(page, 'Email')) {
        await screenshot(page, 'email-app');
        await screenshot(page, 'email-accounts');
        await screenshot(page, 'email-crm-link');

        // Try compose
        const composeBtn = page.locator('button:has-text("Compose"), button:has-text("New Email")').first();
        if (await composeBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
          await composeBtn.click();
          await page.waitForTimeout(2000);
          await screenshot(page, 'email-compose');
          await page.keyboard.press('Escape');
        }
      }
    }

    // ─── Settings - Platform Tab ────────────────────────────────────
    console.log('\n📷 Settings - Platform...\n');
    await goToSettings(page);
    await screenshot(page, 'org-settings');

    // Click through Platform settings cards
    const platformCards = [
      ['Company Settings', 'org-settings'],
      ['User Manager', 'users-management'],
      ['Login History', 'login-history'],
      ['Profiles', 'profiles-permissions'],
      ['Teams', 'teams'],
      ['Data Sharing Rules', 'sharing-rules'],
      ['Global Picklists', 'global-picklists'],
      ['Tag Manager', 'tags'],
      ['Module Manager', 'module-designer'],
      ['Navigation', 'navigation-settings'],
      ['Organization', 'departments'],
      ['Notification Settings', 'notification-rules'],
      ['Audit Log', 'audit-log'],
      ['Data Import History', 'import-data'],
    ];

    for (const [cardText, screenshotName] of platformCards) {
      try {
        if (await clickSettingsCard(page, cardText)) {
          await screenshot(page, screenshotName);
          await goBack(page);
          await page.waitForTimeout(1000);
        }
      } catch (e) { console.log(`  ⚠️  ${cardText}: ${(e as Error).message.substring(0, 60)}`); }
    }

    // ─── Settings - Automation Tab ──────────────────────────────────
    console.log('\n📷 Settings - Automation...\n');
    await goToSettings(page);
    await goToSettingsTab(page, 'Automation');
    await screenshot(page, 'workflow-rules');

    const automationCards = [
      ['Workflow Rules', 'workflow-rules'],
      ['Functions', 'custom-functions'],
      ['Scheduler', 'scheduled-actions'],
      ['Automations', 'blueprints'],
      ['Approval & Review', 'approval-processes'],
      ['Escalation Rules', 'escalation-rules'],
      ['Record Locking', 'record-locking'],
      ['Email Templates', 'email-templates'],
      ['Document Templates', 'document-templates'],
      ['Assignment Rules', 'assignment-rules'],
    ];

    for (const [cardText, screenshotName] of automationCards) {
      try {
        if (await clickSettingsCard(page, cardText)) {
          await screenshot(page, screenshotName);
          await goBack(page);
          await page.waitForTimeout(1000);
          await goToSettingsTab(page, 'Automation');
          await page.waitForTimeout(1000);
        }
      } catch (e) { console.log(`  ⚠️  ${cardText}: ${(e as Error).message.substring(0, 60)}`); }
    }

    // ─── Settings - CRM Tab ─────────────────────────────────────────
    console.log('\n📷 Settings - CRM...\n');
    await goToSettings(page);
    await goToSettingsTab(page, 'CRM');

    const crmCards = [
      ['Lead Conversion', 'lead-conversion'],
      ['SocialSync', 'social-sync'],
      ['KPIs', 'kpi-manager'],
      ['Scoring Rules', 'scoring-rules'],
    ];

    for (const [cardText, screenshotName] of crmCards) {
      try {
        if (await clickSettingsCard(page, cardText)) {
          await screenshot(page, screenshotName);
          await goBack(page);
          await page.waitForTimeout(1000);
          await goToSettingsTab(page, 'CRM');
          await page.waitForTimeout(1000);
        }
      } catch (e) { console.log(`  ⚠️  ${cardText}: ${(e as Error).message.substring(0, 60)}`); }
    }

    // ─── Settings - HRMS Tab ────────────────────────────────────────
    console.log('\n📷 Settings - HRMS...\n');
    await goToSettings(page);
    await goToSettingsTab(page, 'HRMS');

    const hrmsCards = [
      ['Leave Policy', 'leave-management'],
      ['Attendance Settings', 'attendance'],
      ['Shift Settings', 'shifts'],
      ['Payroll Settings', 'payroll'],
      ['Pay Runs', 'pay-runs'],
      ['Loans', 'loans'],
      ['Employee Compensation', 'employee-compensation'],
      ['Compensation Templates', 'compensation-templates'],
      ['Salary Revisions', 'salary-revisions'],
      ['Bonus & Misconduct', 'bonus-misconduct'],
      ['Leave Balances', 'leave-balances'],
      ['Holiday Calendar', 'work-calendar'],
    ];

    for (const [cardText, screenshotName] of hrmsCards) {
      try {
        if (await clickSettingsCard(page, cardText)) {
          await screenshot(page, screenshotName);
          await goBack(page);
          await page.waitForTimeout(1000);
          await goToSettingsTab(page, 'HRMS');
          await page.waitForTimeout(1000);
        }
      } catch (e) { console.log(`  ⚠️  ${cardText}: ${(e as Error).message.substring(0, 60)}`); }
    }

    // ─── Settings - Developer Tab ───────────────────────────────────
    console.log('\n📷 Settings - Developer...\n');
    await goToSettings(page);
    await goToSettingsTab(page, 'Developer');

    const devCards = [
      ['API Keys', 'api-keys'],
      ['API Documentation', 'api-docs'],
      ['Channels', 'webhooks-guide'],
    ];

    for (const [cardText, screenshotName] of devCards) {
      try {
        if (await clickSettingsCard(page, cardText)) {
          await screenshot(page, screenshotName);
          await goBack(page);
          await page.waitForTimeout(1000);
          await goToSettingsTab(page, 'Developer');
          await page.waitForTimeout(1000);
        }
      } catch (e) { console.log(`  ⚠️  ${cardText}: ${(e as Error).message.substring(0, 60)}`); }
    }

    // ─── Global Search ──────────────────────────────────────────────
    console.log('\n📷 Global Search...\n');
    await clickNav(page, 'Dashboard');
    await page.waitForTimeout(2000);
    try {
      await page.keyboard.press('Control+k');
      await page.waitForTimeout(1000);
      await page.keyboard.type('test', { delay: 100 });
      await page.waitForTimeout(2000);
      await screenshot(page, 'global-search');
      await page.keyboard.press('Escape');
    } catch (e) {
      console.log(`  ⚠️  Global search failed: ${(e as Error).message}`);
    }

    // ─── App Marketplace ────────────────────────────────────────────
    console.log('\n📷 Marketplace...\n');
    await goToSettings(page);
    if (await clickSettingsCard(page, 'Application')) {
      await screenshot(page, 'app-marketplace');
    }

  } catch (error) {
    console.error('\n❌ Fatal error:', (error as Error).message);
  } finally {
    await browser.close();

    // Generate index
    const screenshots = readdirSync(SCREENSHOT_DIR).filter(f => f.endsWith('.png') && !f.startsWith('test-'));
    const indexContent = `# Documentation Screenshots\n\nGenerated: ${new Date().toISOString()}\nTotal: ${screenshots.length} screenshots\n\n${screenshots.sort().map(f => `- ![${f}](screenshots/${f})`).join('\n')}\n`;
    writeFileSync(join(SCREENSHOT_DIR, '..', 'SCREENSHOTS.md'), indexContent);

    console.log(`\n✨ Done! ${successCount} succeeded, ${failCount} failed`);
    console.log(`   Screenshots saved to: ${SCREENSHOT_DIR}`);
  }
}

main();
