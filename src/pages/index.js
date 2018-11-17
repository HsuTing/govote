import React from 'react';
import PropTypes from 'prop-types';
import { fetchQuery, graphql } from 'react-relay';
import { Affix, Button } from 'antd';

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

            <Button>我也要回家投票</Button>
          </header>
        </Affix>

        <MapImg className={styles.mapImg} />
      </>
    );
  }
}
