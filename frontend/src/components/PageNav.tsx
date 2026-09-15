import { sectionLinks } from '../data/company';
import { Icon } from './Icon';

interface PageNavProps {
  activeId: string;
  onOpenAccount: () => void;
}

export function PageNav({ activeId, onOpenAccount }: PageNavProps) {
  return (
    <nav className="page-nav" aria-label="On this page">
      <div className="page-nav__title">On this page</div>
      {sectionLinks.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className={link.id === activeId ? 'page-nav__link is-active' : 'page-nav__link'}
          aria-current={link.id === activeId ? 'location' : undefined}
        >
          {link.label}
        </a>
      ))}
      <div className="page-nav__divider" />
      <a href="#top" className="page-nav__link">
        <Icon name="notebook" /> Notebook
      </a>
      <a href="#top" className="page-nav__ai">
        <Icon name="sparkles" /> Screener AI
      </a>
      <button type="button" className="page-nav__cta" onClick={onOpenAccount}>
        Open an account
      </button>
    </nav>
  );
}
