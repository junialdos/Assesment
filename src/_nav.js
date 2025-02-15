import React from 'react';
import { BrowserRouter as Router,Link, Route } from 'react-router-dom';
import { Card, CardBody, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';

import { AuthConsumer as AuthUserContext } from './AuthContext';

const Navigation = () => {
  var authUser = JSON.parse(localStorage.getItem('authUser'))
  return authUser ? (<NavigationAuth authUser={authUser} />) :
    ( <NavigationNonAuth />)
}
// const Navigation = () => (
//   <AuthUserContext>
//     {({ authUser, login, logout })=>
//       authUser ? (
//         <NavigationAuth authUser={authUser} />
//       ) : (
//         <NavigationNonAuth />
//       )
//     }
//   </AuthUserContext>
// );

const NavigationAuth = ({ authUser }) => (
  <div>
    {authUser &&  authUser.roles.includes("ADMIN") && authUser.wilayah == "PUSAT" && (
      <div>
        <CardBody>
            {authUser.roles}
        </CardBody>
        <Nav>
          <NavItem>
            <Link to="/users" className="nav-link"><i className="icon-people"></i> Anggota</Link>
          </NavItem>
          <NavItem className="d-md-down-none">
            <Link to="/wilayah" className="nav-link"><i className="icon-globe"></i> Wilayah</Link>
          </NavItem>
          <NavItem className="d-md-down-none">
            <Link to="/Jabatan" className="nav-link"><i className="icon-wrench"></i> Roles</Link>
          </NavItem>
          <NavItem className="d-md-down-none">
            <Link to="/Kompetens" className="nav-link"><i className="icon-shield"></i> Kompetensi</Link>
          </NavItem>
          <NavItem className="d-md-down-none">
            <Link to="/Hasil" className="nav-link" color="red"><i className="icon-note"></i> Hasil</Link>
          </NavItem>
          <NavItem className="d-md-down-none">
            <Link to="/Message" className="nav-link" color="red"><i className="icon-note"></i> Message</Link>
          </NavItem>
        </Nav>
      </div>
    )}
    {authUser.roles.includes("ADMIN") && authUser.wilayah != "PUSAT" &&  (
      <div>
        <CardBody>
            {authUser.roles}
        </CardBody>
        <Nav>
          <NavItem className="d-md-down-none">
            <Link to="/Hasil" className="nav-link" color="red"><i className="icon-note"></i> Hasil</Link>
          </NavItem>
          <NavItem className="d-md-down-none">
            <Link to="/Message" className="nav-link" color="red"><i className="icon-note"></i> Message</Link>
          </NavItem>
        </Nav>
      </div>
    )}
    {authUser.roles.includes("EVALUATOR") && (
      <div>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <Link to="/myprofile" ><i className="icon-bell"></i> My Profile</Link>
          </NavItem>
          <NavItem className="d-md-down-none">
            <Link to="/users" className="nav-link"><i className="icon-list"></i> Users</Link>
          </NavItem>
          <NavItem className="d-md-down-none">
            <Link to="/report" className="nav-link"><i className="icon-location-pin"></i> Report</Link>
          </NavItem>
          </Nav>
      </div>
    )}
    {authUser.roles.includes("ASSESMENT") && (
      <div>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <Link to="#" ><i className="icon-bell"></i> Assesment</Link>
          </NavItem>
          <NavItem className="d-md-down-none">
            <Link to="#" className="nav-link"><i className="icon-list"></i> Config</Link>
          </NavItem>
          <NavItem className="d-md-down-none">
            <Link to="#" className="nav-link"><i className="icon-location-pin"></i> Report</Link>
          </NavItem>
          </Nav>
      </div>
    )}
  </div>
);

const NavigationNonAuth = () => (
  <div>
    <CardBody>
    <i className="fa fa-refresh"></i>refresh page
    </CardBody>
  </div>
);

export default Navigation;