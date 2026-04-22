import {NavLink} from 'react-router';
import type {HeaderQuery} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

interface HeaderProps {
  header: HeaderQuery;
  cart?: unknown;
  isLoggedIn?: Promise<boolean>;
  publicStoreDomain?: string;
}

type Viewport = 'desktop' | 'mobile';

const PROJECT_NAV_ITEMS = [
  {id: 'nav-home', title: 'Inicio', url: '/'},
  {id: 'nav-catalog', title: 'Catalogo', url: '/collections'},
  {id: 'nav-commerce', title: 'Commerce', url: '/commerce'},
  {id: 'nav-about', title: 'Sobre', url: '/about'},
  {id: 'nav-dashboard', title: 'Dashboard', url: '/dashboard'},
] as const;

export function Header({
  header,
  cart: _cart,
  isLoggedIn: _isLoggedIn,
  publicStoreDomain: _publicStoreDomain,
}: HeaderProps) {
  const {shop} = header;
  return (
    <header className="header">
      <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
        <strong>{shop.name}</strong>
      </NavLink>
      <HeaderMenu viewport="desktop" />
      <HeaderCtas />
    </header>
  );
}

export function HeaderMenu({
  viewport,
  menu: _menu,
  primaryDomainUrl: _primaryDomainUrl,
  publicStoreDomain: _publicStoreDomain,
}: {
  viewport: Viewport;
  menu?: HeaderQuery['menu'];
  primaryDomainUrl?: string;
  publicStoreDomain?: string;
}) {
  const className = `header-menu-${viewport}`;
  const {close} = useAside();

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
      {PROJECT_NAV_ITEMS.map((item) => {
        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to={item.url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas() {
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
    >
      <h3>☰</h3>
    </button>
  );
}

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}
