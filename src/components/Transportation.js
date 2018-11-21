import React from 'react';
import PropTypes from 'prop-types';
import { graphql, createFragmentContainer } from 'react-relay';
import { Row, Col } from 'antd';

import { TRANSPORTATION_ARRAY } from 'utils/constants';

import styles from './styles/transportation.less';

class Transportation extends React.PureComponent {
  static propTypes = {
    transportation: PropTypes.arrayOf(PropTypes.shape({}).isRequired)
      .isRequired,
  };

  render() {
    const { transportation } = this.props;

    return (
      <Row className={styles.root} gutter={16} type="flex">
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

        <Col className={styles.symbol} span={24}>
          {TRANSPORTATION_ARRAY.map((name, index) => (
            <div key={name}>
              <span className={styles[`color-${index}`]} />

              {name}
            </div>
          ))}
        </Col>
      </Row>
    );
  }
}

export default createFragmentContainer(
  Transportation,
  graphql`
    fragment Transportation_transportation on Transportation
      @relay(plural: true) {
      id
      name
      value
    }
  `,
);
