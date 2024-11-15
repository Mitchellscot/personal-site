import headings from '../../styles/typography/Heading.module.scss';
import styles from './page.module.scss';
import classNames from 'classnames';
// import Button from '../../components/Button/Button';
// import StatsPagePlaceHolderData from '../../models/StatsPagePlaceHolderData';

export default function Stats() {
  const titleText = classNames(styles.title, headings.heading2);
  return (
    <div className={styles.container}>
      <div className={titleText}>STATS ON RUNNING AND CYCLING COMING SOON</div>
    </div>
    // <>
    //   <div className={styles.container}>
    //     <div className={styles.timeButtonContainer}>
    //       <Button
    //         label="Run"
    //         link="/blog/tags"
    //         variant="active"
    //         arrowOptions="none"
    //         iconOptions="run"
    //       />
    //       <Button
    //         label="Bike"
    //         link="/blog/tags"
    //         variant="inactive"
    //         arrowOptions="none"
    //         iconOptions="bike"
    //       />
    //       <Button
    //         label="Swim"
    //         link="/blog/tags"
    //         variant="inactive"
    //         arrowOptions="none"
    //         iconOptions="swim"
    //       />
    //       <Button
    //         label="Other"
    //         link="/blog/tags"
    //         variant="inactive"
    //         arrowOptions="none"
    //         iconOptions="weights"
    //       />
    //     </div>
    //     <div>Chart goes here</div>
    //     <div className={styles.timeButtonContainer}>
    //       <Button
    //         label="This Month"
    //         link="/blog/tags"
    //         variant="transparent"
    //         arrowOptions="right"
    //       />
    //       <Button
    //         label="This Year"
    //         link="/blog/tags"
    //         variant="transparent"
    //         arrowOptions="right"
    //       />
    //       <Button
    //         label="All Time"
    //         link="/blog/tags"
    //         variant="transparent"
    //         arrowOptions="right"
    //       />
    //     </div>
    //     <div>Total Distance:</div>
    //   </div>
    // </>
  );
}
