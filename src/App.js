import React, { Component } from 'react';
import './App.css';
import Task from './components/Task.js';
import Project from './containers/Project';
import Dashboard from './containers/Dashboard'
import SprintsList from './containers/SprintsList'
import SidebarNavigation from './containers/SidebarNavigation'
import NavbarNavigation from './containers/NavbarNavigation'
import Calendar from './containers/Calendar'
import LoginPage from './containers/LoginPage'
import 'react-table/react-table.css'
import { Switch } from 'react-router-dom'
import { Layout } from 'antd';
import { NotAuthRoute, AuthRoute, checkAuth } from './auth';
const { Content, Footer, Header } = Layout;
class App extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        { checkAuth() && <SidebarNavigation /> }
        <Layout>
          { checkAuth() && <Header style={{ 'padding': '0' }}>
            <NavbarNavigation />
          </Header> }
          <Content style={{ 'position': 'relative' , padding: '20px'}}>
            <Switch>
              <AuthRoute exact path='/' component={Dashboard}/>
              <NotAuthRoute path='/login' component={LoginPage} />
              <AuthRoute path='/task' component={Task} />
              <AuthRoute path='/calendar' component={Calendar} />
              <AuthRoute exact path='/project/:slug' component={Project} />
              <AuthRoute path='/sprints/active' component={SprintsList} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
