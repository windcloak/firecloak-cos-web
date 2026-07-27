export interface NavLink {
  title: string;
  url: string;
}

// Shared by the header (desktop nav row + hamburger trigger) and the
// app shell (mobile sidenav content), so there's one list of routes to
// keep in sync instead of two.
export const NAV_LINKS: NavLink[] = [
  { title: 'Home', url: '/' },
  { title: 'About', url: '/about' },
  { title: 'Cosplay', url: '/cosplay' },
  { title: 'Tutorials', url: '/tutorials' },
  { title: 'Contact', url: '/contact' },
  { title: 'Reviews', url: '/reviews' },
  { title: 'Links', url: '/links' },
];
