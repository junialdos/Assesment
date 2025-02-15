import React, { Component } from 'react';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
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
    Table,
    Modal, ModalBody, ModalFooter, ModalHeader
  } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { withFirebase } from '../../firebase';
import swal from 'sweetalert';
const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
}
function UserRow(props) {
    const user = props.user
    // const userLink = `/users/${users.id}`
    var sudah =0;
    var belum =0;
    user.forEach(item => {
        if(item.status == false){
            belum = belum+1
        }else{
            sudah = sudah+1
        }
    });
      const bar = {
        labels: [user[0].wilayah],
        datasets: [
          {
              label: 'Belum',
              position: "top",
              backgroundColor: 'rgba(0, 0, 255)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(0, 0, 255)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: [belum],
              },
              {
              label: 'Selesai',
              position: "top",
              backgroundColor: 'rgba(255, 0, 0)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255, 0, 0)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: [sudah],
              },
        ],
    };
  
    const getBadge = (status) => {
      return status === 'Active' ? 'success' :
        status === 'Inactive' ? 'secondary' :
          status === 'Pending' ? 'warning' :
            status === 'Banned' ? 'danger' :
              'primary'
    }
  
    return (
        <Bar data={bar} options={options} />
        
    //   <tr key={user.id.toString()}>
    //     <th scope="row"><Link to={userLink}>{user.id}</Link></th>
    //     <td><Link to={userLink}>{user.name}</Link></td>
    //     <td>{user.registered}</td>
    //     <td>{user.role}</td>
    //     <td><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td>
    //   </tr>
    )
  }

class ChartWilayahBagian extends Component {
    constructor(props) {
        super(props);
        // this.handleChange = this.
        // this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.togglePrimary = this.togglePrimary.bind(this);
            this.state = {
            wilayahs : [],
            users: [],
            userssend:[],
            primary: false,
            id_user:'',
            wilayah:'',
            message:'',
            authUser: JSON.parse(localStorage.getItem('authUser')),
            ...props.location.state,
            
        }
      }
    
    componentDidMount() {
        this.unsubscribe=  this.state.authUser.wilayah != "PUSAT" ? 
        this.props.firebase.users()
    .where("roles", "==", ["KARYAWAN BIASA"])
    .where("wilayah", "==", this.state.authUser.wilayah)
    .onSnapshot(snapshot => {
        let users = [];
        snapshot.forEach(doc =>
                    users.push({ ...doc.data(), uid:doc.id}),
          )
        this.setState({
            users,
        })
    })
    :
        // this.unsubscribe =  
        this.props.firebase.users()
    .where("roles", "==", ["KARYAWAN BIASA"])
    .onSnapshot(snapshot => {
        let users = [];
        snapshot.forEach(doc =>
                    users.push({ ...doc.data(), uid:doc.id}),
          )
        this.setState({
            users,
        })
    })
    }

    componentWillUnmount() {
    this.unsubscribe()
    // this.unsubscribe && this.unsubscribe();
    }

    handleChange =event =>{
        this.setState({[event.target.name]: event.target.value});
    }

    togglePrimary(e) {
        e.preventDefault();
        // const r = document.getElementsByClassName("mr-1")[0].getAttribute("id"); 
        // console.log(e.target)
        const data = e.target.id; 
        var array = data.split(",")
        var id = array[0]
        var name = array[1]

        this.props.firebase.users()
        .where("roles", "==", ["ADMIN"])
        .where("wilayah", "==", name)
        .onSnapshot(snapshot => {
            let userssend = [];
            snapshot.forEach(doc =>
                userssend.push({ ...doc.data(), uid: doc.id }),
              );
            this.setState({
                userssend,
                wilayah:name,
                primary: !this.state.primary,
              });
        })
    }

    handleSubmit (e) {
        e.preventDefault();
        const { wilayah, message,userssend } = this.state;
                if(userssend.length >0){
                    if(message =='' ){
                        swal("Pesan Kosong")
                    }else{
                        this.props.firebase
                        .pesan()
                        .add({
                            message,
                            wilayah,
                        }).then((docRef) => {
                            this.setState({
                                primary: !this.state.primary,
                                nama_cluster: '',
                            });
                            // this.props.history.push("/")
                            swal("Pesan Terkirim")
                        })
                        .catch((error) => {
                    swal("Gagal Kirim Pesan")
                    console.error("Error adding document: ", error);
                    });
                }
            }else{
                swal("Info","Maaf gagal mengirim pesan ke admin "+wilayah+" karna adminnya belum terdaftar","info")
            }
        }

        cancel =event =>{
            const name_primary = event.target.name
            if(name_primary == "primary"){
                this.setState({
                        [event.target.name]: !this.state.primary,
                        });
            }else{
                this.setState({
                    [event.target.name]: !this.state.primary2,
                    });
            }
        }

  render() {
    const {users, authUser, userssend} = this.state

    const groupBy = key => array =>
    array.reduce(
        (objectsByKeyValue, obj) => ({
        ...objectsByKeyValue,
        [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
        }),
        {}
    );

    const groupByWilayah = groupBy('wilayah');
    const groupByColor = groupBy('color');


    const valueGroupByWilayah = groupByWilayah(users);

    
    return (
      <div className="animated fadeIn">
      <Row>
            {Object.values(valueGroupByWilayah).map((user, index) =>
          <Col xs="12" sm="6">
          <Card>
            <CardHeader>
              {user[0].wilayah}
              <div className="card-header-actions">
                {/* <a href="http://www.chartjs.org" className="card-header-action"> */}
                {authUser.wilayah == "PUSAT" ? <Button size="sm" color="info" onClick={this.togglePrimary} id={[user[0].uid,user[0].wilayah]} key={index}><i className="fa fa-send fa-lg mt-2" id={[user[0].uid,user[0].wilayah]} key={index}></i> <small className="text-muted"></small></Button>:''}
                  {/* <small className="text-muted">user</small> */}
                {/* </a> */}
              </div>
            </CardHeader>
                    {/* //   <tr key={kompetensi.uid.toString()}>
                    //   <td>{index+1}</td>
                    //   <td>{kompetensi.name_kompetensi}</td>
                    //   <td>{kompetensi.range}</td>
                    //   <th scope="row">
                    //   <i className="fa fa-edit font-2xl" onClick={this.togglePrimary2} id={kompetensi.uid} name={kompetensi.name_kompetensi} action="Edit"></i> &nbsp;
                    //   <i className="fa fa-trash font-2xl" onClick={this.togglePrimary2} id={kompetensi.uid} name={kompetensi.name_kompetensi} action="Delete"></i></th>
                    // </tr> */}
                    <CardBody>
                    <div className="chart-wrapper" >
                        <UserRow key={index} user={user}/>
                        {/* <Bar data={bar} options={options} /> */}
                    </div>
                    </CardBody>
            
          </Card>
        </Col>
            )}
        <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                        className={'modal-primary ' + this.props.className}>
                    <ModalHeader toggle={this.cancel}>Send Message</ModalHeader>
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
                                    <Input type="text" id="message" name="message" placeholder="Message" value={this.state.message} onChange={this.handleChange}/>
                                    </InputGroup>
                                </Col>
                            </FormGroup>
                            {/* <CardFooter >
                                <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                            </CardFooter> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" >Do Something</Button>{' '}
                        <Button color="secondary" name="primary" onClick={this.cancel}>Cancel</Button>
                    </ModalFooter>
                    </Form>
                </Modal>
      </Row>
      </div>
    );
  }
}
export default withFirebase(ChartWilayahBagian);

// export default ChartWilayah;
