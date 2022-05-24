import classes from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { AppleOutlined, TeamOutlined, SolutionOutlined, MessageOutlined, NotificationOutlined, CustomerServiceOutlined, SettingOutlined } from '@ant-design/icons'

const Navbar: React.FC = () => {
    return (
        <nav className={classes.navbarContainer}>
            <div className={`${classes.itemNavigation} ${classes.active}`}>
                <ul>
                    <li>
                        <NavLink
                            className={navbarData => navbarData.isActive ? classes.activeLink : classes.item}
                            to="">
                            <span className={classes.icon}><AppleOutlined /></span>
                            <span className={classes.title}>Brand Name</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={navbarData => navbarData.isActive ? classes.activeLink : classes.item}
                            to="/profile">
                            <span className={classes.icon}><SolutionOutlined /></span>
                            <span className={classes.title}>Profile</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={navbarData => navbarData.isActive ? classes.activeLink : classes.item}
                            to="/dialogs">
                            <span className={classes.icon}><MessageOutlined /></span>
                            <span className={classes.title}>Message</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={navbarData => navbarData.isActive ? classes.activeLink : classes.item}
                            to="/news">
                            <span className={classes.icon}><NotificationOutlined /></span>
                            <span className={classes.title}>News</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={navbarData => navbarData.isActive ? classes.activeLink : classes.item}
                            to="/music">
                            <span className={classes.icon}><CustomerServiceOutlined /></span>
                            <span className={classes.title}>Music</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={navbarData => navbarData.isActive ? classes.activeLink : classes.item}
                            to="/settings">
                            <span className={classes.icon}><SettingOutlined /></span>
                            <span className={classes.title}>Settings</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={navbarData => navbarData.isActive ? classes.activeLink : classes.item}
                            to="/users">
                            <span className={classes.icon}><TeamOutlined /></span>
                            <span className={classes.title}>Users</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;