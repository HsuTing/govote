import React from 'react';
import PropTypes from 'prop-types';
import { graphql, createFragmentContainer } from 'react-relay';
import { Row, Col } from 'antd';

import styles from './styles/statistics.less';

class Statistics extends React.PureComponent {
  static propTypes = {
    statistics: PropTypes.shape({}).isRequired,
  };

  render() {
    const { statistics } = this.props;

    return (
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
            <div className={`card ${styles.card}`}>
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
    );
  }
}

export default createFragmentContainer(
  Statistics,
  graphql`
    fragment Statistics_statistics on Statistics {
      total
      time
      price
      distance
    }
  `,
);
