import { cons, pros } from '../../data/company';
import { SectionCard } from '../common';

export function ProsCons() {
  return (
    <SectionCard id="analysis">
      <div className="pros-cons">
        <div className="pc pc--pros">
          <div className="pc__title">PROS</div>
          <ul>
            {pros.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="pc pc--cons">
          <div className="pc__title">CONS</div>
          <ul>
            {cons.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footnote">* The pros and cons are machine generated. ⓘ</div>
    </SectionCard>
  );
}
