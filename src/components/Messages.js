import React from 'react';
import PropTypes from 'prop-types';
import { graphql, createFragmentContainer } from 'react-relay';
import { Button, Carousel, Pagination } from 'antd';

import Img from 'static/MessageImg.svg';
import ArrowIcon from 'static/ArrowIcon.svg';

import styles from './styles/messages.less';

class Messages extends React.Component {
  carouselRef = React.createRef();

  carouselSmallRef = React.createRef();

  state = {
    pageIndex: 0,
    smallPageIndex: 0,
  };

  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  };

  paginationRender = ref => (page, type, originalElement) => {
    switch (type) {
      case 'prev':
        return (
          <Button
            shape="circle"
            icon="left"
            onClick={() => {
              ref.current.slick.slickPrev();
            }}
          />
        );

      case 'next':
        return (
          <Button
            shape="circle"
            icon="right"
            onClick={() => {
              ref.current.slick.slickNext();
            }}
          />
        );

      default:
        return originalElement;
    }
  };

  render() {
    const { users } = this.props;
    const { pageIndex, smallPageIndex } = this.state;

    return (
      <>
        <div className={styles.header}>
          <Img />

          <div className={styles.text}>要回家投票的人說</div>
        </div>

        <>
          {[
            {
              key: 'normal',
              ref: this.carouselRef,
              asNavFor: this.carouselSmallRef.current,
              size: 3,
            },
            {
              key: 'small',
              ref: this.carouselSmallRef,
              asNavFor: this.carouselRef.current,
              size: 1,
            },
          ].map(({ key, size, ref, ...props }) => (
            <React.Fragment key={key}>
              <Carousel
                {...props}
                ref={ref}
                slidesToShow={size}
                slidesToScroll={size}
                className={`${styles.carousel} ${
                  key === 'small' ? styles.small : ''
                }`}
                afterChange={current => {
                  this.setState({
                    [key === 'small' ? 'smallPageIndex' : 'pageIndex']: current,
                  });
                }}
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

              <div
                className={`${styles.buttons} ${
                  key === 'small' ? styles.small : ''
                }`}
              >
                <Pagination
                  current={
                    Math.floor(
                      (key === 'small' ? smallPageIndex : pageIndex) / size,
                    ) + 1
                  }
                  total={users.length}
                  itemRender={this.paginationRender(ref)}
                  onChange={page => {
                    ref.current.slick.slickGoTo((page - 1) * size);
                  }}
                  pageSize={size * 2}
                />

                <div className={styles.info}>{users.length} 筆</div>
              </div>
            </React.Fragment>
          ))}
        </>
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
