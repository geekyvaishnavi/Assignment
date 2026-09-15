import type { IconName } from '../components/Icon';

export interface TableRow {
  label: string;
  values: string[];
  /** Shows a "+" breakdown link after the label. */
  expandable?: boolean;
  strong?: boolean;
  muted?: boolean;
}

export interface DataTable {
  columns: string[];
  rows: TableRow[];
}

export interface KeyRatio {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
}

export interface GrowthCard {
  title: string;
  rows: [period: string, value: string][];
}

/** Splits a whitespace-separated row of cells; `_` marks an empty cell. */
const cells = (row: string) =>
  row.trim().split(/\s+/).map((cell) => (cell === '_' ? '' : cell));

const annualColumns = Array.from({ length: 12 }, (_, i) => `Mar ${2015 + i}`);

export const sectionLinks = [
  { id: 'overview', label: 'Overview' },
  { id: 'chart', label: 'Chart' },
  { id: 'analysis', label: 'Analysis' },
  { id: 'peers', label: 'Peers' },
  { id: 'quarters', label: 'Quarterly results' },
  { id: 'pl', label: 'Profit & Loss' },
  { id: 'bs', label: 'Balance sheet' },
  { id: 'cf', label: 'Cash flows' },
  { id: 'ratios', label: 'Ratios' },
  { id: 'investors', label: 'Shareholding' },
  { id: 'docs', label: 'Documents' },
] as const;

export const sectionIds: readonly string[] = sectionLinks.map((link) => link.id);

export const company = {
  name: 'PTC India Ltd',
  breadcrumb: ['Utilities', 'Power', 'Power Trading'],
  website: 'ptcindia.com',
  bseCode: '532524',
  nseCode: 'PTC',
  price: '₹153',
  change: '−0.59%',
  changeIsDown: true,
  priceNote: '11 Sep · close price · NSE',
  about:
    'PTC India Limited was established in 1999 by the Government of India as a Public-Private Initiative and is in the power trading business. It is promoted by Power Grid Corporation of India, NTPC, Power Finance Corporation and NHPC.',
  indices: ['Nifty Total Market', 'BSE 1000', 'Nifty Smallcap 500', 'BSE Utilities'],
  keyPoint: {
    title: 'Pioneer in power trading',
    text: 'PTC undertakes long-term trading of power generated from large projects, short-term trading and cross-border power trade.',
  },
  ttm: [
    { label: 'Sales TTM', value: '₹17,535 Cr' },
    { label: 'Net profit TTM', value: '₹587 Cr' },
    { label: 'EPS TTM', value: '₹17.18' },
  ],
};

export const keyRatios: KeyRatio[] = [
  { label: 'Market Cap', value: '4,522', suffix: 'Cr.' },
  { label: 'Current Price', value: '153', prefix: '₹' },
  { label: 'High / Low', value: '230 / 150', prefix: '₹' },
  { label: 'Stock P/E', value: '8.84' },
  { label: 'Book Value', value: '202', prefix: '₹' },
  { label: 'Dividend Yield', value: '15.0', suffix: '%' },
  { label: 'ROCE', value: '13.4', suffix: '%' },
  { label: 'ROE', value: '10.2', suffix: '%' },
  { label: 'Face Value', value: '10.0', prefix: '₹' },
];

export const pros = [
  'Company has reduced debt.',
  'Stock is trading at 0.76 times its book value',
  'Company has been maintaining a healthy dividend payout of 42.8%',
  "Company's working capital requirements have reduced from 36.8 days to 20.5 days",
];

export const cons = [
  'The company has delivered a poor sales growth of -1.78% over past five years.',
  'Promoter holding is low: 16.2%',
  'Company has a low return on equity of 9.94% over last 3 years.',
  'Earnings include an other income of Rs.324 Cr.',
  "Company's cost of borrowing seems high",
];

export const peerPath: { icon: IconName; label: string }[] = [
  { icon: 'globe', label: 'Utilities' },
  { icon: 'pie-chart', label: 'Power' },
  { icon: 'flag', label: 'Power' },
  { icon: 'bolt', label: 'Power Trading' },
];

export const peerIndices = [...company.indices, 'Nifty Microcap 250'];

export const peerColumns = [
  'CMP Rs.',
  'P/E',
  'Mar Cap Rs.Cr.',
  'Div Yld %',
  'NP Qtr Rs.Cr.',
  'Qtr Profit Var %',
  'Sales Qtr Rs.Cr.',
  'Qtr Sales Var %',
  'ROCE %',
];

export const peers = [
  { serial: '1.', name: 'PTC India', values: cells('152.78 8.84 4522.42 15.05 112.08 -49.76 4773.80 19.07 13.40') },
];

export const peerMedian = {
  label: 'Median: 1 Co.',
  values: cells('152.78 8.84 4522.42 15.05 112.08 -49.76 4773.8 19.07 13.4'),
};

export const quarterlyResults: DataTable = {
  columns: [
    'Jun 2023', 'Sep 2023', 'Dec 2023', 'Mar 2024', 'Jun 2024', 'Sep 2024', 'Dec 2024',
    'Mar 2025', 'Jun 2025', 'Sep 2025', 'Dec 2025', 'Mar 2026', 'Jun 2026',
  ],
  rows: [
    { label: 'Sales', expandable: true, values: cells('4,758 5,070 3,428 3,507 4,555 5,128 3,421 2,924 4,009 5,459 3,405 3,898 4,774') },
    { label: 'Expenses', expandable: true, values: cells('4,492 4,775 3,178 3,256 4,311 4,822 3,111 2,768 3,721 5,183 3,232 3,753 4,623') },
    { label: 'Operating Profit', strong: true, values: cells('267 295 250 251 244 306 310 156 288 275 173 145 151') },
    { label: 'OPM %', values: cells('6% 6% 7% 7% 5% 6% 9% 5% 7% 5% 5% 3.7% 3.1%') },
    { label: 'Other Income', expandable: true, values: cells('13 72 -7 -22 173 77 9 421 95 127 68 75 55') },
    { label: 'Interest', values: cells('110 109 104 100 173 91 85 99 92 101 64 53 52') },
    { label: 'Depreciation', values: cells('2 2 3 3 2 2 2 3 2 3 3 3 2') },
    { label: 'Profit before tax', strong: true, values: cells('168 255 136 126 242 290 232 475 289 298 175 164 151') },
  ],
};

export const profitAndLoss: DataTable = {
  columns: [...annualColumns, 'TTM'],
  rows: [
    { label: 'Sales', expandable: true, values: cells('13,838 13,447 15,311 12,766 15,155 18,101 18,346 16,856 15,971 16,763 15,679 16,771 17,535') },
    { label: 'Expenses', expandable: true, values: cells('12,836 12,333 13,918 11,612 13,201 16,275 16,646 15,276 14,616 15,694 14,810 15,879 16,791') },
    { label: 'Operating Profit', strong: true, values: cells('1,002 1,114 1,393 1,154 1,954 1,826 1,699 1,580 1,355 1,070 869 892 744') },
    { label: 'OPM %', values: cells('7% 8% 9% 9% 13% 10% 9% 9% 8% 6% 6% 5% 4.2%') },
    { label: 'Other Income', expandable: true, values: cells('6 154 203 147 130 23 8 23 32 75 1,029 364 324') },
    { label: 'Interest', values: cells('422 633 802 946 1,243 1,159 928 757 605 431 650 320 270') },
    { label: 'Depreciation', values: cells('8 10 21 97 97 100 100 101 102 10 9 10 10') },
    { label: 'Profit before tax', strong: true, values: cells('577 624 772 258 744 589 679 745 680 703 1,239 926 788') },
    { label: 'Tax %', values: cells('32% 35% 34% 36% 34% 31% 33% 26% 25% 24% 21% 22% _') },
    { label: 'Net Profit', expandable: true, strong: true, values: cells('326 406 506 165 490 406 458 552 507 533 976 717 587') },
    { label: 'EPS in Rs', values: cells('8.66 10.90 14.01 6.75 14.37 12.42 15.16 17.10 15.05 16.11 30.41 20.46 17.18') },
    { label: 'Dividend Payout %', values: cells('25% 23% 21% 59% 28% 44% 49% 46% 52% 48% 38% 42% _') },
  ],
};

export const growthCards: GrowthCard[] = [
  { title: 'Compounded Sales Growth', rows: [['10 Years:', '2%'], ['5 Years:', '-2%'], ['3 Years:', '2%'], ['TTM:', '13%']] },
  { title: 'Compounded Profit Growth', rows: [['10 Years:', '7%'], ['5 Years:', '6%'], ['3 Years:', '11%'], ['TTM:', '-17%']] },
  { title: 'Stock Price CAGR', rows: [['10 Years:', '7%'], ['5 Years:', '9%'], ['3 Years:', '1%'], ['1 Year:', '-13%']] },
  { title: 'Return on Equity', rows: [['10 Years:', '10%'], ['5 Years:', '10%'], ['3 Years:', '10%'], ['Last Year:', '10%']] },
];

export const balanceSheet: DataTable = {
  columns: annualColumns,
  rows: [
    { label: 'Equity Capital', values: cells('296 296 296 296 296 296 296 296 296 296 296 296') },
    { label: 'Reserves', values: cells('2,786 3,255 3,559 3,423 3,666 3,891 4,124 4,427 4,723 4,846 5,509 5,685') },
    { label: 'Borrowings', expandable: true, values: cells('5,110 7,724 9,999 12,353 13,320 11,408 11,479 9,771 6,546 4,327 2,962 1,769') },
    { label: 'Other Liabilities', expandable: true, values: cells('2,477 3,507 4,245 3,181 3,996 5,514 4,769 5,387 5,065 5,654 4,148 4,881') },
    { label: 'Total Liabilities', strong: true, values: cells('10,670 14,782 18,098 19,253 21,278 21,109 20,668 19,882 16,630 15,123 12,916 12,631') },
    { label: 'Fixed Assets', expandable: true, values: cells('49 387 2,155 2,061 1,967 1,884 1,787 1,693 1,617 43 38 32') },
    { label: 'CWIP', values: cells('0 0 0 0 0 0 0 0 0 0 0 0') },
    { label: 'Investments', values: cells('1,293 1,102 974 400 291 564 972 768 326 284 377 941') },
    { label: 'Other Assets', expandable: true, values: cells('9,328 13,293 14,970 16,792 19,020 18,662 17,909 17,421 14,686 14,796 12,500 11,658') },
    { label: 'Total Assets', strong: true, values: cells('10,670 14,782 18,098 19,253 21,278 21,109 20,668 19,882 16,630 15,123 12,916 12,631') },
  ],
};

export const cashFlows: DataTable = {
  columns: annualColumns,
  rows: [
    { label: 'Cash from Operating Activity', expandable: true, values: cells('-497 -1,281 111 -1,438 -108 3,294 2,108 3,049 3,575 2,451 1,864 2,817') },
    { label: 'Cash from Investing Activity', expandable: true, values: cells('-160 87 -1,374 249 244 -414 -505 46 168 -519 1,430 -824') },
    { label: 'Cash from Financing Activity', expandable: true, values: cells('709 1,124 1,353 1,278 -408 -2,570 -1,085 -2,788 -4,019 -2,042 -2,459 -3,428') },
    { label: 'Net Cash Flow', strong: true, values: cells('52 -70 91 89 -272 309 518 308 -276 -110 835 -1,434') },
    { label: 'Free Cash Flow', muted: true, values: cells('-500 -1,594 -1,366 -1,754 -111 3,292 2,105 3,040 3,574 2,448 1,859 2,813') },
    { label: 'CFO/OP', muted: true, values: cells('-29% -88% 28% -99% 9% 194% 130% 193% 275% 247% 245% 343%') },
  ],
};

export const ratios: DataTable = {
  columns: annualColumns,
  rows: [
    { label: 'Debtor Days', values: cells('67 101 78 95 118 141 123 156 130 125 111 95') },
    { label: 'Inventory Days', values: cells('0 _ 0 0 0 0 0 0 0 0 0 0') },
    { label: 'Days Payable', values: cells('_ _ _ _ _ _ _ _ _ _ _ _') },
    { label: 'Cash Conversion Cycle', strong: true, values: cells('67 101 78 95 118 141 123 156 130 125 111 95') },
    { label: 'Working Capital Days', values: cells('7 -4 -62 -79 -23 8 20 25 24 52 37 20') },
    { label: 'ROCE %', values: cells('13% 12% 12% 8% 11% 10% 10% 9% 9% 10% 14% 13%') },
  ],
};

export const shareholding: DataTable = {
  columns: ['Sep 2025', 'Dec 2025', 'Mar 2026', 'Jun 2026'],
  rows: [
    { label: 'Promoters', expandable: true, values: cells('16.22% 16.22% 16.22% 16.22%') },
    { label: 'FIIs', expandable: true, values: cells('10.94% 10.41% 10.41% 11.03%') },
    { label: 'DIIs', expandable: true, values: cells('28.85% 29.34% 29.12% 28.67%') },
    { label: 'Public', expandable: true, values: cells('43.99% 44.03% 44.23% 44.06%') },
    { label: 'No. of Shareholders', strong: true, values: cells('4,58,209 4,61,730 4,55,118 4,49,602') },
  ],
};

export const announcements = [
  {
    title: 'Compliance With Regulation 36(1)(B) Of SEBI (LODR), 2015',
    summary: '3 Sep - PTC India dispatched FY26 annual report; AGM on 30 September 2026, record date for final dividend 7 October.',
  },
  {
    title: 'Announcement under Regulation 30 (LODR)- Newspaper Publication',
    summary: '3 Sep - Copy of newspaper advertisements regarding completion of dispatch of Annual Report for FY 2025-26.',
  },
];

export const annualReports = ['2026', '2025', '2024', '2023'];

export const concalls = ['Aug 2026', 'May 2026', 'Feb 2026', 'Nov 2025'];
