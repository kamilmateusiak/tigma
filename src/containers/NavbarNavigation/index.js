import React, { Component } from 'react';
import { Menu, Icon, Dropdown, Avatar } from 'antd';
import { NavLink } from 'react-router-dom';
import { graphql, compose } from 'react-apollo'
import _ from 'lodash';
import gql from 'graphql-tag'
const SubMenu = Menu.SubMenu;

class NavbarNavigation extends Component {
  dropdownActions = async ({key}) => {
    if (key === 'logout') {
      await this.props.mutate()
      window.location.reload();
    }
  }

  userMenu = (
    <Menu onClick={this.dropdownActions}>
      <Menu.Item key='profile'>
        <div>Profile</div>
      </Menu.Item>
      <Menu.Item key='logout'>
        <div>Logout</div>
      </Menu.Item>
    </Menu>
  );

  render() {
    const { me: user } = this.props
    return (
      <Menu
        mode="horizontal"
        selectable={false}
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px', display: 'flex', justifyContent: 'flex-end', padding: '0 20px'}}
      >
        <SubMenu key="sub1" title={<span><Icon type="book" /><span>Projects</span></span>}>
          {user && user.projects && _.filter(_.sortBy(user.projects, 'project_name'), p => p.project_type === 'project' && p.project_status === 'active').map(project => {
            return <Menu.Item key={project.project_slug}><NavLink to={`/project/${project.project_slug}`}>{project.project_name}</NavLink></Menu.Item>
          })}
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="book" /><span>Processes</span></span>}>
          {user && user.projects && _.filter(_.sortBy(user.projects, 'project_name'), p => p.project_type === 'process' && p.project_status === 'active').map(project => {
            return <Menu.Item key={project.project_slug}><NavLink to={`/project/${project.project_slug}`}>{project.project_name}</NavLink></Menu.Item>
          })}
        </SubMenu>
        <SubMenu key="sub3" title={<span><Icon type="book" /><span>Campaigns</span></span>}>
          {user && user.projects && _.filter(_.sortBy(user.projects, 'project_name'), p => p.project_type === 'campaign' && p.project_status === 'active').map(project => {
            return <Menu.Item key={project.project_slug}><NavLink to={`/project/${project.project_slug}`}>{project.project_name}</NavLink></Menu.Item>
          })}
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="book" /><span>Sale</span></span>}>
          {user && user.projects && _.filter(_.sortBy(user.projects, 'project_name'), p => p.project_type === 'negotiation' && p.project_status === 'active').map(project => {
            return <Menu.Item key={project.project_slug}><NavLink to={`/project/${project.project_slug}`}>{project.project_name}</NavLink></Menu.Item>
          })}
        </SubMenu>
        <Dropdown overlay={this.userMenu}>
          <div style={{minWidth: '150px'}}><Avatar icon="user" style={{alignSelf: 'center', margin: '0 10px'}}></Avatar> {user && user.display_name} </div>
        </Dropdown>
      </Menu>
    )
  }
}

const USER_QUERY = gql`
  query {
    me {
			ID
      display_name
			projects {
        project_id
				project_name
        project_slug
        project_type
        project_status
			}
    }
  }
`

const USER_LOGOUT = gql`
  mutation {
    logout
  }
`

export default compose(
  graphql(USER_QUERY, {
    props: ({ data }) => ({...data})
  }),
  graphql(USER_LOGOUT),
)(NavbarNavigation);