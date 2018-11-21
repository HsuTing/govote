import React from 'react';

import Vote from 'static/Vote.svg';
import FBIcon from 'static/FBIcon.svg';
import LineIcon from 'static/LineIcon.svg';
import TwitterIcon from 'static/TwitterIcon.svg';

import styles from './styles/share.less';

export default class Index extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className={styles.root}>
        <Vote />

        <h2>
          歡迎將網站分享出去，鼓勵更多人一起
          <div className={styles.special}>
            <div className={styles.text}>「#1124為愛返家」</div>

            <div className={styles.border} />
          </div>
          吧！
        </h2>

        <div>
          {[
            {
              url: 'http://www.facebook.com/share.php?u=',
              Icon: FBIcon,
            },
            {
              url: 'http://line.naver.jp/R/msg/text/?',
              Icon: LineIcon,
            },
            {
              url: 'https://twitter.com/intent/tweet?text=',
              Icon: TwitterIcon,
            },
          ].map(({ url, Icon }) => (
            <a
              key={url}
              href={`${url}https://govote-tw.herokuapp.com`}
              target="_blank"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    );
  }
}
