import React from 'react';
import { renderToString } from 'react-dom/server';
import PropTypes from 'prop-types';
import { graphql, createFragmentContainer } from 'react-relay';
import { Row, Col } from 'antd';

import styles from './styles/map.less';

class Map extends React.PureComponent {
  static propTypes = {
    area: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    statistics: PropTypes.shape({}).isRequired,
  };

  componentDidMount() {
    const {
      area,
      statistics: { total },
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
    const { area } = this.props;

    return (
      <Row className={styles.root} gutter={16} type="flex">
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
      </Row>
    );
  }
}

export default createFragmentContainer(
  Map,
  graphql`
    fragment Map_area on Area @relay(plural: true) {
      id
      name
      value
      list {
        id
        name
        value
      }
    }

    fragment Map_statistics on Statistics {
      total
    }
  `,
);
