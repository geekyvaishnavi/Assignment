import type { ReactNode } from 'react';
import {
  balanceSheet,
  cashFlows,
  growthCards,
  profitAndLoss,
  quarterlyResults,
  ratios,
  shareholding,
  type DataTable,
} from '../../data/company';
import { ActionButton, FinancialTable, SectionCard, SectionHead, Segmented } from '../common';
import { Icon } from '../Icon';

interface FinancialSectionProps {
  id: string;
  title: string;
  subtitle: ReactNode;
  actions?: ReactNode;
  table: DataTable;
  children?: ReactNode;
}

function FinancialSection({ id, title, subtitle, actions, table, children }: FinancialSectionProps) {
  return (
    <SectionCard id={id}>
      <SectionHead title={title} subtitle={subtitle} actions={actions} />
      <FinancialTable table={table} anchor={id} />
      {children}
    </SectionCard>
  );
}

function ConsolidatedNote({ id }: { id: string }) {
  return (
    <>
      Consolidated Figures in Rs. Crores / <a href={`#${id}`}>View Standalone</a>
    </>
  );
}

export function QuarterlyResults() {
  return (
    <FinancialSection
      id="quarters"
      title="Quarterly Results"
      subtitle={<ConsolidatedNote id="quarters" />}
      actions={
        <ActionButton>
          <Icon name="pie-chart" /> PRODUCT SEGMENTS
        </ActionButton>
      }
      table={quarterlyResults}
    />
  );
}

export function ProfitLoss() {
  return (
    <FinancialSection
      id="pl"
      title="Profit & Loss"
      subtitle={<ConsolidatedNote id="pl" />}
      actions={
        <>
          <ActionButton>
            <Icon name="list" /> RELATED PARTY
          </ActionButton>
          <ActionButton>
            <Icon name="pie-chart" /> PRODUCT SEGMENTS
          </ActionButton>
        </>
      }
      table={profitAndLoss}
    >
      <div className="growth">
        {growthCards.map((card) => (
          <div key={card.title} className="growth-card">
            <div className="growth-card__title">{card.title}</div>
            <dl>
              {card.rows.map(([period, value]) => (
                <div key={period} className="growth-card__row">
                  <dt>{period}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </FinancialSection>
  );
}

export function BalanceSheet() {
  return (
    <FinancialSection
      id="bs"
      title="Balance Sheet"
      subtitle={<ConsolidatedNote id="bs" />}
      actions={<ActionButton>CORPORATE ACTIONS</ActionButton>}
      table={balanceSheet}
    />
  );
}

export function CashFlows() {
  return <FinancialSection id="cf" title="Cash Flows" subtitle={<ConsolidatedNote id="cf" />} table={cashFlows} />;
}

export function Ratios() {
  return <FinancialSection id="ratios" title="Ratios" subtitle={<ConsolidatedNote id="ratios" />} table={ratios} />;
}

export function Shareholding() {
  return (
    <FinancialSection
      id="investors"
      title="Shareholding Pattern"
      subtitle="Numbers in percentages"
      actions={
        <>
          <Segmented label="Shareholding period" options={['Quarterly', 'Yearly']} value="Quarterly" compact />
          <ActionButton compact>TRADES</ActionButton>
        </>
      }
      table={shareholding}
    />
  );
}
