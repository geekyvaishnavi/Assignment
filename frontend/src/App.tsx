import { useCallback, useState } from 'react';
import { CompanyHero } from './components/CompanyHero';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { PageNav } from './components/PageNav';
import { Documents } from './components/sections/Documents';
import { BalanceSheet, CashFlows, ProfitLoss, QuarterlyResults, Ratios, Shareholding } from './components/sections/Financials';
import { Overview } from './components/sections/Overview';
import { PeerComparison } from './components/sections/PeerComparison';
import { PriceChart } from './components/sections/PriceChart';
import { ProsCons } from './components/sections/ProsCons';
import { sectionIds } from './data/company';
import { useActiveSection } from './hooks/useActiveSection';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { resolved, setMode } = useTheme('light');
  const activeSection = useActiveSection(sectionIds);
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const isDark = resolved === 'dark';

  return (
    <div className="app">
      <Header isDark={isDark} onToggleTheme={() => setMode(isDark ? 'light' : 'dark')} onGetStarted={openModal} />

      <main id="top" className="page">
        <CompanyHero onFollow={openModal} />

        <div className="layout">
          <PageNav activeId={activeSection} onOpenAccount={openModal} />
          <div className="sections">
            <Overview />
            <PriceChart />
            <ProsCons />
            <PeerComparison />
            <QuarterlyResults />
            <ProfitLoss />
            <BalanceSheet />
            <CashFlows />
            <Ratios />
            <Shareholding />
            <Documents />
          </div>
        </div>
      </main>

      <Footer />
      <OnboardingModal open={modalOpen} onClose={closeModal} />
    </div>
  );
}
