import classNames from 'classnames';
import styles from './page.module.scss';
import headings from '../../styles/typography/Heading.module.scss';
import text from '../../styles/typography/Text.module.scss';

export default async function Maintenance() {
  const titleText = classNames(styles.title, headings.heading2);
  return (
    <div className={styles.maintenanceContainer}>
      <h1 className={titleText}>Under Maintenance!</h1>
      <p className={text.textXl}>
        I am in the process of making a new website. Please check back another
        time!
      </p>
    </div>
  );
}
