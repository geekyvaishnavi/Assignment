import { Fragment, type ReactNode } from 'react';
import { Logo } from './common';

const STATUS: { label: string; value: ReactNode }[] = [
  {
    label: 'Market status',
    value: (
      <>
        <span className="status-dot status-dot--closed" aria-hidden="true" />
        Closed · opens{' '}
        <time className="num" dateTime="09:15">
          9:15
        </time>{' '}
        IST
      </>
    ),
  },
  {
    label: 'Prices as of',
    value: (
      <time className="num" dateTime="2026-09-11T15:30+05:30">
        11 Sep 2026 · 15:30
      </time>
    ),
  },
  { label: 'Financials', value: 'Consolidated · FY2026' },
  { label: 'Source', value: 'C-MOTS · BSE · NSE' },
];

const LINK_COLUMNS = [
  { label: 'Product', links: ['Premium', 'Screens', 'Support'] },
  { label: 'Legal', links: ['Terms', 'Privacy', 'Disclaimer'] },
];

const LEGAL = ['Revamp © 2026', 'Made in India', 'Data by C-MOTS Internet Technologies Pvt Ltd'];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <dl className="footer-status" aria-label="Data status">
          {STATUS.map((item) => (
            <div key={item.label} className="footer-status__cell">
              <dt className="footer-status__label">{item.label}</dt>
              <dd className="footer-status__value">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="footer-main">
          <div className="footer-main__about">
            <Logo height={20} />
            <p className="footer-disclaimer">
              Nothing on this page is investment advice. Figures come from company filings and may be restated — verify them
              against the original annual report before acting on them.
            </p>
          </div>
          <div className="footer-nav">
            {LINK_COLUMNS.map((column) => (
              <nav key={column.label} aria-label={column.label}>
                <ul>
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#top">{link}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <p className="footer-legal">
          {LEGAL.map((part, i) => (
            <Fragment key={part}>
              {i > 0 && <span aria-hidden="true">·</span>}
              <span>{part}</span>
            </Fragment>
          ))}
        </p>
      </div>
    </footer>
  );
}
