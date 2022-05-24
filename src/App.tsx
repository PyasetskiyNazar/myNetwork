import React from 'react'
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import { Header } from './components/Header/Header';
import UsersPage from './containers/UsersPage';
import Login from './components/Login/Login';
import { useEffect } from 'react'
import { connect } from 'react-redux';
import { initializationSuccess } from './reducers/appReducer'
import Preloader from './components/common/Preloader/Preloader';
import { AppStateType } from './redux-store/redux-store';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import withSuspense from './components/HOC/withSuspense';


const DialogsContainer = React.lazy(() => import('./containers/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./containers/ProfileContainer'));
const ChatPage = React.lazy(() => import('./components/pages/ChatPage'));

// hoc component withSuspense
const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedChatPage = withSuspense(ChatPage)


const { Content, Footer, Sider } = Layout;



type MapDispatchPropsType = {
  initializationSuccess: () => void
}
type MapStatePropsType = ReturnType<typeof mapStateToProps>

const App: React.FC<MapDispatchPropsType & MapStatePropsType> = (props) => {
  useEffect(() => {
    props.initializationSuccess();
  }, [initializationSuccess])


  if (!props.initialization) {
    return <Preloader />
  }
  return (
    <div className="App">
      <Layout>
        <BrowserRouter>

          <Header />

          <Content style={{ padding: '0 50px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
            <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
              <Sider className="site-layout-background" width={200}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%' }}
                //items={items2}
                >
                  <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                    <Menu.Item key="1"> <NavLink to="/profile">Profile</NavLink></Menu.Item>
                    <Menu.Item key="2"> <NavLink to="/dialogs">Messages</NavLink></Menu.Item>
                    <Menu.Item key="3">option3</Menu.Item>

                  </SubMenu>
                  <SubMenu key="sub2" icon={<LaptopOutlined />} title="Users">
                    <Menu.Item key="5"><NavLink to="/users">Users</NavLink></Menu.Item>
                    <Menu.Item key="6">option6</Menu.Item>

                  </SubMenu>
                  <SubMenu key="sub3" icon={<NotificationOutlined />} title="Chat Page">
                    <Menu.Item key="9"><NavLink to="/chat">Chat</NavLink></Menu.Item>
                    <Menu.Item key="10">option10</Menu.Item>

                  </SubMenu>
                </Menu>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>

                <Routes>
                  <Route path="/"
                    element={<SuspendedProfile />}
                  />
                  <Route path="/login"
                    element={<Login />}
                  />
                  <Route path="/dialogs/*"
                    element={<SuspendedDialogs />}
                  />
                  <Route path={"/profile"}
                    element={<SuspendedProfile />}
                  />
                  <Route path={"/profile/:userId"}
                    element={<SuspendedProfile />}
                  />
                  <Route path="/users"
                    element={<UsersPage />}
                  />
                  <Route path="/chat"
                    element={<SuspendedChatPage />}
                  />
                  <Route path="/*"
                    element={<div>404 NOT FOUND</div>}
                  />
                </Routes>

              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Nazar Enterprise ©2022 Created by Nazar Enterprise</Footer>
        </BrowserRouter>
      </Layout >
    </div>
  )
}

const mapStateToProps = (state: AppStateType) => ({
  initialization: state.initialize.initialisation
})

export default connect(mapStateToProps, { initializationSuccess })(App);
