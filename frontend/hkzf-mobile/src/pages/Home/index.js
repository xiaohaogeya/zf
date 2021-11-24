import React from "react";
import { Route } from "react-router-dom";

import News from "../News";
import HouseList from "../HouseList";
import Profile from "../Profile";
import Index from "../Index";

import { TabBar } from "antd-mobile";

import "./index.css"

// TarBar 数据
const tabItems = [
  {
    title: '首页',
    icon: 'icon-ind',
    path: '/home'
  },
  {
    title: '找房',
    icon: 'icon-findHouse',
    path: '/home/list'
  },
  {
    title: '咨询',
    icon: 'icon-infom',
    path: '/home/news'
  },
  {
    title: '我的',
    icon: 'icon-my',
    path: '/home/profile'
  },

]


export default class Home extends React.Component {
  state = {
    // 默认选择TabBar菜单项
    selectedTab: this.props.location.pathname,
  };
  renderTabItems(){
    return tabItems.map(item => (
      <TabBar.Item
              title={item.title}
              key={item.title}
              icon={<i className={`iconfont ${item.icon}`}></i>}
              selectedIcon={<i className={`iconfont ${item.icon}`}></i>}
              selected={this.state.selectedTab === item.path}
              onPress={() => {
                this.setState({
                  selectedTab: item.path,
                });
                
                // 路由切换
                this.props.history.push(item.path)
              }}
              data-seed="logId"
            >
      </TabBar.Item>
    ))
  }

  componentDidUpdate(prevProps){
    if (prevProps.location.pathname !== this.props.location.pathname) {
        this.setState(() => {
          return {
            selectedTab: this.props.location.pathname
          }
        })
    }
  }

  render() {
    return (
      <div className='home'>

        <Route path="/home/news" component={News} />
        <Route exact path="/home" component={Index} />
        <Route path="/home/list" component={HouseList} />
        <Route path="/home/profile" component={Profile} />

          <TabBar tintColor="#21b97a" barTintColor="white" noRenderContent={true} >
            {this.renderTabItems()}
          </TabBar>
        </div>
    );
  }
}
