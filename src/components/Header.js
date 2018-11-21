import React from 'react';
import { Affix, Button } from 'antd';

import Img from 'static/MapImg.svg';

import styles from './styles/header.less';

export default class Header extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <>
        <Affix>
          <header className={styles.header}>
            <div className={styles.info}>我們支持婚姻平權&性平教育</div>

            <a href="https://harrison98.typeform.com/to/pJAGob" target="_blank">
              <Button className={styles.button} type="primary">
                我會回家投票
              </Button>
            </a>
          </header>
        </Affix>

        <div className={styles.root}>
          <div className={styles.info}>
            <h1>
              投票的地方可能很遠，
              <br />
              但投票能讓美好的未來更近一些。
            </h1>

            <h4>告訴大家你會怎麼回家投票, 可以鼓勵更多人一起回家投票噢!</h4>

            <a href="https://harrison98.typeform.com/to/pJAGob" target="_blank">
              <Button className={styles.button} type="primary">
                我會回家投票
              </Button>
            </a>
          </div>

          <Img className={styles.map} />
        </div>
      </>
    );
  }
}
