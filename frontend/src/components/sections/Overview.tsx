import { company } from '../../data/company';
import { SectionCard } from '../common';
import { Icon } from '../Icon';

export function Overview() {
  return (
    <SectionCard id="overview">
      <div className="overview">
        <div>
          <div className="eyebrow">About</div>
          <p className="overview__about">{company.about}</p>
          <div className="tags">
            {company.indices.map((index) => (
              <span key={index} className="tag">
                {index}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="eyebrow">Key points</div>
          <div className="overview__point-title">{company.keyPoint.title}</div>
          <p className="overview__point">{company.keyPoint.text}</p>
          <div className="stats">
            {company.ttm.map((stat) => (
              <div key={stat.label}>
                <div className="stat__label">{stat.label}</div>
                <div className="stat__value">{stat.value}</div>
              </div>
            ))}
          </div>
          <a href="#analysis" className="overview__more">
            Read the full analysis <Icon name="arrow-right" />
          </a>
        </div>
      </div>
    </SectionCard>
  );
}
