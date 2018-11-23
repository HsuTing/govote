import React from 'react';
import PropTypes from 'prop-types';
import { graphql, createFragmentContainer } from 'react-relay';
import { Button, Carousel, Pagination } from 'antd';

import Img from 'static/MessageImg.svg';
import ArrowIcon from 'static/ArrowIcon.svg';

import styles from './styles/messages.less';

class Messages extends React.Component {
  carouselRef = React.createRef();

  state = {
    pageIndex: 0,
  };

  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  };

  paginationRender = (page, type, originalElement) => {
    switch (type) {
      case 'prev':
        return (
          <Button
            shape="circle"
            icon="left"
            onClick={() => {
              this.carouselRef.current.slick.slickPrev();
            }}
          />
        );

      case 'next':
        return (
          <Button
            shape="circle"
            icon="right"
            onClick={() => {
              this.carouselRef.current.slick.slickNext();
            }}
          />
        );

      default:
        return originalElement;
    }
  };

  render() {
    const { users } = this.props;
    const { pageIndex } = this.state;

    return (
      <>
        <div className={styles.header}>
          <Img />

          <div className={styles.text}>要回家投票的人說</div>
        </div>

        <Carousel
          ref={this.carouselRef}
          className={styles.carousel}
          afterChange={current => {
            this.setState({ pageIndex: current });
          }}
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

        <div className={styles.buttons}>
          <Pagination
            current={Math.floor(pageIndex / 3) + 1}
            total={users.length}
            itemRender={this.paginationRender}
            onChange={page => {
              this.carouselRef.current.slick.slickGoTo((page - 1) * 3);
            }}
            pageSize={6}
          />

          <div className={styles.info}>{users.length} 筆</div>
        </div>
      </>
    );
  }
}

export default createFragmentContainer(
  Messages,
  graphql`
    fragment Messages_users on User @relay(plural: true) {
      id
      name
      fromCity
      toCity
      message
    }
  `,
);
