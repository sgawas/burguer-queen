import React, { Component } from 'react';

import './Layout.css';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: true
    }

    SideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer : false});
    }

    drawerToggleClickedHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        })
    }
    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.drawerToggleClickedHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerCloseHandler}/>
                <main className="Content">{this.props.children}</main>
            </Aux>
        );
    }
}

export default Layout;