import React, { Component } from 'react';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Fade,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Label,
    Row,
    Table
  } from 'reactstrap';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../firebase';

function UserRow(propss) {
  const user = propss.user
  const userLink = `/modelClusterAdd/${user.uid}`

  const getBadge = (roles) => {
    return roles === 'ADMIN' ? 'success' :
            roles === 'EVALUATOR' ? 'secondary' :
            roles === 'USER' ? 'warning' :
            roles === '' ? 'danger' :
            'primary'
  }

  return (
    <tr >
      <th scope="row"><Link to={userLink}><Badge size="50" color="primary"><i className="fa fa-plus fa-lg mt-2"></i> Add Cluster</Badge></Link></th>
      <td>{user.nip}</td>
      <td>{user.firstname}</td>
      <td>{user.email}</td>
      <td>{user.lastname}</td>
      <td>{user.phone}</td>
      <td><Link to={userLink}><Badge color={getBadge(user.roles)}>{user.roles}</Badge></Link></td>
    </tr>
  )
}

function LinkUserList(user){
  const User = user.user
  const userLink = `/users/${User.id}`
  return (
  <Link to={userLink} ><Badge size="20" color="success">View</Badge></Link>
  )
}

class Kompetens extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange2 = this.handleChange2.bind(this);
    
    this.state = {
      loading: false,
      users: [],
      name_model:'',
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .users()
      .onSnapshot(snapshot => {
        let users = [];

        snapshot.forEach(doc =>
          users.push({ ...doc.data(), uid: doc.id }),
        );

        this.setState({
          users,
          loading: false,
        });
    });
  }

    componentWillUnmount() {
        this.unsubscribe()
    }

    handleSubmit (e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const name_model = data.get('model_kompeten')

        if(name_model != ''){
            const addRef = this.props.firebase.kompetens();
            addRef.add({
            name_model,
            }).then((docRef) => {
            this.setState({
            name_model: ''
            });
            // this.props.history.push("/Kompetens")
            document.getElementById('model_kompeten').value =''
            swal("Success Add Data")
            })
            .catch((error) => {
            console.error("Error adding document: ", error);
            });
        }else{
            swal("Input Name Model")
        }
    }

  render() {
    const { users, loading } = this.state;
    const usersList = users.filter((user) => user.firstname == 'juni')
    console.log(users)

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
              <i className="fa fa-plus fa-lg mt-2"></i>
              Add Kompeten
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup row>
                    <Col md="12">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-books"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="model_kompeten" name="model_kompeten" placeholder="Nama Kompeten" />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <CardFooter >
                <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Submit</Button>
              </CardFooter>
                </Form>
                
              </CardBody>
              
            </Card>
          </Col>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> List <small className="text-muted">Kompeten</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">NIP</th>
                      <th scope="col">Firstname</th>
                      <th scope="col">LastName</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) =>
                      <UserRow key={index} user={user}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
    </div>
    )
  }
}

export default withFirebase(Kompetens);
