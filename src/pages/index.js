import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import { Affix, Button, Row, Col, Carousel } from 'antd';

import MapImg from 'static/MapImg.svg';
import UsersIcon from 'static/UsersIcon.svg';
import ArrowIcon from 'static/ArrowIcon.svg';
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
    });

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
            'circle-radius': value,
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
      data: { statistics, area, users },
    } = this.props;

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
              <Col key={key} span={6}>
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

          <Row className={styles.map}>
            <Col id="map" span={18} />

            <Col className={styles.area} span={6}>
              居住地統計
              <ol>
                {area.map(({ id, name, value }) => (
                  <li key={id}>
                    {name}：{value} 人
                  </li>
                ))}
              </ol>
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
          dots={false}
          draggable
          centerMode
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
      </>
    );
  }
}
