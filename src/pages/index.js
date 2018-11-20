import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import { Affix, Button, Row, Col, Carousel } from 'antd';

import MapImg from 'static/MapImg.svg';
import UsersIcon from 'static/UsersIcon.svg';
import ArrowIcon from 'static/ArrowIcon.svg';
import Vote from 'static/Vote.svg';
import VoteMessage from 'static/VoteMessage.svg';
import FBIcon from 'static/FBIcon.svg';
import TwitterIcon from 'static/TwitterIcon.svg';
import LinkinIcon from 'static/LinkinIcon.svg';
import styles from 'components/styles.less';

export default class Index extends React.Component {
  carouselRef = React.createRef();

  static query = graphql`
    query pages_dataQuery {
      data {
        statistics {
          total
          time
          price
          distance
        }
        area {
          id
          name
          value
        }
        transportation {
          id
          name
          value
        }
        users {
          id
          name
          fromCity
          toCity
          message
        }
      }
    }
  `;

  componentDidMount() {
    const {
      data: {
        area,
        statistics: { total },
      },
    } = this.props;
    const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

    mapboxgl.accessToken =
      'pk.eyJ1IjoiaHN1dGluZyIsImEiOiJRajF4Y0hjIn0.9UDt8uw_fxEX791Styd-lA';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      maxBounds: [[-180, -85], [180, 85]],
    });
    const MAX_RADIUS = 30;

    map.on('load', () => {
      area.forEach(({ id, name, value }) => {
        map.addSource(id, {
          type: 'geojson',
          data: {
            type: 'Point',
            coordinates: {
              本島: [120.58, 23.58],
              大洋洲: [175, -9],
              亞洲: [87.19, 43.4],
              北美洲: [-111.725, 48.33],
              南美洲: [-60, -35],
              歐洲: [28.4, 53.9],
              非洲: [16.96, 1.35],
            }[name],
          },
        });

        map.addLayer({
          id,
          source: id,
          type: 'circle',
          paint: {
            'circle-radius': MAX_RADIUS * (value / total),
            'circle-color': 'rgba(0, 80, 179, 0.3)',
            'circle-stroke-width': 1,
            'circle-stroke-color': '#0050b3',
          },
        });
      });
    });
  }

  render() {
    const {
      data: { statistics, area, transportation, users },
    } = this.props;

    return (
      <>
        <Affix>
          <header className={styles.header}>
            <div className={styles.info}>我們支持婚姻平權&性平教育</div>

            <Button className={styles.button} type="primary">
              我會回家投票
            </Button>
          </header>
        </Affix>

        <div className={styles.headerImg}>
          <div className={styles.info}>
            <h1>
              投票的地方可能很遠,
              <br />
              但投票能讓美好的未來更近一些。
            </h1>

            <h4>告訴大家你會怎麼回家投票, 可以鼓勵更多人一起回家投票噢!</h4>

            <Button className={styles.button} type="primary">
              我會回家投票
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
                unit: '人',
              },
              {
                key: 'time',
                title: '總旅途時間',
                unit: '小時',
              },
              {
                key: 'price',
                title: '總旅途費用',
                unit: 'NTD',
              },
              {
                key: 'distance',
                title: '總旅途距離',
                unit: 'km',
              },
            ].map(({ key, title, unit }) => (
              <Col key={key} lg={6} md={12} sm={24}>
                <div className={styles.card}>
                  <h3>{title}</h3>

                  <p>
                    {['time', 'distance'].includes(key)
                      ? statistics[key].toFixed(2)
                      : statistics[key]}

                    <font>{unit}</font>
                  </p>
                </div>
              </Col>
            ))}
          </Row>

          <Row className={styles.map} gutter={16} type="flex">
            <Col lg={18} xs={24}>
              <div id="map" />
            </Col>

            <Col className={styles.area} lg={6} xs={24}>
              居住地統計
              <ol>
                {area.map(({ id, name, value }) => (
                  <li key={id}>
                    {name}：{value} 人
                  </li>
                ))}
              </ol>
            </Col>

            <Col className={styles.transportation} span={24}>
              交通方式統計
              <div className={styles.bar}>
                {transportation.map(({ id, value }, index) => (
                  <div
                    key={id}
                    className={styles[`color-${index}`]}
                    style={{
                      width: `${value}%`,
                    }}
                  >
                    {value.toFixed(2)} %
                  </div>
                ))}
              </div>
            </Col>

            <Col className={styles.symbol} span={24} type="flow">
              {transportation.map(({ id, name }, index) => (
                <div key={id}>
                  <span className={styles[`color-${index}`]} />

                  {name}
                </div>
              ))}
            </Col>
          </Row>

          <div className={styles.usersHeader}>
            <UsersIcon />

            <div className={styles.text}>要回家投票的人說</div>
          </div>
        </div>

        <Carousel
          ref={this.carouselRef}
          className={styles.carousel}
          slidesToShow={3}
          slidesToScroll={3}
          rows={2}
          dots={false}
          draggable
          infinite
        >
          {users.map(({ id, fromCity, toCity, name, message }) => (
            <div key={id} className={styles.cardWrapper}>
              <div className={styles.card}>
                <h1>
                  {fromCity}
                  <ArrowIcon className={styles.icon} />
                  {toCity}
                </h1>

                <h3>{name}</h3>

                <div>
                  <p>“</p>

                  <p>{message}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>

        <div className={styles.carouselButtons}>
          <Button
            shape="circle"
            icon="left"
            onClick={() => {
              this.carouselRef.current.slick.slickPrev();
            }}
          />

          <Button
            shape="circle"
            icon="right"
            onClick={() => {
              this.carouselRef.current.slick.slickNext();
            }}
          />
        </div>

        <div className={styles.share}>
          <h2>歡迎將網站分享出去，鼓勵更多人一起「#1124為愛返家」吧！</h2>

          <Button className={styles.button} type="primary">
            立即分享！
          </Button>
        </div>

        <Row className={styles.vote} type="flex">
          <Col lg={12} xs={24} className={styles.voteSvg}>
            <Vote />

            <VoteMessage className={styles.message} />
          </Col>

          <Col lg={12} xs={24}>
            <div className={styles.info}>
              <div>
                <h3>聯絡我們</h3>

                <div className={styles.email}>GovoteTW@gmail.com</div>

                <h3>分享出去</h3>

                <div>
                  <FBIcon />

                  <TwitterIcon />

                  <LinkinIcon />
                </div>
              </div>
            </div>
          </Col>

          <Col span={24} className={styles.copyRight}>
            ©2018 GovoteTW. All rights reserved.
          </Col>
        </Row>
      </>
    );
  }
}
