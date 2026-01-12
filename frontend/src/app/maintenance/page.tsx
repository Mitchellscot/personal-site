import classNames from 'classnames';
import {Metadata} from 'next/dist/lib/metadata/types/metadata-interface';
import styles from './page.module.scss';
import headings from '../../styles/typography/Heading.module.scss';
import text from '../../styles/typography/Text.module.scss';

export const metadata: Metadata = {
  title: 'Mitchell Scott',
  description: 'site is under maintenance',
};

export default async function Maintenance() {
  const titleText = classNames(styles.title, headings.heading2);
  return (
    <div className={styles.maintenanceContainer}>
      <h1 className={titleText}>Under Maintenance!</h1>
      <p className={text.textXl}>
        The site is currently undergoing maintenance. Please check back later!
      </p>
    </div>
  );
}
