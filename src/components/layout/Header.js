import React, { Component } from 'react';
import { Navbar, Nav, /*NavDropdown, MenuItem,*/ FormControl, FormGroup, Modal, Button} from 'react-bootstrap';
import NavItem from './NavItem/NavItem';
import Auth from '../../modules/Auth';

export default class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      email: '',
      password: '',
      username: Auth.getUsername(),
      loginErrorMessage: ''
    }

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(e) {
    e.preventDefault();
    Auth.logIn(this.state.email, this.state.password, (success) => {
      if (success) {
        this.setState({ username: Auth.getUsername() });
        this.close();
      } else {
        this.setState({ loginErrorMessage: 'Unable to Log In'});
      }
    });
  }

  logout(e) {
    e.preventDefault();

    Auth.logOut((success) => {
      if (success) {
        this.setState({ username: '' });
      }
    });
  }

  render() {

    const { email, password, username } = this.state;

    return (
      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">HOME</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/books">Books</NavItem>
              <NavItem eventKey={2} href="/authorized">Authorized</NavItem>
              {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.4}>Separated link</MenuItem>
              </NavDropdown> */}
            </Nav>
            <Nav pullRight>
              <NavItem
                eventKey={4}
                onClick={this.open}>
                { username ?  username : `Log In` }
              </NavItem>
              { username ?
                <NavItem
                  eventKey={5}
                  onClick={this.logout}>
                  Log Out
                </NavItem> :
                ''
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Modal
          show={this.state.showModal}
          onHide={this.close}
          bsSize="small"
          >
          <Modal.Body>
            <form style={{ textAlign: 'center' }}>
              <FormGroup>
                <FormControl
                  value={email}
                  onChange={this.onEmailChange}
                  placeholder="E-Mail"
                  />
                <FormControl
                  type="password"
                  value={password}
                  onChange={this.onPasswordChange}
                  placeholder="Password"
                  />
              </FormGroup>
              <div style={{ color: 'red' }}>{this.state.loginErrorMessage}</div>
              <Button
                type="submit"
                onClick={this.login}
                >
                Log In
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }

  close() {
    this.setState({ showModal: false, loginErrorMessage: '' });
  }

  open() {
    this.setState({ showModal: true });
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }
}
