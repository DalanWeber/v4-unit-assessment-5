import React, { Component } from 'react';
import axios from 'axios';
import homeLogo from './../../assets/home_logo.png';
import newLogo from './../../assets/new_logo.png';
import logoutLogo from './../../assets/shut_down.png';
import './Nav.css';
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import updateUser from '../../redux/reducer'
import logout from '../../redux/reducer'

class Nav extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser()
  }

  getUser() {
    axios.get('/api/auth/me')
    .then(res => this.props.updateUser(res))
  }
  
  logout() {
    axios.post('/api/auth/logout')
      .then(_ => this.props.logout)
  }
  
  render() {
      return this.props.location.pathname !== '/' &&
        <div className='nav'>
          <div className='nav-profile-container'>
            <div style={{backgroundImage:`url(${this.props.profile_pic})`}} className='nav-profile-pic'></div>
            <p>{this.props.username}</p>
          </div>
          <div className='nav-links'>
            <Link to='/Dash'><img className='nav-img' src={homeLogo} alt='home' /></Link>
            <Link to='/Form'><img className='nav-img' src={newLogo} alt='new post' /></Link>
          </div>
          <Link to='/' onClick={this.logout}><img className='nav-img logout' src={logoutLogo} alt='logout' /></Link>
        </div>
  }
}

const mapStateToProps = (store) => store.reducer

export default withRouter(connect(mapStateToProps, {updateUser, logout})(Nav));