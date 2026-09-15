import { useState } from 'react';
import { SectionCard, Segmented } from '../common';
import { Icon } from '../Icon';

const RANGES = ['1M', '6M', '1Yr', '3Yr', '5Yr', '10Yr', 'Max'] as const;
type Range = (typeof RANGES)[number];

const METRICS = ['Price', 'PE Ratio'] as const;
type Metric = (typeof METRICS)[number];

const SERIES = ['Price on NSE', '50 DMA', '200 DMA', 'Volume'] as const;
type Series = (typeof SERIES)[number];

export function PriceChart() {
  const [range, setRange] = useState<Range>('5Yr');
  const [metric, setMetric] = useState<Metric>('Price');
  const [shown, setShown] = useState<Record<Series, boolean>>({
    'Price on NSE': true,
    '50 DMA': false,
    '200 DMA': false,
    Volume: true,
  });

  const toggle = (series: Series) => setShown((prev) => ({ ...prev, [series]: !prev[series] }));

  return (
    <SectionCard id="chart">
      <div className="toolbar">
        <Segmented label="Chart range" options={RANGES} value={range} onChange={setRange} />
        <div className="toolbar__group">
          <Segmented label="Chart metric" options={METRICS} value={metric} onChange={setMetric}>
            <button type="button">
              More <Icon name="chevron-down" />
            </button>
          </Segmented>
          <button type="button" className="chip">
            <Icon name="bell" /> Alerts
          </button>
        </div>
      </div>

      <div className="chart">
        <img
          className="chart__image"
          src="/graph.png"
          alt="Price on NSE and volume chart, Oct 2021 to Sep 2026"
          width={2494}
          height={750}
        />
      </div>

      <div className="chart-legend">
        {SERIES.map((series) => (
          <button
            key={series}
            type="button"
            className={shown[series] ? 'is-on' : undefined}
            aria-pressed={shown[series]}
            onClick={() => toggle(series)}
          >
            <Icon name={shown[series] ? 'check-square' : 'square'} /> {series}
          </button>
        ))}
      </div>
    </SectionCard>
  );
}
