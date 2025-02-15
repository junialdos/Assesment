import React from 'react'
import { AuthConsumer } from './AuthContext'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';

const headerStyle = {
  display: 'flex',
  backgroundColor: '#26c6da',
  justifyContent: 'space-between',
  padding: 10
}

const linkStyle = {
  color: 'white',
  textDecoration: 'underline'
}

// export default () => (
  // <header>
const Header = () => (
    
    <AuthConsumer>
      {/* {({ authUser, login, logout }) => (
        <div style={headerStyle}>
          <h3>
            <Link style={linkStyle} to="/">
              HOME
            </Link>
          </h3>
          
          {authUser? (
            <ul>
              <Link style={linkStyle} to="/dashboard">
                Dashboard
              </Link>
              <button onClick={logout}>logout</button>
            </ul>
          ) : (
            <button onClick={login}>login</button>
          )}
        </div>
      )} */}
      {({ authUser, login, logout }) =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : null
    }
    </AuthConsumer>
)
    {/* <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer> */}
  const NavigationAuth = ({ authUser }) => (
  <div>
    {
      // authUser.uid == "aldo" && 
      authUser.wilayah == "PUSAT" &&  (
      <div>
        <CardBody>
            {authUser.roles}
        </CardBody>
        <Nav>
          {/* <NavItem>
            <Link to="/users" className="nav-link"><i className="icon-people"></i> Users</Link>
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
          </NavItem> */}
          <NavItem className="d-md-down-none">
            <Link to="/dashboard" className="nav-link" color="red"><i className="icon-note"></i> Hasil</Link>
          </NavItem>
          
          {/* <NavItem className="d-md-down-none">
            <Link to="/Message" className="nav-link" color="red"><i className="icon-note"></i> Message</Link>
          </NavItem> */}
        </Nav>
      </div>
    )}
    {/* {authUser.roles.includes("ADMIN") && authUser.wilayah != "PUSAT" &&  (
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
    )} */}
    {/* {authUser.roles.includes("EVALUATOR") && (
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
    )} */}
    {/* {authUser.roles.includes("ASSESMENT") && (
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
    )} */}
  </div>
);

const NavigationNonAuth = () => (
  <div>
            <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i> Tes</NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem>
          <NavItem>
                <NavLink disabled href="#">Disabled Link</NavLink>
              </NavItem>
          </Nav>
            
            </div>
);
  // </header>
// )
export default Header
