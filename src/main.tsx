import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import DocsPage from './DocsPage';
import HelpCenter from './HelpCenter';
import {
  CrmFeaturePage,
  AutomationFeaturePage,
  AnalyticsFeaturePage,
  HrmsFeaturePage,
  SecurityFeaturePage,
  SupportPage,
} from './FeaturePages';
import { PrivacyPolicy, TermsOfService, DataDeletion } from './LegalPages';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/developers" element={<DocsPage />} />
        <Route path="/docs" element={<HelpCenter />} />
        <Route path="/features/crm" element={<CrmFeaturePage />} />
        <Route path="/features/automation" element={<AutomationFeaturePage />} />
        <Route path="/features/analytics" element={<AnalyticsFeaturePage />} />
        <Route path="/features/hrms" element={<HrmsFeaturePage />} />
        <Route path="/features/security" element={<SecurityFeaturePage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/data-deletion" element={<DataDeletion />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
