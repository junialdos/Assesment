import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
  
  import { withFirebase } from '../../firebase';
import MUIDataTable from "mui-datatables";

import { compose } from 'recompose';
// import { AuthUserContext,withAuthorization} from '../../session';
import { auth } from 'firebase';

const columns = [
  {
      name: 'No.',
      options: {
        responsive: 'stacked',
      filter: false,
      sort: false,
      filterType: 'textField',
      },
  },
  {
      name: 'NIP',
      options: {
        responsive: 'stacked',
      filter: true,
      sort: false,
      },
  },
  {
    name: 'Firstname',
    options: {
      responsive: 'stacked',
      filter: true,
    sort: false,
    },
  },
  {
    name: 'Lastname',
    options: {
      responsive: 'stacked',
      filter: true,
    sort: false,
    },
  },
  {
    name: 'Email',
    options: {
      responsive: 'stacked',
      filter: true,
    sort: false,
    },
  },
  // {
  //   name: 'User',
  //   options: {
  //     responsive: 'stacked',
  //     filter: true,
  //   sort: false,
  //   },
  // },
  {
    name: 'Jabatan',
    options: {
      responsive: 'stacked',
      filter: true,
    sort: false,
    },
  },
  {
    name: 'Wilayah',
    options: {
      responsive: 'stacked',
      filter: true,
    sort: false,
    },
  },
  {
      name: 'Action',
      options: {
        responsive: 'stacked',
      filter: false,
      sort: false,
      filterType: 'textField',
      },
  },
]


function UserRow(propss) {
  const user = propss.user
  const userLink = `/users/${user.id}`

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }

  
  return (
    <tr key={user.id.toString()}>
      <th scope="row"><Link to={userLink}>{user.id}</Link></th>
      <td><Link to={userLink}>{user.name}</Link></td>
      <td>{user.registered}</td>
      <td>{user.role}</td>
      <td><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td>
    </tr>
  )
}

function LinkUserList(user){
  const User = user.user
  const userLink = `/users/${User.uid}`
  return (
  <Link to={userLink} ><Badge size="20" color="success">View</Badge></Link>
  )
}

class Users extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.togglePrimary2 = this.togglePrimary2.bind(this);
    this.togglePrimary3 = this.togglePrimary3.bind(this);
    
    this.state = {
      loading: false,
      users: [],
      jabatans: [],
      jabatanmodel:[],
      roles: [],
      wilayahs: [],
      kompetens: [],
      firstname : '',
      lastname : '',
      nip : '',
      email : '',
      phone : '',
      role:'',
      wilayah:'',
      status: false,
      modal: false,
      large: false,
      small: false,
      primary: false,
      action:'',
      id_user:'',
      id_model:'',
      id_jabatan:'',
      jabatan:'',
      password:'',
      passwordone:'',
      passwordtwo:'',
      disabled : "disabled",
      authUser: JSON.parse(localStorage.getItem('authUser')),
      ...props.location.state,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    if(this.state.authUser.wilayah != "PUSAT"){
      this.unsubscribe=  
      this.props.firebase.users()
        .where("roles", "==", ["KARYAWAN BIASA"])
        .where("wilayah", "==", this.state.authUser.wilayah)
        .onSnapshot(snapshot => {
            let users = [];
            snapshot.forEach(doc =>
                // console.log(doc.id)
                // this.props.firebase.UserHasil(doc.uid)
                // .onSnapshot(snapshot2 => {
                //     snapshot2.forEach(doc2 =>
                        users.push({ ...doc.data(), uid:doc.id}),
                    // )
                // })
              )
            this.setState({
                users,
            })
        })
        this.props.firebase
                        .jabatans()
                        .onSnapshot(snapshot => {
                          let jabatans = [];

                          snapshot.forEach(doc =>
                            jabatans.push({ ...doc.data(), uid: doc.id }),
                          );

                          this.setState({
                            jabatans,
                          });
                        })
                        this.props.firebase
                        .roles()
                        .onSnapshot(snapshot => {
                          let roles = [];

                          snapshot.forEach(doc =>
                            roles.push({ ...doc.data(), uid: doc.id }),
                          );

                          this.setState({
                            roles,
                          });
                        })
                        this.props.firebase
                        .wilayahs()
                        .onSnapshot(snapshot => {
                          let wilayahs = [];

                          snapshot.forEach(doc =>
                            wilayahs.push({ ...doc.data(), uid: doc.id }),
                          );

                          this.setState({
                            wilayahs,
                          });
                        })
                        this.props.firebase
                        .kompetensJabatan()
                        .onSnapshot(snapshot => {
                          let jabatanmodel = [];

                          snapshot.forEach(doc =>
                            jabatanmodel.push({ ...doc.data(), uid: doc.id }),
                          );

                          this.setState({
                            jabatanmodel,
                          });
                        })
                        this.unsubscribe = this.props.firebase
                        .kompetens()
                        .onSnapshot(snapshot => {
                          let kompetens = [];
                          snapshot.forEach(doc =>
                              kompetens.push({ ...doc.data(), uid: doc.id }),
                          );

                          this.setState({
                            kompetens,
                          });
                          
                          // console.log(kompetens, columns)
                          // this.setState({
                          //   kompetens,
                          //   loading: false,
                          // });
                      });
                      
        }else{
            this.unsubscribe =  
            this.props.firebase.users()
        // .where("roles", "==", ["KARYAWAN BIASA"])
        .onSnapshot(snapshot => {
            let users = [];
            snapshot.forEach(doc =>
                // console.log(doc.id)
                // this.props.firebase.UserHasil(doc.uid)
                // .onSnapshot(snapshot2 => {
                //     snapshot2.forEach(doc2 =>
                        users.push({ ...doc.data(), uid:doc.id}),
                    // )
                // })
              )
            this.setState({
                users,
            })
        })
        // console.log(this.state.authUser)
        this.props.firebase
                        .jabatans()
                        .onSnapshot(snapshot => {
                          let jabatans = [];

                          snapshot.forEach(doc =>
                            jabatans.push({ ...doc.data(), uid: doc.id }),
                          );

                          this.setState({
                            jabatans,
                          });
                        })
                        this.props.firebase
                        .roles()
                        .onSnapshot(snapshot => {
                          let roles = [];

                          snapshot.forEach(doc =>
                            roles.push({ ...doc.data(), uid: doc.id }),
                          );

                          this.setState({
                            roles,
                          });
                        })
                        this.props.firebase
                        .wilayahs()
                        .onSnapshot(snapshot => {
                          let wilayahs = [];

                          snapshot.forEach(doc =>
                            wilayahs.push({ ...doc.data(), uid: doc.id }),
                          );

                          this.setState({
                            wilayahs,
                          });
                        })
                        this.props.firebase
                        .kompetensJabatan()
                        .onSnapshot(snapshot => {
                          let jabatanmodel = [];

                          snapshot.forEach(doc =>
                            jabatanmodel.push({ ...doc.data(), uid: doc.id }),
                          );

                          this.setState({
                            jabatanmodel,
                          });
                        })
                        this.unsubscribe = this.props.firebase
                        .kompetens()
                        .onSnapshot(snapshot => {
                          let kompetens = [];
                          snapshot.forEach(doc =>
                              kompetens.push({ ...doc.data(), uid: doc.id }),
                          );

                          this.setState({
                            kompetens,
                          });
                          
                          // console.log(kompetens, columns)
                          // this.setState({
                          //   kompetens,
                          //   loading: false,
                          // });
                      });
      } 
                        
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  

  handleSubmit (e) {
    e.preventDefault();
    const { id_user, firstname, lastname, nip,email,phone, jabatan, role, wilayah, action, kompetens, id_model,id_jabatan, password} = this.state;
    const roles_ = [role];
    if(action == 'Save'){
    if(firstname == '' || lastname == '' || nip =='' || email =='' || phone =='' || role == '' || wilayah ==''|| password ==''){
      swal("Info", "Data Belum Lengkap", "info")
    }else{
    // console.log(firstname, lastname, nip,email)
    // this.props.firebase
    //   .doCreateUserWithEmailAndPassword(email, password)
    //   .then(authUser => {
        // Create a user in your Firebase realtime database
        if(id_model == '' ){
          id_model = 'abc1'
        }
        if(id_jabatan == '' ){
          id_jabatan = 'abc1'
        }

        this.props.firebase
          .users()
          .add({
            firstname,
            lastname,
            nip,
            email,
            roles:roles_,
            phone,
            id_model,
            id_jabatan,
            jabatan,
            wilayah,
            password,
            status:false,
          }
          )
          .then(() => {
            this.setState({ 
              firstname:'',
              lastname : '',
              nip : '',
              email : '',
              jabatan:'',
              role:'',
              phone:'',
              id_model:'',
              id_jabatan:'',
              jabatan:'',
              wilayah:'',
              password:'',
              primary: !this.state.primary,
            });
          swal("Success","Success Add User","success")
          })
          .catch(error => {
            this.setState({ error });
          swal("Failed Add User")
            
          });
      // })
      // .catch(error => {
      //   this.setState({ error });
      // });
      }
    }else if(action == 'Edit'){
      if(firstname == '' || lastname == '' || nip =='' || email =='' || phone =='' || role == '' || wilayah ==''){
        swal("Data Belum Lengkap")
      }else{
        if(id_model == '' ){
          id_model = 'abc1'
        }
        if(id_jabatan == '' ){
          id_jabatan = 'abc1'
        }

        this.props.firebase
          .user(id_user)
          .set({
            firstname,
            lastname,
            nip,
            email,
            password,
            roles:roles_,
            phone,
            id_model,
            id_jabatan,
            jabatan,
            wilayah,
          })
          .then((docRef) => {
            this.setState({ 
              firstname:'',
              lastname : '',
              nip : '',
              email : '',
              id_jabatan:'',
              jabatan,
              
              // role:'',
              // roles:'',
              wilayah:'',
              primary: !this.state.primary,
            });
          swal("Success","Success Update User","success")
          })
          .catch(error => {
            this.setState({ error });
          swal("Failed Update User")
            
          });
      }
    }else{
      this.props.firebase
          .user(id_user)
          .delete()
          .then((docRef) => {
            this.setState({ 
              firstname:'',
              lastname : '',
              nip : '',
              email : '',
              id_jabatan:'',
              jabatan,
              // role:'',
              // roles:'',
              wilayah:'',
              primary: !this.state.primary,
            });
          swal("Success","Success Delete User","success")
          })
          .catch(error => {
            this.setState({ error });
          swal("Failed Add User")
            
          });
    }
    // .then(authUser => {
      //   // Create a user in your Firebase realtime database
      //   return this.props.firebase.user(authUser.user.uid).set({
      //     firstname,
      //     lastname,
      //     nip,
      //     email,
      //     roles,
      //     phone,
      //   });
      // })
      // // .then(() => {
      // //   return this.props.firebase.doSendEmailVerification();
      // // })
      // .then(() => {
      //   this.setState({ 
      //             firstname:'',
      //             lastname : '',
      //             nip : '',
      //             email : '',
      //             roles,
      //             primary: !this.state.primary,
      //           });
      //         swal("Success Add User")
      // })
      // .catch(error => {
      //   // if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
      //   //   error.message = ERROR_MSG_ACCOUNT_EXISTS;
      //   // }

      //   this.setState({ error });
      //     swal("Failed Add User")
        
      // });
  }

  handleChange =event =>{
        event.preventDefault()
        this.setState({
                      [event.target.name]: event.target.value,
                    });
    }

  handleChangeIdJabatan =e =>{
      const {id_model, jabatanmodel} = this.state
      // e.target.value
      if(e.target.value !== ""){
      this.props.firebase.kompetenJabatan(id_model, e.target.value)
      .onSnapshot(snapshot => {
          const jabatan_ = snapshot.data()
          this.setState({
            jabatan: jabatan_.jabatan,
          });
      });
      this.setState({
      id_jabatan: e.target.value,
      });
    }
    e.preventDefault()
  }

  handleChangemodel =event =>{
    event.preventDefault()
    // const {id_jabatan}= this.state
    if(event.target.value != ""){
    this.props.firebase
        .kompetensJabatan(event.target.value)
        .onSnapshot(snapshot => {
          let jabatanmodel = [];
          
          snapshot.forEach(doc =>
            jabatanmodel.push({ ...doc.data(), uid: doc.id }),
          );
          this.setState({
            jabatanmodel:jabatanmodel,
            });
        })
      this.setState({
        id_model: event.target.value,
        });
    }else{
      this.setState({
        jabatanmodel:[],
        id_model: "",
        });
    }
  }  

  togglePrimary(e) {
    // const r = document.getElementsByClassName("mr-1")[0].getAttribute("id"); 
    e.preventDefault()
    const {disabled} = this.state
    this.setState({
      primary: !this.state.primary,
      action: 'Save',
      disabled: !disabled,
    });
    
  }

  togglePrimary2(e) {
    e.preventDefault();
    const {id_user,nip, firstname, lastname,jabatan, role,email, phone, wilayah, id_model, id_jabatan, disabled} = this.state
    const attribute = document.getElementsByClassName(e.target.className)[0]; 
    let action = attribute.getAttribute("action")
    const data = e.target.id; 
    var array = data.split(",")
    var id = array[0]
    var jabatan_ = array[1]
    var nip_ = array[2]
    var email_ = array[3]
    var firstname_ = array[4]
    var lastname_ = array[5]
    var phone_ = array[6]
    var role_ = array[7]
    var wilayah_ = array[8]
    var id_model_ = array[9]
    var id_jabatan_ = array[10]
    var password_ = array[11]
    this.props.firebase
        .kompetensJabatan(id_model_)
        .onSnapshot(snapshot => {
          let jabatanmodel = [];
          
          snapshot.forEach(doc =>
            jabatanmodel.push({ ...doc.data(), uid: doc.id }),
          );
          this.setState({
            jabatanmodel:jabatanmodel,
            });
        })
    this.setState({
      primary: !this.state.primary,
      id_user : id,
      jabatan : jabatan_,
      nip : nip_,
      email : email_,
      firstname : firstname_,
      lastname : lastname_,
      phone : phone_, 
      role : role_,
      wilayah : wilayah_,
      id_model : id_model_,
      id_jabatan : id_jabatan_,
      password : password_,
      action : action,
      disabled:"disabled",
    });
    
}

togglePrimary3(e) {
  e.preventDefault();
  // const {id_user,password} = this.state
  // const user_ = this.props.firebase.cekuser();
  // const attribute = document.getElementsByClassName(e.target.className)[0]; 
  // let action = attribute.getAttribute("action")
  // console.log(attribute);
  // const data = e.target.id; 
  // var array = data.split(",")
  // var id = array[0]
  // var password_ = array[1]
  // console.log(array)
  const importLink = `/import`
  this.props.history.push({
    pathname: importLink,
    })
  
}

handleChangePassword (e) {
  const { id_user, passwordone, passwordtwo, password, authUser} = this.state;
  if(passwordone !== passwordtwo || passwordone === ''){
    swal('Info','Password Tidak Sama','info')
  }else{
    // this.props.firebase
    //   .doPasswordUpdate(passwordone)
    //   .then(() => {

        this.props.firebase
          .user(authUser.uid)
          .set({
            firstname:authUser.firstname,
            lastname:authUser.lastname,
            nip:authUser.nip,
            email:authUser.email,
            roles:authUser.roles,
            phone:authUser.phone,
            id_model:authUser.id_model,
            id_jabatan:authUser.id_jabatan,
            jabatan:authUser.jabatan,
            wilayah:authUser.wilayah,
            status:authUser.status,
            password:passwordone,
          })
        this.setState({ 
          passwordone:'',
          passwordtwo:'',
          primary2: !this.state.primary2,
          
        });
        swal('Success','update password berhasil','success')
      // })
      // .catch(error => {
      //   this.setState({ error });
      //   swal('Error',error.message,'error')
      // });
  }
  e.preventDefault();
  
}
  cancel =event =>{
    event.preventDefault()
    this.setState({
      primary: !this.state.primary,
      jabatan : '',
      nip : '',
      email : '',
      firstname : '',
      lastname : '',
      phone : '', 
      role : '',
      wilayah : '',
      action : '',
      });
  }
  cancel2 =event =>{
    event.preventDefault()
    this.setState({
      primary2: !this.state.primary2,
      });
  }
  handleClick=e=>{
    // e.preventDefault()
    const {users} = this.state
    const cell = e.dataIndex
    const id = users[cell].uid
    const UserLink = `/users/${id}`
    this.props.history.push({
                pathname: UserLink,
                })
}

  render() {
    const { users, loading, nip, email, firstname, lastname, phone, role, roles, wilayahs, wilayah, kompetens,id_model,id_jabatan, jabatanmodel, password, disabled, passwordone, passwordtwo } = this.state;
    const userList = users
    const options = {
      selectableRows:false,
      selectableonRowClick: false,
      // downloadOptions : {filename: 'tableDownload.csv', separator: ';'},
      // hasIndex: true, /* <-- use numbers for rows*/
      searchBox: false, /* <-- search true or false */
      download: false, /* <-- csv download true or false */
      print:false,
      responsive: 'scroll',
      onCellClick: (cellIndex,RowIndex, kompetens) => {
          const cell = RowIndex.colIndex;
          if(cell == 1 || cell == 2 || cell == 3 || cell == 4 || cell == 5){
              this.handleClick(RowIndex);
          }
      },
  }
  
    // const columns = ["Name", "Company", "City", "State"] /* <-- Table header columns. this is required */
    return (
      <div className="animated fadeIn" style={{width: '100%', height: '400px'}}>
        {/* <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">registered</th>
                      <th scope="col">role</th>
                      <th scope="col">status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) =>
                      <UserRow key={index} user={user}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row> */}
        
        <Row>
          <Col xl={12}>
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i> User
                </CardHeader>
                  {this.state.authUser.wilayah == "PUSAT" ?
                <CardBody>

                <div align="right">
                    <Button color="primary" onClick={this.togglePrimary} className="mr-1"><i className="fa fa-plus fa-lg mt-2"></i></Button>
                    <Button color="primary" onClick={this.togglePrimary3} className="mr-1" action="Change"><i className="fa fa-cloud-upload fa-lg mt-2" action="Change"> Import</i></Button>
                </div>
                </CardBody>
                :''}
                <CardBody >
                <MUIDataTable
                    title=""
                    columns={columns}
                    data={Object.values(users).map((item, index) => {
                    return [
                        <div key={item.uid}>{index+1}</div>,
                        item.nip,
                        item.firstname,
                        item.lastname,
                        item.email,
                        // item.roles,
                        item.jabatan,
                        item.wilayah,
                        <div>
                        <i className="fa fa-edit font-2xl" onClick={this.togglePrimary2} id={[item.uid, item.jabatan, item.nip, item.email, item.firstname, item.lastname, item.phone, item.roles, item.wilayah,item.id_model,item.id_jabatan, item.password]}  name={item.nik} columns="1" action="Edit"></i>&nbsp;
                        <i className="fa fa-trash font-2xl" onClick={this.togglePrimary2} id={[item.uid, item.jabatan, item.nip, item.email, item.firstname, item.lastname, item.phone, item.roles, item.wilayah,item.id_model,item.id_jabatan, item.password]} name={item.nik} action="Delete"></i>&nbsp;
                        {/* <i className="fa fa-wrench font-2xl" onClick={this.togglePrimary3} id={[item.uid, item.password]} name={item.nik} action="Change"></i> */}
                        </div>
                    ];
                    })}
                    options={options}
                />
                    <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                        className={'modal-primary ' + this.props.className}>
                    <ModalHeader toggle={this.cancel}>{this.state.action} User</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                    <ModalBody>
                            <FormGroup row>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="firstname" name="firstname" placeholder="First Name" value={this.state.firstname} onChange={this.handleChange}/>
                                    </InputGroup>
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="lastname" name="lastname" placeholder="Last Name" value={this.state.lastname} onChange={this.handleChange}/>
                                    </InputGroup>
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="nip" name="nip" placeholder="NIP" value={this.state.nip} onChange={this.handleChange}/>
                                    </InputGroup>
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="password" id="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                                    </InputGroup>
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
                                    </InputGroup>
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="phone" name="phone" placeholder="Phone" value={this.state.phone} onChange={this.handleChange}/>
                                    </InputGroup>
                                    
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="select" name="id_model" id="id_model" value={this.state.id_model} onChange={this.handleChangemodel}>
                                    <option value="">Pilih Model</option>
                                    {kompetens.map((model, index) =>
                                    <option key={index} value={model.uid}>{model.name_model}</option>
                                    )}
                                    </Input>
                                    </InputGroup>
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="select" name="id_jabatan" id="id_jabatan" value={this.state.id_jabatan} onChange={this.handleChangeIdJabatan}>
                                    <option value="">Pilih Jabatan</option>
                                    {jabatanmodel.map((jabatan, index) =>
                                    <option key={index} value={jabatan.uid}>{jabatan.jabatan}</option>
                                    )}
                                    </Input>
                                    </InputGroup>
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="select" name="role" id="role" value={this.state.role} onChange={this.handleChange}>
                                    <option value="">Pilih User</option>
                                    {roles.map((role, index) =>
                                    <option key={index} value={role.role}>{role.role}</option>
                                    )}
                                    </Input>
                                    </InputGroup>
                                    
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="select" name="wilayah" id="wilayah" value={this.state.wilayah} onChange={this.handleChange}>
                                    <option value="">Pilih Wilayah</option>
                                    {wilayahs.map((wilayah, index) =>
                                    <option key={index} value={wilayah.wilayah}>{wilayah.wilayah}</option>
                                    )}
                                    </Input>
                                    </InputGroup>
                                    
                                </Col>
                            </FormGroup>
                            {/* <CardFooter >
                                <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                            </CardFooter> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" >{this.state.action}</Button>{' '}
                        <Button color="secondary" onClick={this.cancel}>Cancel</Button>
                    </ModalFooter>
                    </Form>
                    </Modal>
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
                </CardBody>
            </Card>
            </Col>
        </Row>
      
      </div>
    )
  }
}

export default withFirebase(Users);
