import React from 'react';
import ReactDOM from 'react-dom';

// 导入组件样式
import 'antd-mobile/dist/antd-mobile.css'

// 导入react-virtualized样式
import "react-virtualized/styles.css"

// 导入字体图标库的样式文件
import "./assets/fonts/iconfont.css"

// 自己写的样式要在组件库样式导入之后，不然会被覆盖掉
import './index.css';

import App from './App';


ReactDOM.render(
    <App />
  ,
  document.getElementById('root')
);
