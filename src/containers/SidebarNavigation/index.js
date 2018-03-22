import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { NavLink, withRouter  } from 'react-router-dom';
import PropTypes from 'prop-types';
const { Sider } = Layout;

class SidebarNavigation extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }
  state = {
    collapsed: JSON.parse(localStorage.getItem('menuColapsed')),
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
    localStorage.setItem('menuColapsed', JSON.stringify(collapsed));
  }
  render() {
    const { location } = this.props;
    return (
      <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          style={{'position': 'relative'}}
        >
          <Menu 
            style={{'position': 'fixed', width: this.state.collapsed ? '80px' : '200px'}}
            theme="dark"
            defaultSelectedKeys={['/']}
            selectedKeys={[location.pathname]}
            mode="inline"
          >
            <Menu.Item key="/">
              <NavLink to='/'>
                <Icon type="home" />
                <span>Home</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/sprints/active">
              <NavLink to='/sprints/active'>
                <Icon type="table" />
                <span>Active Sprints</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/task">
              <NavLink to='/task'>
                <Icon type="safety" />
                <span>Task</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
    );
  }
}

export default withRouter(SidebarNavigation);
