import React, { Component, SomeCustomComponent, CustomToolbar,CustomToolbarSelect,TableRow, TableCell } from 'react';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    Table,Label,
    Modal, ModalBody, ModalFooter, ModalHeader
  } from 'reactstrap';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

import Users from './Users'
import UsersData from './UsersData'
import { withFirebase } from '../../firebase';
// import '../assets/scss/mdb.scss'
// import '../../assets/scss/mdb.scss'
import { MDBDataTable } from 'mdbreact';
import DataTable from 'react-data-table-component';
// import datetime from 'node-datetime';
import MUIDataTable from "mui-datatables";
// import ReactExport from "react-data-export";
import ReactTable from 'react-table'
import ReactExport from "react-data-export";

const columns = [
  {
      Header: 'name',
      accessor: 'name', // String-based value accessors!
  },
  {
      Header: 'age',
      accessor: 'age',

 }]

 


class Profile extends Component {
  constructor(props) {
    super(props);
    // this.handleChange = this.
    this.handleChange = this.handleChange.bind(this);
    this.togglePrimary3 = this.togglePrimary3.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.state = {
      users : [],
      nama :'',
      jabatan :'',
      firstname :'',
      lastname :'',
      nip :'',
      phone :'',
      passwordone:'',
      passwordtwo:'',
      action:'',
      toggledClearRows: false,
      authUser: JSON.parse(localStorage.getItem('authUser')),
      primary2:false,
    }
  }
  
  componentDidMount() {
    this.unsubscribe=  this.props.firebase.user(this.state.authUser.uid)
      .onSnapshot(snapshot => {
          const data = snapshot.data()
          this.setState({
          firstname: data.firstname,
          lastname: data.lastname,
          nip: data.nip,
          jabatan: data.jabatan,
          email: data.email,
          phone: data.phone,
          });
        });
  }

  componentWillUnmount() {
    this.unsubscribe()
    // this.unsubscribe && this.unsubscribe();
}

handleChange =event =>{
    event.preventDefault()
    this.setState({
                  [event.target.name]: event.target.value,
                });
}

togglePrimary3(e) {
    e.preventDefault();
    const {id_user,password} = this.state
    const user_ = this.props.firebase.cekuser();
    const attribute = document.getElementsByClassName(e.target.className)[0]; 
    let action = attribute.getAttribute("action")
    this.setState({
      primary2: !this.state.primary2,
      action : action,
      // disabled:"disabled",
    });
    
  }

cancel2 =event =>{
    event.preventDefault()
    this.setState({
      primary2: !this.state.primary2,
      });
}

handleChangePassword =e=> {
  e.preventDefault();
  const { passwordone, passwordtwo, password, authUser} = this.state;
    if(passwordone !== passwordtwo || passwordone === ''){
      swal('Info','Password Tidak Sama','info')
    }else{
      // this.props.firebase
      //   .doPasswordUpdate(passwordone)
      //   .then(() => {
        var cityRef = this.props.firebase
        .user(authUser.uid)

        var setWithMerge = cityRef
            .set({
              password:passwordone,
            }, { merge: true })
            .then(() => {
              this.setState({
                passwordone:'',
                passwordtwo:'',
                primary2: !this.state.primary2,
              })
              swal("Success","Success Update Password","success")
            })
            // .catch((error) => {
            //   this.setState({ error });
            // swal("Failed Update Password")
              
            // });
          
          // swal('Success','success update password','success')
        // })
        // .catch(error => {
        //   this.setState({ error });
        //   swal('Error',error.message,'error')
        // });
    }
  }

  render() {
    const {jabatan, nip, firstname, lastname, email, phone, passwordone, passwordtwo} = this.state

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
          <Card >
            <Row>
            
            <Col md={2}></Col>
            <Col md={8}>
            <br/>
            <Card >
            <CardHeader >
              <small className="text-muted">Profile</small>
              </CardHeader>
              <CardBody>
              <Row>
              <Col md="4">
              <img src={'../../assets/img/avatars/6.png'} className="img-avatar"/>
              </Col>
              <Col md="8" >
              <p>{nip}</p>
              <p >{firstname}</p>
              <p>{lastname}</p>
              <p>{jabatan}</p>
              <p>{email}</p>
              <p>{phone}</p>
              <hr/>
              <Button color="primary" onClick={this.togglePrimary3} className="mr-1" action="Change"><i className="fa fa-wrench fa-lg mt-2" action="Change"> Change Password</i></Button>
              </Col>
              </Row>
              </CardBody>
              </Card >
              </Col>
              <Col md={2}>
              {/* <Button color="primary" onClick={this.togglePrimary3} className="mr-1" action="Change"><i className="fa fa-wrench fa-lg mt-2" action="Change"> Change Password</i></Button> */}
              </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.primary2} toggle={this.togglePrimary2}
                        className={'modal-primary ' + this.props.className}>
                    <ModalHeader toggle={this.cancel2}>{this.state.action} Password</ModalHeader>
                    <Form onSubmit={this.handleChangePassword}>
                    <ModalBody>
                            <FormGroup row>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="password" id="passwordone" name="passwordone" placeholder="New Password" value={this.state.passwordone} onChange={this.handleChange} />
                                    </InputGroup>
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="password" id="passwordtwo" name="passwordtwo" placeholder="Confirm New Password" value={this.state.passwordtwo} onChange={this.handleChange} />
                                    </InputGroup>
                                </Col>
                            </FormGroup>
                            {/* <CardFooter >
                                <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                            </CardFooter> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" >Update</Button>{' '}
                        <Button color="secondary" onClick={this.cancel2}>Cancel</Button>
                    </ModalFooter>
                    </Form>
                    </Modal>
        {/* <ExcelFile element={<Button color="primary"><i className="cui-cloud-download icons font-3xl"></i></Button>}>
                <ExcelSheet data={dataSet1} name="Employees">
                    <ExcelColumn label="Name" value="name"/>
                    <ExcelColumn label="Wallet Money" value="amount"/>
                    <ExcelColumn label="Gender" value="sex"/>
                    <ExcelColumn label="Marital Status"
                                 value={(col) => col.is_married ? "Married" : "Single"}/>
                </ExcelSheet>
                <ExcelSheet data={dataSet2} name="Leaves">
                    <ExcelColumn label="Name" value="name"/>
                    <ExcelColumn label="Total Leaves" value="total"/>
                    <ExcelColumn label="Remaining Leaves" value="remaining"/>
                </ExcelSheet>
            </ExcelFile>
            <div>
                    <button onClick={this.download}>
                        Download
                    </button>
                </div>
        <MUIDataTable
        title="Arnold Movies"
        columns={columns}
        data={data.map((item, index) => {
          return [
            <Button key={item} state={index} onClick={this.handleChange}>
              {index}
            </Button>,item[1],item[2]
          ];
        })}
        options={options}
      /> */}
       
        {/* <MDBDataTable
          striped
          bordered
          hover
        data={UsersData}
        /> */}
      </div>

    )
  }
}

export default withFirebase(Profile);
