import React from 'react';
import { renderToString } from 'react-dom/server';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import { Affix, Button, Row, Col, Carousel } from 'antd';

import Header from 'components/Header';
import Share from 'components/Share';
import UsersIcon from 'static/UsersIcon.svg';
import ArrowIcon from 'static/ArrowIcon.svg';
import styles from 'components/styles/index.less';
import { TRANSPORTATION_ARRAY } from 'utils/constants';

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
          list {
            id
            name
            value
          }
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
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      className: 'map-pop',
    });

    map.on('load', () => {
      area.forEach(({ id, name, value, list }) => {
        const coordinates = {
          本島: [120.58, 23.58],
          大洋洲: [175, -9],
          亞洲: [87.19, 43.4],
          北美洲: [-111.725, 48.33],
          南美洲: [-60, -35],
          歐洲: [28.4, 53.9],
          非洲: [16.96, 1.35],
        }[name];

        map.addSource(id, {
          type: 'geojson',
          data: {
            type: 'Point',
            coordinates,
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

        map.on('mouseenter', id, e => {
          map.getCanvas().style.cursor = 'pointer';
          popup
            .setLngLat(coordinates)
            .setHTML(
              renderToString(
                <>
                  <div>{name}</div>

                  <ol>
                    {list.map(
                      ({ id: itemId, name: itemName, value: itemValue }) => (
                        <li key={itemId}>
                          {itemName}: {itemValue}人
                        </li>
                      ),
                    )}
                  </ol>
                </>,
              ),
            )
            .addTo(map);
        });

        map.on('mouseleave', id, () => {
          map.getCanvas().style.cursor = '';
          popup.remove();
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
        <Header />

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
                {transportation.map(({ id, name, value }, index) => (
                  <div
                    key={id}
                    className={
                      styles[`color-${TRANSPORTATION_ARRAY.indexOf(name)}`]
                    }
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
              {TRANSPORTATION_ARRAY.map((name, index) => (
                <div key={name}>
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

        <Share />

        <div className={styles.copyright}>
          <a href="mailto:lfiwereyou1069@gmail.com">
            聯絡信箱: lfiwereyou1069@gmail.com
          </a>
          ©2018 GovoteTW All rights reserved.
        </div>
      </>
    );
  }
}
