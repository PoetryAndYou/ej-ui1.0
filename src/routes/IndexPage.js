import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

function IndexPage() {
  return (
    <div className={styles.normal}>
      你好，郑州轻工业大学
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
