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
  Table,
  Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';
import swal from 'sweetalert';
import { withFirebase } from '../../firebase';
import MUIDataTable from "mui-datatables";
import { MDBDataTable } from 'mdbreact';
import ReactTable from 'react-table'
import ReactExport from "react-data-export";
import DataTable from 'react-data-table-component';
// import datetime from 'node-datetime';

const columns = [
  {
      name: 'No.',
      options: {
      filter: false,
      sort: false,
      filterType: 'textField',
      },
  },
  {
      name: 'NIP',
      options: {
      filter: true,
      sort: false,
      },
  },
  {
    name: 'Firstname',
    options: {
    filter: true,
    sort: false,
    },
  },
  {
    name: 'Lastname',
    options: {
    filter: true,
    sort: false,
    },
  },
  {
    name: 'Email',
    options: {
    filter: true,
    sort: false,
    },
  },
  {
    name: 'Wilayah',
    options: {
    filter: true,
    sort: false,
    },
  },
  {
      name: 'Action',
      options: {
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

class Hasil extends Component {
  constructor(props) {
    super(props);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    
    this.state = {
      loading: false,
      users: [],
      id_jabatan : '',
      wilayah : '',
      firstname : '',
      lastname : '',
      nip : '',
      email : '',
      modal: false,
      large: false,
      small: false,
      primary: false,
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
              this.props.firebase.UserHasil(doc.id)
              .onSnapshot(snapshot2 => {
                let hasil = [];
                 snapshot2.forEach(doc2 =>
                      hasil.push({ ...doc2.data()}),
                  )
                  users.push({ ...doc.data(), uid:doc.id, 
                              nama1:hasil[0] != null ? hasil[0].nama: "",
                              nama2:hasil[1] != null ? hasil[1].nama: "",
                              nama3:hasil[2] != null ? hasil[2].nama: "",
                              nama4:hasil[3] != null ? hasil[3].nama: "",
                              nama5:hasil[4] != null ? hasil[4].nama: "",
                              nama6:hasil[5] != null ? hasil[5].nama: "",
                              nama7:hasil[6] != null ? hasil[6].nama: "",
                              nama8:hasil[7] != null ? hasil[7].nama: "",
                              nama9:hasil[8] != null ? hasil[8].nama: "",
                              nama10:hasil[9] != null ? hasil[9].nama: "",
                              nama11:hasil[10] != null ? hasil[10].nama: "",
                              nilai1:hasil[0] != null ? hasil[0].nilai: "",
                              nilai2:hasil[1] != null ? hasil[1].nilai: "",
                              nilai3:hasil[2] != null ? hasil[2].nilai: "",
                              nilai4:hasil[3] != null ? hasil[3].nilai: "",
                              nilai5:hasil[4] != null ? hasil[4].nilai: "",
                              nilai6:hasil[5] != null ? hasil[5].nilai: "",
                              nilai7:hasil[6] != null ? hasil[6].nilai: "",
                              nilai8:hasil[7] != null ? hasil[7].nilai: "",
                              nilai9:hasil[8] != null ? hasil[8].nilai: "",
                              nilai10:hasil[9] != null ? hasil[9].nilai: "",
                              nilai11:hasil[10] != null ? hasil[10].nilai: "",
                              
                            })
                  this.setState({
                    users:users,
                })
              })
            )
        })
        }else{
            this.unsubscribe =  
            this.props.firebase.users()
        .where("roles", "==", ["KARYAWAN BIASA"])
        .onSnapshot(snapshot => {
            let users = [];
            snapshot.forEach(doc =>
                // console.log(doc.id)
                this.props.firebase.UserHasil(doc.id)
                .onSnapshot(snapshot2 => {
                  let hasil = [];
                   snapshot2.forEach(doc2 =>
                        hasil.push({ ...doc2.data()}),
                    )
                    users.push({ ...doc.data(), uid:doc.id, 
                                nama1:hasil[0] != null ? hasil[0].nama: "",
                                nama2:hasil[1] != null ? hasil[1].nama: "",
                                nama3:hasil[2] != null ? hasil[2].nama: "",
                                nama4:hasil[3] != null ? hasil[3].nama: "",
                                nama5:hasil[4] != null ? hasil[4].nama: "",
                                nama6:hasil[5] != null ? hasil[5].nama: "",
                                nama7:hasil[6] != null ? hasil[6].nama: "",
                                nama8:hasil[7] != null ? hasil[7].nama: "",
                                nama9:hasil[8] != null ? hasil[8].nama: "",
                                nama10:hasil[9] != null ? hasil[9].nama: "",
                                nama11:hasil[10] != null ? hasil[10].nama: "",
                                nilai1:hasil[0] != null ? hasil[0].nilai: "",
                                nilai2:hasil[1] != null ? hasil[1].nilai: "",
                                nilai3:hasil[2] != null ? hasil[2].nilai: "",
                                nilai4:hasil[3] != null ? hasil[3].nilai: "",
                                nilai5:hasil[4] != null ? hasil[4].nilai: "",
                                nilai6:hasil[5] != null ? hasil[5].nilai: "",
                                nilai7:hasil[6] != null ? hasil[6].nilai: "",
                                nilai8:hasil[7] != null ? hasil[7].nilai: "",
                                nilai9:hasil[8] != null ? hasil[8].nilai: "",
                                nilai10:hasil[9] != null ? hasil[9].nilai: "",
                                nilai11:hasil[10] != null ? hasil[10].nilai: "",
                                
                              })
                    this.setState({
                      users:users,
                  })
                })
              )
              
        })
      } 
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // handleSubmit (e) {
  //   e.preventDefault();
  //   const { firstname, lastname, nip,email} = this.state;
  //   const roles = [""];
  //   // console.log(firstname, lastname, nip,email)
  //   this.props.firebase
  //     .doCreateUserWithEmailAndPassword(email, "password")
  //     .then(authUser => {
  //       // Create a user in your Firebase realtime database
  //       this.props.firebase
  //         .user(authUser.user.uid)
  //         .set({
  //           firstname,
  //           lastname,
  //           nip,
  //           email,
  //           roles,
  //         },
  //         { merge: true },
  //         )
  //         .then(() => {
  //           this.setState({ 
  //             firstname:'',
  //             lastname : '',
  //             nip : '',
  //             email : '',
  //             roles,
  //           });
  //         })
  //         .catch(error => {
  //           this.setState({ error });
  //         });
  //     })
  //     .catch(error => {
  //       this.setState({ error });
  //     });
    
  // }

  handleChange =event =>{
        event.preventDefault()
        this.setState({[event.target.name]: event.target.value});
    }
  
    handleChangeJabatan =event =>{
      event.preventDefault()
      if(event.target.name == 'id_jabatan' && event.target.value != ''){
        if(this.state.authUser.wilayah != "PUSAT"){
        this.props.firebase.users()
          .where("roles", "==", ["KARYAWAN BIASA"])
          .where("wilayah", "==", this.state.authUser.wilayah)
          .where("id_jabatan", "==", event.target.value)
          .onSnapshot(snapshot => {
            let users = [];
            snapshot.forEach(doc =>
                // console.log(doc.id)
                this.props.firebase.UserHasil(doc.id)
                .onSnapshot(snapshot2 => {
                  let hasil = [];
                   snapshot2.forEach(doc2 =>
                        hasil.push({ ...doc2.data()}),
                    )
                    users.push({ ...doc.data(), uid:doc.id, 
                                nama1:hasil[0] != null ? hasil[0].nama: "",
                                nama2:hasil[1] != null ? hasil[1].nama: "",
                                nama3:hasil[2] != null ? hasil[2].nama: "",
                                nama4:hasil[3] != null ? hasil[3].nama: "",
                                nama5:hasil[4] != null ? hasil[4].nama: "",
                                nama6:hasil[5] != null ? hasil[5].nama: "",
                                nama7:hasil[6] != null ? hasil[6].nama: "",
                                nama8:hasil[7] != null ? hasil[7].nama: "",
                                nama9:hasil[8] != null ? hasil[8].nama: "",
                                nama10:hasil[9] != null ? hasil[9].nama: "",
                                nama11:hasil[10] != null ? hasil[10].nama: "",
                                nilai1:hasil[0] != null ? hasil[0].nilai: "",
                                nilai2:hasil[1] != null ? hasil[1].nilai: "",
                                nilai3:hasil[2] != null ? hasil[2].nilai: "",
                                nilai4:hasil[3] != null ? hasil[3].nilai: "",
                                nilai5:hasil[4] != null ? hasil[4].nilai: "",
                                nilai6:hasil[5] != null ? hasil[5].nilai: "",
                                nilai7:hasil[6] != null ? hasil[6].nilai: "",
                                nilai8:hasil[7] != null ? hasil[7].nilai: "",
                                nilai9:hasil[8] != null ? hasil[8].nilai: "",
                                nilai10:hasil[9] != null ? hasil[9].nilai: "",
                                nilai11:hasil[10] != null ? hasil[10].nilai: "",
                                
                              })
                    this.setState({
                      users:users,
                  })
                })
              )
          })
                    this.setState({
                      id_jabatan:event.target.value,
                  })
          }else{
            
              this.props.firebase.users()
          .where("roles", "==", ["KARYAWAN BIASA"])
          .where("id_jabatan", "==", event.target.value)
          // .where("id_jabatan", "==", this.state.id_jabatan)
          .onSnapshot(snapshot => {
            let users = [];
            snapshot.forEach(doc =>
                // console.log(doc.id)
                this.props.firebase.UserHasil(doc.id)
                .onSnapshot(snapshot2 => {
                  let hasil = [];
                   snapshot2.forEach(doc2 =>
                        hasil.push({ ...doc2.data()}),
                    )
                    users.push({ ...doc.data(), uid:doc.id, 
                                nama1:hasil[0] != null ? hasil[0].nama: "",
                                nama2:hasil[1] != null ? hasil[1].nama: "",
                                nama3:hasil[2] != null ? hasil[2].nama: "",
                                nama4:hasil[3] != null ? hasil[3].nama: "",
                                nama5:hasil[4] != null ? hasil[4].nama: "",
                                nama6:hasil[5] != null ? hasil[5].nama: "",
                                nama7:hasil[6] != null ? hasil[6].nama: "",
                                nama8:hasil[7] != null ? hasil[7].nama: "",
                                nama9:hasil[8] != null ? hasil[8].nama: "",
                                nama10:hasil[9] != null ? hasil[9].nama: "",
                                nama11:hasil[10] != null ? hasil[10].nama: "",
                                nilai1:hasil[0] != null ? hasil[0].nilai: "",
                                nilai2:hasil[1] != null ? hasil[1].nilai: "",
                                nilai3:hasil[2] != null ? hasil[2].nilai: "",
                                nilai4:hasil[3] != null ? hasil[3].nilai: "",
                                nilai5:hasil[4] != null ? hasil[4].nilai: "",
                                nilai6:hasil[5] != null ? hasil[5].nilai: "",
                                nilai7:hasil[6] != null ? hasil[6].nilai: "",
                                nilai8:hasil[7] != null ? hasil[7].nilai: "",
                                nilai9:hasil[8] != null ? hasil[8].nilai: "",
                                nilai10:hasil[9] != null ? hasil[9].nilai: "",
                                nilai11:hasil[10] != null ? hasil[10].nilai: "",
                                
                              })
                    this.setState({
                      users:users,
                      
                  })
                })
              )
                  
          })
          this.setState({
            id_jabatan:event.target.value,
          })
        } 
      }else if(event.target.name == 'id_jabatan' && event.target.value == ''){
        if(this.state.authUser.wilayah != "PUSAT"){
          this.props.firebase.users()
            .where("roles", "==", ["KARYAWAN BIASA"])
            .where("wilayah", "==", this.state.authUser.wilayah)
            // .where("id_jabatan", "==", event.target.value)
            .onSnapshot(snapshot => {
              let users = [];
              snapshot.forEach(doc =>
                  // console.log(doc.id)
                  this.props.firebase.UserHasil(doc.id)
                  .onSnapshot(snapshot2 => {
                    let hasil = [];
                     snapshot2.forEach(doc2 =>
                          hasil.push({ ...doc2.data()}),
                      )
                      users.push({ ...doc.data(), uid:doc.id, 
                                  nama1:hasil[0] != null ? hasil[0].nama: "",
                                  nama2:hasil[1] != null ? hasil[1].nama: "",
                                  nama3:hasil[2] != null ? hasil[2].nama: "",
                                  nama4:hasil[3] != null ? hasil[3].nama: "",
                                  nama5:hasil[4] != null ? hasil[4].nama: "",
                                  nama6:hasil[5] != null ? hasil[5].nama: "",
                                  nama7:hasil[6] != null ? hasil[6].nama: "",
                                  nama8:hasil[7] != null ? hasil[7].nama: "",
                                  nama9:hasil[8] != null ? hasil[8].nama: "",
                                  nama10:hasil[9] != null ? hasil[9].nama: "",
                                  nama11:hasil[10] != null ? hasil[10].nama: "",
                                  nilai1:hasil[0] != null ? hasil[0].nilai: "",
                                  nilai2:hasil[1] != null ? hasil[1].nilai: "",
                                  nilai3:hasil[2] != null ? hasil[2].nilai: "",
                                  nilai4:hasil[3] != null ? hasil[3].nilai: "",
                                  nilai5:hasil[4] != null ? hasil[4].nilai: "",
                                  nilai6:hasil[5] != null ? hasil[5].nilai: "",
                                  nilai7:hasil[6] != null ? hasil[6].nilai: "",
                                  nilai8:hasil[7] != null ? hasil[7].nilai: "",
                                  nilai9:hasil[8] != null ? hasil[8].nilai: "",
                                  nilai10:hasil[9] != null ? hasil[9].nilai: "",
                                  nilai11:hasil[10] != null ? hasil[10].nilai: "",
                                  
                                })
                      this.setState({
                        users:users,
                        
                    })
                  })
                )
            })
                    this.setState({
                    id_jabatan:'',
                    })
            }else{
                this.props.firebase.users()
            .where("roles", "==", ["KARYAWAN BIASA"])
            // .where("id_jabatan", "==", event.target.value)
            // .where("id_jabatan", "==", this.state.id_jabatan)
            .onSnapshot(snapshot => {
              let users = [];
              snapshot.forEach(doc =>
                  // console.log(doc.id)
                  this.props.firebase.UserHasil(doc.id)
                  .onSnapshot(snapshot2 => {
                    let hasil = [];
                     snapshot2.forEach(doc2 =>
                          hasil.push({ ...doc2.data()}),
                      )
                      users.push({ ...doc.data(), uid:doc.id, 
                                  nama1:hasil[0] != null ? hasil[0].nama: "",
                                  nama2:hasil[1] != null ? hasil[1].nama: "",
                                  nama3:hasil[2] != null ? hasil[2].nama: "",
                                  nama4:hasil[3] != null ? hasil[3].nama: "",
                                  nama5:hasil[4] != null ? hasil[4].nama: "",
                                  nama6:hasil[5] != null ? hasil[5].nama: "",
                                  nama7:hasil[6] != null ? hasil[6].nama: "",
                                  nama8:hasil[7] != null ? hasil[7].nama: "",
                                  nama9:hasil[8] != null ? hasil[8].nama: "",
                                  nama10:hasil[9] != null ? hasil[9].nama: "",
                                  nama11:hasil[10] != null ? hasil[10].nama: "",
                                  nilai1:hasil[0] != null ? hasil[0].nilai: "",
                                  nilai2:hasil[1] != null ? hasil[1].nilai: "",
                                  nilai3:hasil[2] != null ? hasil[2].nilai: "",
                                  nilai4:hasil[3] != null ? hasil[3].nilai: "",
                                  nilai5:hasil[4] != null ? hasil[4].nilai: "",
                                  nilai6:hasil[5] != null ? hasil[5].nilai: "",
                                  nilai7:hasil[6] != null ? hasil[6].nilai: "",
                                  nilai8:hasil[7] != null ? hasil[7].nilai: "",
                                  nilai9:hasil[8] != null ? hasil[8].nilai: "",
                                  nilai10:hasil[9] != null ? hasil[9].nilai: "",
                                  nilai11:hasil[10] != null ? hasil[10].nilai: "",
                                  
                                })
                      this.setState({
                        users:users,
                        
                    })
                  })
                )
                  
            })
                      this.setState({
                        id_jabatan:'',
                        })
          } 
      }else if(event.target.name == 'wilayah' && event.target.value != ''){
        if(this.state.authUser.wilayah != "PUSAT" && this.state.id_jabatan != ''){
        this.props.firebase.users()
          .where("roles", "==", ["KARYAWAN BIASA"])
          .where("wilayah", "==", event.target.value)
          .where("id_jabatan", "==", this.state.id_jabatan)
          .onSnapshot(snapshot => {
            let users = [];
            snapshot.forEach(doc =>
                // console.log(doc.id)
                this.props.firebase.UserHasil(doc.id)
                .onSnapshot(snapshot2 => {
                  let hasil = [];
                   snapshot2.forEach(doc2 =>
                        hasil.push({ ...doc2.data()}),
                    )
                    users.push({ ...doc.data(), uid:doc.id, 
                                nama1:hasil[0] != null ? hasil[0].nama: "",
                                nama2:hasil[1] != null ? hasil[1].nama: "",
                                nama3:hasil[2] != null ? hasil[2].nama: "",
                                nama4:hasil[3] != null ? hasil[3].nama: "",
                                nama5:hasil[4] != null ? hasil[4].nama: "",
                                nama6:hasil[5] != null ? hasil[5].nama: "",
                                nama7:hasil[6] != null ? hasil[6].nama: "",
                                nama8:hasil[7] != null ? hasil[7].nama: "",
                                nama9:hasil[8] != null ? hasil[8].nama: "",
                                nama10:hasil[9] != null ? hasil[9].nama: "",
                                nama11:hasil[10] != null ? hasil[10].nama: "",
                                nilai1:hasil[0] != null ? hasil[0].nilai: "",
                                nilai2:hasil[1] != null ? hasil[1].nilai: "",
                                nilai3:hasil[2] != null ? hasil[2].nilai: "",
                                nilai4:hasil[3] != null ? hasil[3].nilai: "",
                                nilai5:hasil[4] != null ? hasil[4].nilai: "",
                                nilai6:hasil[5] != null ? hasil[5].nilai: "",
                                nilai7:hasil[6] != null ? hasil[6].nilai: "",
                                nilai8:hasil[7] != null ? hasil[7].nilai: "",
                                nilai9:hasil[8] != null ? hasil[8].nilai: "",
                                nilai10:hasil[9] != null ? hasil[9].nilai: "",
                                nilai11:hasil[10] != null ? hasil[10].nilai: "",
                                
                              })
                    this.setState({
                      users:users,
                  })
                })
              )
          })
          }else if(this.state.authUser.wilayah != "PUSAT" && this.state.id_jabatan == ''){
            if(event.target.value != ''){
              this.props.firebase.users()
          .where("roles", "==", ["KARYAWAN BIASA"])
          // .where("id_jabatan", "==", this.state.id_jabatan)
          .where("wilayah", "==", event.target.value)
          // .where("id_jabatan", "==", this.state.id_jabatan)
          .onSnapshot(snapshot => {
            let users = [];
            snapshot.forEach(doc =>
                // console.log(doc.id)
                this.props.firebase.UserHasil(doc.id)
                .onSnapshot(snapshot2 => {
                  let hasil = [];
                   snapshot2.forEach(doc2 =>
                        hasil.push({ ...doc2.data()}),
                    )
                    users.push({ ...doc.data(), uid:doc.id, 
                                nama1:hasil[0] != null ? hasil[0].nama: "",
                                nama2:hasil[1] != null ? hasil[1].nama: "",
                                nama3:hasil[2] != null ? hasil[2].nama: "",
                                nama4:hasil[3] != null ? hasil[3].nama: "",
                                nama5:hasil[4] != null ? hasil[4].nama: "",
                                nama6:hasil[5] != null ? hasil[5].nama: "",
                                nama7:hasil[6] != null ? hasil[6].nama: "",
                                nama8:hasil[7] != null ? hasil[7].nama: "",
                                nama9:hasil[8] != null ? hasil[8].nama: "",
                                nama10:hasil[9] != null ? hasil[9].nama: "",
                                nama11:hasil[10] != null ? hasil[10].nama: "",
                                nilai1:hasil[0] != null ? hasil[0].nilai: "",
                                nilai2:hasil[1] != null ? hasil[1].nilai: "",
                                nilai3:hasil[2] != null ? hasil[2].nilai: "",
                                nilai4:hasil[3] != null ? hasil[3].nilai: "",
                                nilai5:hasil[4] != null ? hasil[4].nilai: "",
                                nilai6:hasil[5] != null ? hasil[5].nilai: "",
                                nilai7:hasil[6] != null ? hasil[6].nilai: "",
                                nilai8:hasil[7] != null ? hasil[7].nilai: "",
                                nilai9:hasil[8] != null ? hasil[8].nilai: "",
                                nilai10:hasil[9] != null ? hasil[9].nilai: "",
                                nilai11:hasil[10] != null ? hasil[10].nilai: "",
                                
                              })
                    this.setState({
                      users:users,
                  })
                })
              )
                
          })
                    this.setState({
                      wilayah:event.target.value,
                  })
            }else if(event.target.value == ''){
              this.props.firebase.users()
              .where("roles", "==", ["KARYAWAN BIASA"])
              .onSnapshot(snapshot => {
                  let users = [];
                  snapshot.forEach(doc =>
                      // console.log(doc.id)
                      this.props.firebase.UserHasil(doc.id)
                      .onSnapshot(snapshot2 => {
                        let hasil = [];
                         snapshot2.forEach(doc2 =>
                              hasil.push({ ...doc2.data()}),
                          )
                          users.push({ ...doc.data(), uid:doc.id, 
                                      nama1:hasil[0] != null ? hasil[0].nama: "",
                                      nama2:hasil[1] != null ? hasil[1].nama: "",
                                      nama3:hasil[2] != null ? hasil[2].nama: "",
                                      nama4:hasil[3] != null ? hasil[3].nama: "",
                                      nama5:hasil[4] != null ? hasil[4].nama: "",
                                      nama6:hasil[5] != null ? hasil[5].nama: "",
                                      nama7:hasil[6] != null ? hasil[6].nama: "",
                                      nama8:hasil[7] != null ? hasil[7].nama: "",
                                      nama9:hasil[8] != null ? hasil[8].nama: "",
                                      nama10:hasil[9] != null ? hasil[9].nama: "",
                                      nama11:hasil[10] != null ? hasil[10].nama: "",
                                      nilai1:hasil[0] != null ? hasil[0].nilai: "",
                                      nilai2:hasil[1] != null ? hasil[1].nilai: "",
                                      nilai3:hasil[2] != null ? hasil[2].nilai: "",
                                      nilai4:hasil[3] != null ? hasil[3].nilai: "",
                                      nilai5:hasil[4] != null ? hasil[4].nilai: "",
                                      nilai6:hasil[5] != null ? hasil[5].nilai: "",
                                      nilai7:hasil[6] != null ? hasil[6].nilai: "",
                                      nilai8:hasil[7] != null ? hasil[7].nilai: "",
                                      nilai9:hasil[8] != null ? hasil[8].nilai: "",
                                      nilai10:hasil[9] != null ? hasil[9].nilai: "",
                                      nilai11:hasil[10] != null ? hasil[10].nilai: "",
                                      
                                    })
                          this.setState({
                            users:users,
                        })
                      })
                    )
                    
              })
            }
              
        }else if(this.state.authUser.wilayah == "PUSAT" && this.state.id_jabatan == ''){
          if(event.target.value != ''){
            this.props.firebase.users()
        .where("roles", "==", ["KARYAWAN BIASA"])
        // .where("id_jabatan", "==", this.state.id_jabatan)
        // .where("wilayah", "==", this.state.authUser.wilayah)
        .where("wilayah", "==", event.target.value)
        // .where("id_jabatan", "==", this.state.id_jabatan)
        .onSnapshot(snapshot => {
          let users = [];
          snapshot.forEach(doc =>
              // console.log(doc.id)
              this.props.firebase.UserHasil(doc.id)
              .onSnapshot(snapshot2 => {
                let hasil = [];
                 snapshot2.forEach(doc2 =>
                      hasil.push({ ...doc2.data()}),
                  )
                  users.push({ ...doc.data(), uid:doc.id, 
                              nama1:hasil[0] != null ? hasil[0].nama: "",
                              nama2:hasil[1] != null ? hasil[1].nama: "",
                              nama3:hasil[2] != null ? hasil[2].nama: "",
                              nama4:hasil[3] != null ? hasil[3].nama: "",
                              nama5:hasil[4] != null ? hasil[4].nama: "",
                              nama6:hasil[5] != null ? hasil[5].nama: "",
                              nama7:hasil[6] != null ? hasil[6].nama: "",
                              nama8:hasil[7] != null ? hasil[7].nama: "",
                              nama9:hasil[8] != null ? hasil[8].nama: "",
                              nama10:hasil[9] != null ? hasil[9].nama: "",
                              nama11:hasil[10] != null ? hasil[10].nama: "",
                              nilai1:hasil[0] != null ? hasil[0].nilai: "",
                              nilai2:hasil[1] != null ? hasil[1].nilai: "",
                              nilai3:hasil[2] != null ? hasil[2].nilai: "",
                              nilai4:hasil[3] != null ? hasil[3].nilai: "",
                              nilai5:hasil[4] != null ? hasil[4].nilai: "",
                              nilai6:hasil[5] != null ? hasil[5].nilai: "",
                              nilai7:hasil[6] != null ? hasil[6].nilai: "",
                              nilai8:hasil[7] != null ? hasil[7].nilai: "",
                              nilai9:hasil[8] != null ? hasil[8].nilai: "",
                              nilai10:hasil[9] != null ? hasil[9].nilai: "",
                              nilai11:hasil[10] != null ? hasil[10].nilai: "",
                              
                            })
                  this.setState({
                    users:users,
                })
              })
            )
              
        })
                  this.setState({
                    wilayah:event.target.value,
                })
          }
        } 
        
      }else if(event.target.name == 'wilayah' && event.target.value == ''){
        if(this.state.authUser.wilayah == "PUSAT"){
        this.props.firebase.users()
        .where("roles", "==", ["KARYAWAN BIASA"])
        .onSnapshot(snapshot => {
            let users = [];
            snapshot.forEach(doc =>
                // console.log(doc.id)
                this.props.firebase.UserHasil(doc.id)
                .onSnapshot(snapshot2 => {
                  let hasil = [];
                   snapshot2.forEach(doc2 =>
                        hasil.push({ ...doc2.data()}),
                    )
                    users.push({ ...doc.data(), uid:doc.id, 
                                nama1:hasil[0] != null ? hasil[0].nama: "",
                                nama2:hasil[1] != null ? hasil[1].nama: "",
                                nama3:hasil[2] != null ? hasil[2].nama: "",
                                nama4:hasil[3] != null ? hasil[3].nama: "",
                                nama5:hasil[4] != null ? hasil[4].nama: "",
                                nama6:hasil[5] != null ? hasil[5].nama: "",
                                nama7:hasil[6] != null ? hasil[6].nama: "",
                                nama8:hasil[7] != null ? hasil[7].nama: "",
                                nama9:hasil[8] != null ? hasil[8].nama: "",
                                nama10:hasil[9] != null ? hasil[9].nama: "",
                                nama11:hasil[10] != null ? hasil[10].nama: "",
                                nilai1:hasil[0] != null ? hasil[0].nilai: "",
                                nilai2:hasil[1] != null ? hasil[1].nilai: "",
                                nilai3:hasil[2] != null ? hasil[2].nilai: "",
                                nilai4:hasil[3] != null ? hasil[3].nilai: "",
                                nilai5:hasil[4] != null ? hasil[4].nilai: "",
                                nilai6:hasil[5] != null ? hasil[5].nilai: "",
                                nilai7:hasil[6] != null ? hasil[6].nilai: "",
                                nilai8:hasil[7] != null ? hasil[7].nilai: "",
                                nilai9:hasil[8] != null ? hasil[8].nilai: "",
                                nilai10:hasil[9] != null ? hasil[9].nilai: "",
                                nilai11:hasil[10] != null ? hasil[10].nilai: "",
                                
                              })
                    this.setState({
                      users:users,
                  })
                })
              )
              
        })
      }
      }
      
  }


  togglePrimary(e) {
    // const r = document.getElementsByClassName("mr-1")[0].getAttribute("id"); 
    e.preventDefault()
    this.setState({
      primary: !this.state.primary,
    });
    
  }

  cancel =event =>{
    event.preventDefault()
    this.setState({
      primary: !this.state.primary,
      });
  }
  handleClick=e=>{
    // e.preventDefault()
    const {users} = this.state
    const cell = e.dataIndex
    const id = users[cell].uid
    const UserLink = `/Hasil/User/${id}`
    this.props.history.push({
                pathname: UserLink,
                })

}
  render() {
    
    const { users, loading,id_jabatan, wilayah } = this.state;
    // const filterjabatan = users.find((itemm) => itemm.id_jabatan === 'fUsmuAY28qYLV9X2HLTc' )
    // const filterjabatann = users.filter()
    // var lucky = users.filter(function(number) {
    //   return number.id_jabatan === 'fUsmuAY28qYLV9X2HLTc';
    // });
    // var uniqueNames = [];
    // $.each(users, function(i, el){
    //     if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
    // });
    // let unique = [...new Set(users)]; 
  //   let uniqueArray = users.filter(function(item, pos) {
  //     return users.indexOf(item) == pos;
  //     // return item.id_jabatan = item
  // })
  function getUnique(arr, comp) {

    const unique = arr
         .map(e => e[comp])
  
       // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
  
      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);
  
     return unique;
  }
  
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
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    const dataSet1 = [
      {
          name: "Johson",
          amount: 30000,
          sex: 'M',
          is_married: true
      },
      {
          name: "Monika",
          amount: 355000,
          sex: 'F',
          is_married: false
      },
      {
          name: "John",
          amount: 250000,
          sex: 'M',
          is_married: false
      },
      {
          name: "Josef",
          amount: 450500,
          sex: 'M',
          is_married: true
      }
  ];
    var dataSet2 = [
      {
          name: "Johnson",
          total: 25,
          remainig: 16
      },
      {
          name: "Josef",
          total: 25,
          remainig: 7
      }
  ];
  // console.log(dataSet1, users)
    // const columns = ["Name", "Company", "City", "State"] /* <-- Table header columns. this is required */
    return (
      <div className="animated fadeIn">
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
        </Row>
        <Row>
          <Col xl={12}>
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i> Hasil
                </CardHeader>
                <CardBody>
                    <div align="right">
                        {/* <Button color="primary" onClick={this.togglePrimary} className="mr-1"><i className="fa fa-plus fa-lg mt-2"></i></Button> */}
                        <Form >
                            <ExcelFile element={<Button color="primary" className="mr-1"><i className="fa fa-download fa-lg mt-2"></i></Button>}>
                            <ExcelSheet data={users} name="Hasil User">
                                <ExcelColumn label="NIP" value="nip"/>
                                <ExcelColumn label="FirstName" value="firstname"/>
                                <ExcelColumn label="LastName" value="lastname"/>
                                <ExcelColumn label="Jabatan" value="jabatan"/>
                                <ExcelColumn label="Phone" value="phone"/>
                                <ExcelColumn label="Email" value="email"/>
                                <ExcelColumn label="Nama Kompetensi 1" value="nama1"/>
                                <ExcelColumn label="Nilai" value="nilai1"/>

                                <ExcelColumn label="Nama Kompetensi 2" value="nama2"/>
                                <ExcelColumn label="Nilai" value="nilai2"/>

                                <ExcelColumn label="Nama Kompetensi 3" value="nama3"/>
                                <ExcelColumn label="Nilai" value="nilai3"/>

                                <ExcelColumn label="Nama Kompetensi 4" value="nama4"/>
                                <ExcelColumn label="Nilai" value="nilai4"/>

                                <ExcelColumn label="Nama Kompetensi 5" value="nama5"/>
                                <ExcelColumn label="Nilai" value="nilai5"/>

                                <ExcelColumn label="Nama Kompetensi 6" value="nama6"/>
                                <ExcelColumn label="Nilai" value="nilai6"/>

                                <ExcelColumn label="Nama Kompetensi 7" value="nama7"/>
                                <ExcelColumn label="Nilai" value="nilai7"/>

                                <ExcelColumn label="Nama Kompetensi 8" value="nama8"/>
                                <ExcelColumn label="Nilai" value="nilai8"/>

                                <ExcelColumn label="Nama Kompetensi 9" value="nama9"/>
                                <ExcelColumn label="Nilai" value="nilai9"/>

                                <ExcelColumn label="Nama Kompetensi 10" value="nama10"/>
                                <ExcelColumn label="Nilai" value="nilai10"/>
        
                                {/* <ExcelColumn label="Requirment" value="requirment"/> */}
                                {/* <ExcelColumn label="Hasil" value="hasil"/> */}
                                {/* <ExcelColumn label="Marital Status"
                                            value={(col) => col.data ? "Married" : "Single"}/> */}
                            </ExcelSheet>
                            {/* <ExcelSheet data={dataSet2} name="Hasil User">
                                <ExcelColumn label="Name" value="name"/>
                                <ExcelColumn label="Total Leaves" value="total"/>
                                <ExcelColumn label="Remaining Leaves" value="remaining"/>
                            </ExcelSheet> */}
                        </ExcelFile>  
                            <Col md="2">
                              <InputGroup>
                              <Input type="select" name="id_jabatan" id="id_jabatan" className="fa fa-plus fa-lg mt-3"  onChange={this.handleChangeJabatan}>
                                <option value="">--Semua--</option>
                                {getUnique(users,'id_jabatan').map((model, index) =>
                                  <option key={index} value={model.id_jabatan}>{model.jabatan}</option>
                                )}
                                </Input>
                              </InputGroup>
                            </Col>
                            <Col md="2">
                              <InputGroup>
                              <Input type="select" name="wilayah" id="wilayah" className="fa fa-plus fa-lg mt-3"  onChange={this.handleChangeJabatan}>
                                <option value="">--Semua--</option>
                                {getUnique(users,'wilayah').map((model, index) =>
                                  <option key={index} value={model.wilayah}>{model.wilayah}</option>
                                )}
                                </Input>
                              </InputGroup>
                            </Col>
                        </Form>         
                                    
                    </div>
                    </CardBody>
                  <CardBody>
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
                            item.wilayah,
                            <div>
                            <i className="fa fa-edit font-2xl" onClick={this.togglePrimary2} id={[item.uid, item.nip, item.firstname, item.id_model]}  name={item.nik} columns="1" action="Edit"></i>&nbsp;
                            <i className="fa fa-trash font-2xl" onClick={this.togglePrimary2} id={[item.uid, item.nip, item.firstname, item.id_model]} name={item.nik} action="Delete"></i>
                            </div>
                        ];
                        })}
                        options={options}
                    />
                    <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                        className={'modal-primary ' + this.props.className}>
                    <ModalHeader toggle={this.cancel}>Add User</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                    <ModalBody>
                            <FormGroup row>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
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
                                    <Input type="text" id="id_model" name="last_name" placeholder="last_name" value={this.state.last_name} onChange={this.handleChange}/>
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
                                    <Input type="text" id="name_model" name="name_model" placeholder="Nama Model" value={this.state.name_model} onChange={this.handleChange}/>
                                    </InputGroup>
                                    
                                </Col>
                            </FormGroup>
                            {/* <CardFooter >
                                <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                            </CardFooter> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" >Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.cancel}>Cancel</Button>
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

export default withFirebase(Hasil);
