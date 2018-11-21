import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';

import Header from 'components/Header';
import Statistics from 'components/Statistics';
import Map from 'components/Map';
import Transportation from 'components/Transportation';
import Messages from 'components/Messages';
import Share from 'components/Share';
import styles from 'components/styles/index.less';

export default class Index extends React.Component {
  carouselRef = React.createRef();

  static propTypes = {
    data: PropTypes.shape({}).isRequired,
  };

  static query = graphql`
    query pages_dataQuery {
      data {
        statistics {
          ...Statistics_statistics
          ...Map_statistics
        }
        area {
          ...Map_area
        }
        transportation {
          ...Transportation_transportation
        }
        users {
          ...Messages_users
        }
      }
    }
  `;

  render() {
    const {
      data: { statistics, area, transportation, users },
    } = this.props;

    return (
      <>
        <Header />

        <div className={styles.root}>
          <Statistics statistics={statistics} />

          <Map statistics={statistics} area={area} />

          <Transportation transportation={transportation} />

          <Messages users={users} />
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
