import type { ReactNode } from 'react';
import type { DataTable } from '../data/company';

export function Logo({ height }: { height: number }) {
  return (
    <>
      <img className="logo logo--light" src="/screener-logo.png" alt="screener" style={{ height }} />
      <img className="logo logo--dark" src="/screener-logo-dark.png" alt="screener" style={{ height }} />
    </>
  );
}

export function SectionCard({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="card">
      {children}
    </section>
  );
}

interface SectionHeadProps {
  title: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
}

export function SectionHead({ title, subtitle, actions }: SectionHeadProps) {
  return (
    <div className="section-head">
      <div>
        <h2 className="section-title">{title}</h2>
        {subtitle && <div className="section-sub">{subtitle}</div>}
      </div>
      {actions && <div className="section-actions">{actions}</div>}
    </div>
  );
}

export function ActionButton({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  return (
    <button type="button" className={compact ? 'action action--compact' : 'action'}>
      {children}
    </button>
  );
}

interface SegmentedProps<T extends string> {
  label: string;
  options: readonly T[];
  value: T;
  /** Without a handler the control renders as a static indicator. */
  onChange?: (value: T) => void;
  compact?: boolean;
  children?: ReactNode;
}

export function Segmented<T extends string>({ label, options, value, onChange, compact = false, children }: SegmentedProps<T>) {
  return (
    <div className={compact ? 'segmented segmented--compact' : 'segmented'} role="group" aria-label={label}>
      {options.map((option) => {
        const className = option === value ? 'is-active' : undefined;
        return onChange ? (
          <button key={option} type="button" className={className} aria-pressed={option === value} onClick={() => onChange(option)}>
            {option}
          </button>
        ) : (
          <span key={option} className={className}>
            {option}
          </span>
        );
      })}
      {children}
    </div>
  );
}

export function FinancialTable({ table, anchor }: { table: DataTable; anchor: string }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th />
            {table.columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.label} className={row.strong ? 'row-strong' : undefined}>
              <td className={row.muted ? 'cell-muted' : undefined}>
                {row.label}
                {row.expandable && (
                  <>
                    {' '}
                    <a href={`#${anchor}`} aria-label={`Expand ${row.label}`}>
                      +
                    </a>
                  </>
                )}
              </td>
              {row.values.map((value, i) => (
                <td key={table.columns[i]}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
