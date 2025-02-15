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
    Table,
    Modal, ModalBody, ModalFooter, ModalHeader
  } from 'reactstrap';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

import kompetens from '../Kompetensi/Kompeten';
import { withFirebase } from '../../firebase';
import PropTypes from 'prop-types';
import MUIDataTable from "mui-datatables";

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
        name: 'Nama Cluster',
        options: {
        filter: true,
        sort: false,
        // display : 'excluded',
        // customBodyRender: (value, tableMeta, updateValue) => {

        //     const xy = tableMeta.rowData[2].props
        //     // .split('//**//')[1]
        //     // console.log(value,xy)
        //     // console.log(value,tableMeta.rowData[2].props.children[0].props.id, updateValue)
        //     return (
        //       <a href={value}>{value}</a>
        //     );
        //   }
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
  const kompeten = propss.kompeten
  const userLink = `/modelClusterAdd/${kompeten.uid}`
  const number =0;   
  const getBadge = (roles) => {
    return roles === 'ADMIN' ? 'success' :
            roles === 'EVALUATOR' ? 'secondary' :
            roles === 'USER' ? 'warning' :
            roles === '' ? 'danger' :
            'primary'
  }

  return (
    <tr >
      <td>{kompeten.key}</td>
      <th scope="row"><Link to={userLink}><Badge size="50" color="primary"><i className="fa fa-plus fa-lg mt-2"></i> Add Cluster</Badge></Link></th>
      <td>{kompeten.name_model}</td>
    </tr>
  )
}

function LinkUserList(cluster){
  const Cluster = cluster.cluster
  const ClusterLink = `${cluster.url}/cluster/${cluster.id_model}/${Cluster.uid}`
  return (
    <Link to={ClusterLink}>{Cluster.nama_cluster}</Link>
  )
}

class Clusters extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.togglePrimary2 = this.togglePrimary2.bind(this);
    
    this.state = {
      loading: false,
      cluster: [],
      id_model:'',
      name_model:'',
      nama_cluster:'',
      id_kompeten:'',
      kompeten: this.props.location.state,
      modal: false,
      large: false,
      small: false,
      primary: false,
      primary2: false,
      clusters : [],
      action:'',

      id_jabatan:'',
      jabatan:'',

      ...props.location.state,
    };
  }

  componentDidMount() {
    // const user = usersData.find( user => user.id.toString() === this.props.match.params.id)
    // const Kompeten = this.state.kompeten
    // console.log(this.props.match.url)
    // if (this.state.kompeten == null) {
    //         this.props.history.push("/Kompetens")
    //   }
    const refModel = 
                    this.props.firebase.kompetenModel(this.props.match.params.id)
                    .onSnapshot(snapshot => {
                        const model = snapshot.data()

                        this.setState({
                        name_model: model.name_model,
                        });
                    });
                    this.props.firebase.kompetenJabatan(this.props.match.params.id, this.props.match.params.id_jabatan)
                    .onSnapshot(snapshot => {
                        const jabatan_ = snapshot.data()
                        this.setState({
                        id_model: this.props.match.params.id,
                        id_jabatan: this.props.match.params.id_jabatan,
                        jabatan: jabatan_.jabatan,
                        });
                    });


        this.unsubscribe = this.props.firebase
        .kompeten(this.props.match.params.id, this.props.match.params.id_jabatan)
        .onSnapshot(snapshot => {
          let clusters = [];
          
          snapshot.forEach(doc =>
            clusters.push({ ...doc.data(), uid: doc.id }),
          );
  
          this.setState({
            clusters,
            loading: false,
          });
          
        }); 

  }

    componentWillUnmount() {
        this.unsubscribe()
        // this.unsubscribe && this.unsubscribe();
    }

    handleSubmit (e) {
    e.preventDefault();
    const { id_model,id_jabatan, name_model, nama_cluster } = this.state;
        if(id_model =='' || name_model =='' || nama_cluster == ''){
            swal("Data Belum Lengkap")
        }else{
            this.props.firebase
            .kompeten(id_model, id_jabatan)
            .add({
                nama_cluster,
            }).then((docRef) => {
                this.setState({
                    primary: !this.state.primary,
                    nama_cluster: '',
                });
                // this.props.history.push("/")
                swal("Success Add Data")
            })
            .catch((error) => {
                swal("Failed Add Data")
                console.error("Error adding document: ", error);
            });
        }
    }

    handleEditDelete=event =>{
        event.preventDefault();
        const { id_model, id_jabatan,id_cluster, name_model, nama_cluster,action } = this.state;
        console.log(id_model, id_jabatan, id_cluster, nama_cluster, action)
        if(action == 'Edit'){
            const updateRef = this.props.firebase.kompetenCluster(id_model, id_jabatan, id_cluster);
            updateRef.set({
            nama_cluster,
            }).then((docRef) => {
            this.setState({
                nama_cluster: '',
                primary2: !this.state.primary2,
            })
            swal("Success", "Success Update Data", "success")
            })
            .catch((error) => {
            console.error("Error adding document: ", error);
            });
        }else{
            const updateRef = this.props.firebase.kompetenCluster(id_model, id_jabatan, id_cluster).delete()
                .then((docRef) =>  {
                this.setState({
                    nama_cluster: '',
                    primary2: !this.state.primary2,
                })
                swal("Success", "Success Delete Data", "success")
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
        }
    }

    handleClick=e=>{
        // e.preventDefault()
        const {clusters} = this.state
        const cell = e.dataIndex
        const id_model = this.state.id_model
        const id = clusters[cell].uid
        const url=this.props.match.url
        console.log(cell, clusters, url)
        // `${cluster.url}/cluster/${cluster.id_model}/${Cluster.uid}`
        const KompetenLink = `${url}/cluster/${id}`
        console.log(KompetenLink)
        this.props.history.push({
                    pathname: KompetenLink,
                    })
    }

    handleDelete=event =>{
        event.preventDefault();
        const { id_model} = this.state;

        const updateRef = this.props.firebase.kompetenModel(id_model).delete().then(function() {
            console.log("Document successfully deleted!");
            swal("Success", "Document successfully deleted!", "success")
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        
    }
    

    togglePrimary(e) {
        e.preventDefault();
        // const r = document.getElementsByClassName("mr-1")[0].getAttribute("id"); 
        this.setState({
          primary: !this.state.primary,
          id_model : this.props.match.params.id,
        });
        
    }

    togglePrimary2(e) {
        e.preventDefault();
        // const r = document.getElementsByClassName("mr-1")[0].getAttribute("id");
        const attribute = document.getElementsByClassName(e.target.className)[0]; 
        let action = attribute.getAttribute("action")
        const data = e.target.id; 
        var array = data.split(",")
        var id = array[0]
        var name = array[1]
        this.setState({
          primary2: !this.state.primary2,
          id_cluster : id,
          nama_cluster : name,
          action:action,
        });
    }

    handleChange =event =>{
        this.setState({[event.target.name]: event.target.value});
    }

    cancel =event =>{
        const name_primary = event.target.name
        if(name_primary == "primary"){
            this.setState({
                    [event.target.name]: !this.state.primary,
                    id_model: '',
                    nama_cluster: ''
                    });
        }else{
            this.setState({
                [event.target.name]: !this.state.primary2,
                id_model: '',
                nama_cluster: ''
                });
        }
    }

    
  render() {
    const { id_model, clusters, loading, nama_cluster, jabatan } = this.state;
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
            if(cell == 1){
                this.handleClick(RowIndex);
            }
        },
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                {/* <Link to="/Kompetens"><i className="fa fa-arrow-left font-1xl"></i></Link>&nbsp; */}
                {/* <i className="fa fa-align-justify"></i> */}
                List <small className="text-muted">Cluster</small>
              </CardHeader>
                <CardBody>
                    <Button color="primary" onClick={this.togglePrimary} className="mr-1"><i className="fa fa-plus fa-lg mt-2"></i> <small className="text-muted">Add</small> Cluster</Button>
                </CardBody>
              <CardBody>
                {/* <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">Nama Cluster</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clusters.map((cluster, index) =>
                      <tr key={cluster.uid.toString()}>
                      <td>{index+1}</td>
                      <td><LinkUserList cluster={cluster} id_model={id_model} url={this.props.match.url}/></td>
                      <td scope="row">
                      <i className="fa fa-edit font-2xl" onClick={this.togglePrimary2} id={cluster.uid} name={cluster.nama_cluster} action="Edit"></i> &nbsp;
                      <i className="fa fa-trash font-2xl" onClick={this.togglePrimary2} id={cluster.uid} name={cluster.nama_cluster} action="Delete"></i>
                      </td>
                    </tr>
                    )}
                  </tbody>
                </Table> */}
                <MUIDataTable
                    title=""
                    columns={columns}
                    data={Object.values(clusters).map((item, index) => {
                    return [
                        <div key={item.uid}>{index+1}</div>,
                        item.nama_cluster,
                        <div>
                        <i className="fa fa-edit font-2xl" onClick={this.togglePrimary2} id={[item.uid, item.nama_cluster]}  name={item.nama_cluster} columns="1" action="Edit"></i>&nbsp;
                        <i className="fa fa-trash font-2xl" onClick={this.togglePrimary2} id={[item.uid, item.nama_cluster]} name={item.nama_cluster} action="Delete"></i>
                        </div>
                    ];
                    })}
                    options={options}
                /> 
              </CardBody>
              <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                        className={'modal-primary ' + this.props.className}>
                    <ModalHeader toggle={this.cancel}>Add Cluster</ModalHeader>
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
                                    <Input type="text" id="name_model" name="name_model" placeholder="Name Model" value={this.state.name_model} onChange={this.handleChange} disabled/>
                                    </InputGroup>
                                    
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" name="jabatan" id="jabatan" value={this.state.jabatan} onChange={this.handleChange} disabled/>
                                    </InputGroup>
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="nama_cluster" name="nama_cluster" placeholder="Name Cluster" value={this.state.nama_cluster} onChange={this.handleChange}/>
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
                <Modal isOpen={this.state.primary2} toggle={this.togglePrimary2}
                        className={'modal-primary ' + this.props.className}>
                    <ModalHeader >{this.state.action} Cluster</ModalHeader>
                    <Form onSubmit={this.handleEditDelete}>
                    <ModalBody>
                            <FormGroup row>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" disabled="on" id="name_model" name="name_model" placeholder="Nama Model" value={this.state.name_model} onChange={this.handleChange}/>
                                    </InputGroup>
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" name="jabatan" id="jabatan" value={this.state.jabatan} onChange={this.handleChange} disabled/>
                                    </InputGroup>
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="nama_cluster" name="nama_cluster" placeholder="Nama Cluster" value={this.state.nama_cluster} onChange={this.handleChange}/>
                                    </InputGroup>
                                </Col>
                            </FormGroup>
                            {/* <CardFooter >
                                <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                            </CardFooter> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" >Do Something</Button>{' '}
                        <Button color="secondary" name="primary2" onClick={this.cancel}>Cancel</Button>
                    </ModalFooter>
                    </Form>
                    </Modal>
            </Card>
          </Col>
        </Row>
    </div>
    )
  }
}

export default withFirebase(Clusters);
