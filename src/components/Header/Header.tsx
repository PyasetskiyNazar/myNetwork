import React from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, Col, Row, Button, Image } from 'antd';
import { Layout, Menu } from 'antd';
import { selectIsAuth, selectLogin } from './../../reducers/header-selectors';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from './../../reducers/authReducer';
import { AppStateType } from '../../redux-store/redux-store';

export const Header: React.FC = () => {
  const isAuth = useSelector(selectIsAuth)
  const login = useSelector(selectLogin)
  const image = useSelector((state: AppStateType) => state.profilePage.profile?.photos?.large)
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logOut())
  }

  const { Header } = Layout;

  return (

    <Header className="header" >
      <div className="logo" />
      <Row>
        <Col span={18} style={{ backgroundColor: 'green' }}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} >
            <Menu.Item key="1"> <NavLink to="/profile">Profile</NavLink></Menu.Item>
            <Menu.Item key="2"> <NavLink to="/dialogs">Messages</NavLink></Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
          </Menu>
        </Col>


        {isAuth ? <>
          <Col span={1}>
            <Avatar src={<Image src={image} style={{ width: 32 }} />} />
          </Col>
          <Col span={5}>
            <span style={{color:'white'}}>{login}</span> - <Button onClick={onLogout}>Log out</Button>
          </Col> </>
          : <Col span={6}>
            <NavLink to="/login">Login</NavLink>
          </Col>}
      </Row>
    </Header >
  )
}
