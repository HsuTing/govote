import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import { Button, Row, Col, Carousel } from 'antd';

import Header from 'components/Header';
import Statistics from 'components/Statistics';
import Map from 'components/Map';
import Transportation from 'components/Transportation';
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
          id
          name
          fromCity
          toCity
          message
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
              <div className={`card ${styles.card}`}>
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
