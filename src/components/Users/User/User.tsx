//import React from 'react';
import classes from './User.module.css';
import userNoImage from '../../../images/sinessman-avatar.jpg';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../common/Types';

type PropsType = {
      user: UserType
      followingInProgress: Array<number>
      unfollow: (userId: number | null ) => void
      follow: (userId: number | null ) => void
}

const User: React.FC<PropsType> = ({ user, followingInProgress, unfollow, follow }) => {

      return (
            <div className={classes.usersDescription} >
                  <span>
                        <div className={classes.avatar}>
                              <NavLink to={"/profile/" + user.id}>
                                    <img src={user?.photos?.small ?
                                          user.photos.small :
                                          userNoImage
                                    } alt="avatarUrl" />
                              </NavLink>
                        </div>
                        <div>
                              {user.followed ?
                                    <button className={classes.setFolowingButton}
                                          disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => unfollow(user.id)}
                                    >Unfollow</button> :
                                    <button className={classes.setFolowingButton}
                                          disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => follow(user.id)}
                                    >Follow</button>
                              }
                        </div>
                  </span>
                  <span>
                        <span>
                              <div>{user.name}</div>
                              <div>{user.status}</div>
                        </span>
                        <span>
                              <div>{user.uniqueUrlName}</div>
                              <div>{"user.location.city"}</div>
                        </span>
                  </span>
            </div>)


}

export default User;