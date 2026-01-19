import classNames from 'classnames';
import Link from 'next/link';
import text from '../../styles/typography/Text.module.scss';
import styles from './HeaderNav.module.scss';

type PathOptions = '/' | 'blog' | 'projects' | 'stats' | 'about' | 'contact';

export default async function HeaderNav({path = '/'}) {
  const pathName = path;
  const navItem = classNames(styles.navItem, text.textMd);
  const navItemActive = classNames(styles.navItemActive, text.textMd);

  const blogLinkIsActive = pathName === '/' || pathName === 'blog';
  return (
    <nav className={styles.container}>
      <ol className={styles.navLinks}>
        <li>
          <Link href="/" className={blogLinkIsActive ? navItemActive : navItem}>
            Blog
          </Link>
        </li>
        <li>
          <Link
            href="/projects"
            className={pathName === 'projects' ? navItemActive : navItem}
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            href="/stats"
            className={pathName === 'stats' ? navItemActive : navItem}
          >
            Stats
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={pathName === 'about' ? navItemActive : navItem}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={pathName === 'contact' ? navItemActive : navItem}
          >
            Contact
          </Link>
        </li>
      </ol>
    </nav>
  );
}
