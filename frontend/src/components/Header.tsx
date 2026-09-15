import { Logo } from './common';
import { Icon } from './Icon';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onGetStarted: () => void;
}

export function Header({ isDark, onToggleTheme, onGetStarted }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Logo height={22} />
        <nav className="site-header__nav">
          <a href="#top">Home</a>
          <a href="#top">Screens</a>
          <a href="#top">Tools</a>
        </nav>
        <div className="site-header__actions">
          <label className="search">
            <Icon name="search" className="search__icon" />
            <input placeholder="Search for a company" aria-label="Search for a company" />
          </label>
          <button type="button" className="btn-icon" onClick={onToggleTheme} title="Toggle theme" aria-label="Toggle theme">
            <Icon name={isDark ? 'sun' : 'moon'} />
          </button>
          <button type="button" className="btn-text">
            Login
          </button>
          <button type="button" className="btn-primary" onClick={onGetStarted}>
            Get started
          </button>
        </div>
      </div>
    </header>
  );
}
