import React from "react";
import {withRouter} from "react-router-dom"
import {NavBar} from "antd-mobile"
import PropTypes from "prop-types"
import styles from "./index.module.css"


function NavHeader({children, history, onLeftClick}) {
    const defaultHandler = () => history.go(-1)
    return (
        <NavBar
        mode="light"
        icon={<i className="iconfont icon-back" />}
        onLeftClick={ onLeftClick || defaultHandler}
        className={styles.navBar}
    >
        {children}
    </NavBar>
    )
}


NavHeader.propTypes = {
    children: PropTypes.string.isRequired,
    onLeftClick: PropTypes.func
}

export default withRouter(NavHeader)
