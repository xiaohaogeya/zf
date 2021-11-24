// 导入要使用的组件
// import {Button} from "antd-mobile"

// 导入路由组件
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"

import Home from "./pages/Home";
import CityList from "./pages/CityList";
import Map from "./pages/Map";

export default function App() {
    return (
        <Router basename="zf">
            <div className="App">
                {/* 默认路由匹配时，跳转到 /home 实现路由重定向*/}
                <Route path="/" exact render={() => <Redirect to="/home"/>}/>

                {/* 路由出口*/}
                <Route path="/home" component={Home} />
                <Route path="/cityList" component={CityList} />
                <Route path="/map" component={Map} />

            </div>
        </Router>
    );
}




