import { announcements, annualReports, concalls } from '../../data/company';
import { SectionCard } from '../common';

const ANNOUNCEMENT_TABS = ['Recent', 'Important', 'Search'];
const CONCALL_LINKS = ['Transcript', 'AI Summary', 'PPT'];

export function Documents() {
  return (
    <SectionCard id="docs">
      <h2 className="section-title section-title--spaced">Documents</h2>
      <div className="docs">
        <div className="doc-card">
          <div className="doc-tabs">
            {ANNOUNCEMENT_TABS.map((tab, i) => (
              <span key={tab} className={i === 0 ? 'is-active' : undefined}>
                {tab}
              </span>
            ))}
          </div>
          {announcements.map((item) => (
            <div key={item.title}>
              <a href="#docs" className="doc-link">
                {item.title}
              </a>
              <p className="doc-summary">{item.summary}</p>
            </div>
          ))}
        </div>

        <div className="doc-card doc-card--list">
          {annualReports.map((year) => (
            <div key={year}>
              <a href="#docs" className="doc-link">
                Annual Report {year}
              </a>
              <div className="doc-source">from bse</div>
            </div>
          ))}
        </div>

        <div className="doc-card doc-card--concalls">
          {concalls.map((month) => (
            <div key={month} className="concall">
              <span className="concall__date">{month}</span>
              <span className="concall__links">
                {CONCALL_LINKS.map((link) => (
                  <a key={link} href="#docs" className="concall__link">
                    {link}
                  </a>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
