import React from 'react';
import PropTypes from 'prop-types';
import { fetchQuery, graphql } from 'react-relay';
import { Affix, Button, Row, Col } from 'antd';

import MapImg from 'static/MapImg.svg';
import styles from 'components/styles.less';

export default class Index extends React.Component {
  render() {
    return (
      <>
        <Affix>
          <header className={styles.header}>
            <div className={styles.owner}>
              <h2>我要回家投票</h2>

              <h4>by Una</h4>
            </div>

            <Button className={styles.button} type="primary">
              我也要回家投票
            </Button>
          </header>
        </Affix>

        <div className={styles.headerImg}>
          <div className={styles.info}>
            <h1>Every Vote Matters</h1>

            <h4>
              Every single vote can make a big difference, and this is the power
              of your voice.
            </h4>

            <Button className={styles.button} type="primary">
              我也要回家投票
            </Button>
          </div>

          <MapImg className={styles.map} />
        </div>

        <div className={styles.root}>
          <Row gutter={16}>
            {[
              {
                key: 'total',
                title: '總投票人數',
                value: '412,203',
                unit: '人',
              },
              {
                key: 'time',
                title: '總旅途時間',
                value: '2412.312',
                unit: '小時',
              },
              {
                key: 'price',
                title: '總旅途費用',
                value: '10,000,000',
                unit: 'NTD',
              },
              {
                key: 'distance',
                title: '總旅途距離',
                value: '100000.12',
                unit: 'km',
              },
            ].map(({ key, title, value, unit }) => (
              <Col key={key} span={6}>
                <div className={styles.card}>
                  <h3>{title}</h3>

                  <p>
                    {value}

                    <font>{unit}</font>
                  </p>
                </div>
              </Col>
            ))}
          </Row>

          <Row className={styles.map}>
            <Col span={18}>TODO map</Col>

            <Col className={styles.statistics} span={6}>
              居住地統計
              <ol>
                {[
                  {
                    key: 'America',
                    title: '美洲',
                    value: 400,
                  },
                  {
                    key: 'Europe',
                    title: '歐洲',
                    value: '400',
                  },
                  {
                    key: 'Island',
                    title: '本島',
                    value: 400,
                  },
                  {
                    key: 'Asia',
                    title: '亞洲',
                    value: 400,
                  },
                ].map(({ key, title, value }) => (
                  <li key={key}>
                    {title}：{value} 人
                  </li>
                ))}
              </ol>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}