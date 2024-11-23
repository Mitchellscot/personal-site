'use client';
import headings from '../../styles/typography/Heading.module.scss';
import text from '../../styles/typography/Text.module.scss';
import styles from './page.module.scss';
import classNames from 'classnames';
import Button from '../../components/Button/Button';
import {baseEnv} from '../../utils/environment';
import http from '../../utils/http';
import {useSearchParams} from 'next/navigation';
import {
  ExerTrackResponse,
  StatsInformation,
} from '../../models/ExerTrackResponse';
import {useEffect, useState} from 'react';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import type Sport from '../../models/Sport';
import type Time from '../../models/Time';
import {
  setSportStatInformation,
  getMetricBySport,
  setAllSportStatInformation,
  getBarChart,
  getPieChart,
} from '../../utils/chartUtils';
import Activities from '../../components/Activities/Activities';
import Link from 'next/link';
import {FaPersonRunning, FaPersonSwimming} from 'react-icons/fa6';
import {LuBike} from 'react-icons/lu';
import {FaDumbbell} from 'react-icons/fa6';
import Chart from 'chart.js/auto';

function formatNumberWithCommas(number: number): string {
  return new Intl.NumberFormat('en-US').format(number);
}

export default function Stats() {
  const activitiesTitle = classNames(styles.activitiesTitle, headings.heading2);
  const totalsTitleClasses = classNames(styles.totalsTitle, text.textLg);
  const statClasses = classNames(styles.stat, text.textMd);
  const titleClasses = classNames(styles.title, headings.heading2);
  const [sport, setSport] = useState<Sport>('all');
  const runBtn = classNames(
    text.textLg,
    styles.sportButton,
    sport === 'run' ? styles.sportButton_active : styles.sportButton_inactive
  );
  const bikeBtn = classNames(
    text.textLg,
    styles.sportButton,
    sport === 'bike' ? styles.sportButton_active : styles.sportButton_inactive
  );
  const swimBtn = classNames(
    text.textLg,
    styles.sportButton,
    sport === 'swim' ? styles.sportButton_active : styles.sportButton_inactive
  );
  const otherBtn = classNames(
    text.textLg,
    styles.sportButton,
    sport === 'other' ? styles.sportButton_active : styles.sportButton_inactive
  );
  const [time, setTime] = useState<Time>('all');
  const [data, setData] = useState<ExerTrackResponse | null>(null);
  const [chart, setChart] = useState<Chart | null>(null);
  const [pieChart, setPieChart] = useState<Chart | null>(null);
  const [quickStatistics, setquickStatistics] =
    useState<StatsInformation | null>(null);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    setSport((searchParams.get('sport') as Sport) ?? 'all');
    setTime((searchParams.get('time') as Time) ?? 'all');
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await http.get<ExerTrackResponse>(baseEnv('').api.stats);
      setData(response.data ?? null);
      setPageLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (pageLoading) return;
    if (!data) return;

    if (chart) chart.destroy();
    if (pieChart) pieChart.destroy();

    const allSports = sport === 'all';
    setquickStatistics(
      allSports
        ? setAllSportStatInformation(data, time)
        : setSportStatInformation(data, sport, time)
    );

    const mainChart = document.getElementById(
      `${sport}-${time}`
    ) as HTMLCanvasElement | null;
    const mainPieChart = document.getElementById(
      `pie-${sport}-${time}`
    ) as HTMLCanvasElement | null;

    if (
      !mainChart ||
      !mainPieChart ||
      !mainChart === null ||
      mainPieChart === null
    ) {
      return;
    }
    mainChart.getContext('2d');
    mainPieChart.getContext('2d');

    const newChart = getBarChart(sport, time, data, mainChart);
    if (newChart) {
      setChart(newChart as Chart);
    }
    const newPieChart = getPieChart(sport, time, data, mainPieChart!);
    if (newPieChart) {
      setPieChart(newPieChart as Chart);
    }
  }, [data, pageLoading, sport, time]);

  const recentActivities = data?.recentActivities ?? [];
  return (
    <div className={styles.container}>
      <div className={titleClasses}>Check out my workout stats!</div>
      {pageLoading ? (
        <LoadingIndicator
          isCentered={true}
          isFullScreen={true}
          size={'large'}
        />
      ) : (
        <>
          <div className={styles.timeButtonContainer}>
            <Button
              label="This Month"
              link={`/stats?sport=${sport}&time=month`}
              variant="transparent"
              arrowOptions="right"
            />
            <Button
              label="This Year"
              link={`/stats?sport=${sport}&time=year`}
              variant="transparent"
              arrowOptions="right"
            />
            <Button
              label="All Time"
              link={`/stats?sport=${sport}&time=all`}
              variant="transparent"
              arrowOptions="right"
            />
          </div>
          {pageLoading ? (
            <div>
              <LoadingIndicator
                isCentered={true}
                isFullScreen={false}
                size={'large'}
              />
            </div>
          ) : (
            <div>
              <canvas id={`${sport}-${time}`}></canvas>
            </div>
          )}

          <div className={styles.sportButtonContainer}>
            <Link
              className={runBtn}
              href={
                sport === 'run'
                  ? `/stats?sport=all&time=${time}`
                  : `/stats?sport=run&time=${time}`
              }
            >
              <span>Run</span> <FaPersonRunning />
            </Link>
            <Link
              className={bikeBtn}
              href={
                sport === 'bike'
                  ? `/stats?sport=all&time=${time}`
                  : `/stats?sport=bike&time=${time}`
              }
            >
              <span>Bike</span> <LuBike />
            </Link>

            <Link
              className={swimBtn}
              href={
                sport === 'swim'
                  ? `/stats?sport=all&time=${time}`
                  : `/stats?sport=swim&time=${time}`
              }
            >
              <span>Swim</span> <FaPersonSwimming />
            </Link>
            <Link
              className={otherBtn}
              href={
                sport === 'other'
                  ? `/stats?sport=all&time=${time}`
                  : `/stats?sport=other&time=${time}`
              }
            >
              <span>Workout</span> <FaDumbbell />
            </Link>
          </div>
          <hr />
          <div className={styles.totalsAndPieChartContainer}>
            <div className={styles.totalsContainer}>
              {quickStatistics?.totalDistance && (
                <div className={totalsTitleClasses}>
                  <span className={styles.totalsLabel}>Total Distance: </span>
                  <br />
                  <span className={statClasses}>
                    {formatNumberWithCommas(quickStatistics?.totalDistance)}{' '}
                    {getMetricBySport(sport)}
                  </span>
                </div>
              )}
              {quickStatistics?.totalDuration && (
                <div className={totalsTitleClasses}>
                  <span className={styles.totalsLabel}>
                    Total Duration: <br />
                  </span>
                  <span className={statClasses}>
                    {quickStatistics?.totalDuration}
                  </span>
                </div>
              )}
              {quickStatistics?.maxDistance && (
                <div className={totalsTitleClasses}>
                  <span className={styles.totalsLabel}>
                    Max Distance: <br />
                  </span>
                  <span className={statClasses}>
                    {quickStatistics?.maxDistance} {getMetricBySport(sport)}
                  </span>
                </div>
              )}
              {quickStatistics?.totalActivities && (
                <div className={totalsTitleClasses}>
                  <span className={styles.totalsLabel}>
                    Total{' '}
                    {sport === 'all' || sport === 'other'
                      ? 'Activities'
                      : `${sport}`}
                    : <br />
                  </span>
                  <span className={statClasses}>
                    {formatNumberWithCommas(quickStatistics?.totalActivities)}
                  </span>
                </div>
              )}
            </div>
            <div className={styles.pieChartContainer}>
              <canvas id={`pie-${sport}-${time}`}></canvas>
            </div>
          </div>

          <div className={activitiesTitle}>Recent Activities</div>
          <hr />
          <div className={styles.activityColumns}>
            <Activities activitiesList={recentActivities} />
          </div>
        </>
      )}
    </div>
  );
}