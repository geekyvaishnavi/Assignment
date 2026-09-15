import { Fragment } from 'react';
import { company, keyRatios } from '../data/company';
import { Icon } from './Icon';

export function CompanyHero({ onFollow }: { onFollow: () => void }) {
  const lastCrumb = company.breadcrumb.length - 1;

  return (
    <>
      <section className="hero">
        <div>
          <div className="breadcrumb">
            {company.breadcrumb.map((crumb, i) => (
              <Fragment key={crumb}>
                {i > 0 && <span className="breadcrumb__sep">/</span>}
                <span className={i === lastCrumb ? 'breadcrumb__current' : undefined}>{crumb}</span>
              </Fragment>
            ))}
          </div>
          <h1 className="hero__title">{company.name}</h1>
          <div className="hero__links">
            <a href="#top">
              {company.website} <Icon name="external-link" />
            </a>
            <span className="hero__divider">|</span>
            <a href="#top">BSE: {company.bseCode}</a>
            <a href="#top">NSE: {company.nseCode}</a>
            <span className="hero__divider">|</span>
            <span className="hero__meta">Consolidated</span>
          </div>
        </div>

        <div className="hero__quote">
          <div>
            <div className="price">
              <span className="price__value">{company.price}</span>
              <span className={company.changeIsDown ? 'price__change price__change--down' : 'price__change'}>{company.change}</span>
            </div>
            <div className="price__note">{company.priceNote}</div>
          </div>
          <div className="hero__buttons">
            <button type="button" className="btn-secondary">
              Export
            </button>
            <button type="button" className="btn-outline" onClick={onFollow}>
              Follow
            </button>
          </div>
        </div>
      </section>

      <section className="ratios" aria-label="Key ratios">
        <div className="ratios__grid">
          {keyRatios.map((ratio) => (
            <div key={ratio.label} className="ratio">
              <div className="ratio__label">{ratio.label}</div>
              <div className="ratio__value">
                {ratio.prefix && (
                  <>
                    <span className="ratio__unit ratio__unit--prefix">{ratio.prefix}</span>{' '}
                  </>
                )}
                {ratio.value}
                {ratio.suffix && (
                  <>
                    {' '}
                    <span className="ratio__unit">{ratio.suffix}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
