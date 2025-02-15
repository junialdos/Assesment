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
        name: 'Nama Kompetensi',
        options: {
        filter: true,
        sort: false,
        },
    },
    {
        name: 'Requirment',
        options: {
        filter: true,
        sort: false,
        },
    },
    {
        name: 'Level 1',
        options: {
        filter: true,
        sort: false,
        },
    },
    {
        name: 'Level 2',
        options: {
        filter: true,
        sort: false,
        },
    },
    {
        name: 'Level 3',
        options: {
        filter: true,
        sort: false,
        },
    },
    {
        name: 'Level 4',
        options: {
        filter: true,
        sort: false,
        },
    },
    {
        name: 'Level 5',
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
  const ClusterLink = `/kompetens/model/cluster/${Cluster.uid}`
  return (
    <Link to={{
        pathname: ClusterLink,
        state: { Cluster },
      }}><Badge size="50" color="primary"><i className="fa fa-plus fa-lg mt-2"></i> Add Kompetensi</Badge></Link>
  )
}

class Kompetens extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditDelete = this.handleEditDelete.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.togglePrimary2 = this.togglePrimary2.bind(this);
    
    this.state = {
      loading: false,
      cluster: [],
      nama_kompetensi: [],
      id_model:'',
      name_model:'',
      nama_cluster:'',
      data_kompetensi:'',
      requirment:'',
      id_kompeten:'',
      kompeten:null,
      id_kompetensi:'',
      range:'',
      modal: false,
      large: false,
      small: false,
      primary: false,
      primary2: false,
      action: '',
      clusters : [],
      ...props.location.state,
      level1:'',
      level2:'',
      level3:'',
      level4:'',
      level5:'',
    };
  }

  componentDidMount() {
    const refModel = 
                    this.props.firebase.kompetenCluster(this.props.match.params.id, this.props.match.params.id_jabatan, this.props.match.params.id_cluster)
                    .onSnapshot(snapshot => {
                        const cluster = snapshot.data()
                        this.setState({
                        id_model: this.props.match.params.id,
                        id_jabatan: this.props.match.params.id_jabatan,
                        id_cluster: this.props.match.params.id_cluster,
                        nama_cluster: cluster.nama_cluster,
                        });
                    });
    this.unsubscribe = this.props.firebase.kompetensi(this.props.match.params.id, this.props.match.params.id_jabatan, this.props.match.params.id_cluster)
                    .onSnapshot(snapshot => {
                        let nama_kompetensi = [];
                        
                        snapshot.forEach(doc =>
                            nama_kompetensi.push({ ...doc.data(), uid: doc.id }),
                        );
                        
                        this.setState({
                        nama_kompetensi,
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
    const { id_model,id_jabatan, id_cluster, data_kompetensi, requirment, level1, level2, level3, level4, level5 } = this.state;

        // console.log(id_model,id_jabatan, id_cluster, data_kompetensi, requirment )
        if( data_kompetensi == '' || requirment == ''){
            swal("Data Belum Lengkap")
        }else{
            this.props.firebase
            .kompetensi(id_model, id_jabatan, id_cluster)
            .add({
                data_kompetensi,
                requirment,
                level1,
                level2,
                level3,
                level4,
                level5,
            }).then((docRef) => {
                this.setState({
                    primary: !this.state.primary,
                    data_kompetensi: '',
                    requirment: '',
                    level1:'',
                    level2:'',
                    level3:'',
                    level4:'',
                    level5:'',
                });
                // this.props.history.push("/")
                swal("Success Add Data")
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        }
    }

    handleEditDelete (e) {
        e.preventDefault();
        const { id_model, id_jabatan, id_cluster, id_kompetensi, name_model, nama_cluster, data_kompetensi, requirment, action, level1, level2, level3, level4, level5 } = this.state;
        if(action == 'Edit'){
            if(data_kompetensi =='' || requirment =='' || level1 =='' || level2 ==''|| level3 ==''|| level4 ==''|| level5 ==''){
                    swal("Data Belum Lengkap")
                }else{
                    this.props.firebase
                    .kompetensiRange(id_model, id_jabatan, id_cluster, id_kompetensi)
                    .set({
                        data_kompetensi,
                        requirment,
                        level1,
                        level2,
                        level3,
                        level4,
                        level5,
                    }).then((docRef) => {
                        this.setState({
                            primary2: !this.state.primary2,
                            data_kompetensi: '',
                            requirment: '',
                            level1:'',
                            level2:'',
                            level3:'',
                            level4:'',
                            level5:'',
                        });
                        // this.props.history.push("/")
                        swal("Success", "Success Update Data", "success")
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
            }
        }else{
            this.props.firebase.kompetensiRange(id_model, id_jabatan, id_cluster, id_kompetensi).delete()
                .then((docRef) =>  {
                this.setState({
                    data_kompetensi: '',
                    requirment: '',
                    level1:'',
                    level2:'',
                    level3:'',
                    level4:'',
                    level5:'',
                    primary2: !this.state.primary2,
                })
                swal("Success", "Success Delete Data", "success")
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
        }
    }

    handleEdit=event =>{
        event.preventDefault();
        const { id_model, name_model } = this.state;

        const updateRef = this.props.firebase.kompetenModel(id_model);
        updateRef.set({
        name_model,
        }).then((docRef) => {
        this.setState({
            name_model: '',
            primary: !this.state.primary,
        })
        
        })
        .catch((error) => {
        console.error("Error adding document: ", error);
        });
    }

    togglePrimary(e) {
        e.preventDefault();
        // const r = document.getElementsByClassName("mr-1")[0].getAttribute("id");
        const {id_cluster, nama_cluster} =  this.state
        this.setState({
          primary: !this.state.primary,
          id_cluster : id_cluster,
          nama_cluster : nama_cluster,
        });
        
    }

    togglePrimary2(e) {
        e.preventDefault();
        const {data_kompetensi, requirment} = this.state
        const attribute = document.getElementsByClassName(e.target.className)[0]; 
        let action = attribute.getAttribute("action")
        const data = e.target.id; 
        var array = data.split(",")
        var id = array[0]
        var name = array[1]
        var requirment_ = array[2]
        var level1_ = array[3]
        var level2_ = array[4]
        var level3_ = array[5]
        var level4_ = array[6]
        var level5_ = array[7]
        this.setState({
            primary2: !this.state.primary2,
            id_kompetensi : id,
            data_kompetensi : name,
            requirment : requirment_,
            level1 :level1_,
            level2 :level2_,
            level3 :level3_,
            level4 :level4_,
            level5 :level5_,
            action : action,
        });
    }

    handleChange = event =>{
        event.preventDefault()
        this.setState({[event.target.name]: event.target.value});

    }

    cancel = event =>{
        const name_primary = event.target.name
        const {data_kompetensi, requirment} = this.state
        if(name_primary == "primary"){
            this.setState({
                    [event.target.name]: !this.state.primary,
                    data_kompetensi: '',
                    requirment: '',
                    level1:'',
                    level2:'',
                    level3:'',
                    level4:'',
                    level5:'',
                    });
        }else{
            this.setState({
                [event.target.name]: !this.state.primary2,
                data_kompetensi: '',
                requirment: '',
                level1:'',
                level2:'',
                level3:'',
                level4:'',
                level5:'',
            });
        }
    }
    handleClick=e=>{
        // e.preventDefault()
        const {nama_kompetensi} = this.state
        const cell = e.dataIndex
        const id_model = this.state.id_model
        const id_cluster = this.state.id_model
        const id = nama_kompetensi[cell].uid
        const url=this.props.match.url
        // `${cluster.url}/cluster/${cluster.id_model}/${Cluster.uid}`
        const LevelLink = `${url}/level/${id_model}/${id_cluster}/${id}`
        // this.props.history.push({
        //             pathname: LevelLink,
        //             })
    }

  render() {
    const { id_model, nama_kompetensi, loading, nama_cluster, data_kompetensi, requirment, level1, level2, level3, level4, level5 } = this.state
    const urlback = `/model/${id_model}`
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
              {/* {console.log(this.props)} */}
                  
                {/* <Link to={urlback}><i className="fa fa-arrow-left font-1xl"></i></Link>&nbsp; */}
                 List <small className="text-muted">Kompetensi</small>
              </CardHeader>
              <CardBody>
                    <Button color="primary" onClick={this.togglePrimary} className="mr-1"><i className="fa fa-plus fa-lg mt-2"></i> <small className="text-muted">Add</small> Kompetensi</Button>
                </CardBody>
              <CardBody>
                {/* <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Nama Kompetensi</th>
                      <th scope="col">Range</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kompetensi.map((kompetensi, index) =>
                      <tr key={kompetensi.uid.toString()}>
                      <td>{index+1}</td>
                      <td>{kompetensi.name_kompetensi}</td>
                      <td>{kompetensi.range}</td>
                      <th scope="row">
                      <i className="fa fa-edit font-2xl" onClick={this.togglePrimary2} id={kompetensi.uid} name={kompetensi.name_kompetensi} action="Edit"></i> &nbsp;
                      <i className="fa fa-trash font-2xl" onClick={this.togglePrimary2} id={kompetensi.uid} name={kompetensi.name_kompetensi} action="Delete"></i></th>
                    </tr>
                    )}
                  </tbody>
                </Table> */}
                <MUIDataTable
                    title=""
                    columns={columns}
                    data={Object.values(nama_kompetensi).map((item, index) => {
                    return [
                        <div key={item.uid}>{index+1}</div>,
                        item.data_kompetensi,
                        item.requirment,
                        item.level1,
                        item.level2,
                        item.level3,
                        item.level4,
                        item.level5,
                        <div>
                        <i className="fa fa-edit font-2xl" onClick={this.togglePrimary2} id={[item.uid, item.data_kompetensi, item.requirment, item.level1, item.level2, item.level3, item.level4, item.level5]}  name={item.data_kompetensi} columns="1" action="Edit"></i>&nbsp;
                        <i className="fa fa-trash font-2xl" onClick={this.togglePrimary2} id={[item.uid, item.data_kompetensi, item.requirment, item.level1, item.level2, item.level3, item.level4, item.level5]} name={item.data_kompetensi} action="Delete"></i>
                        </div>
                    ];
                    })}
                    options={options}
                />
              </CardBody>
              <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                        className={'modal-primary ' + this.props.className}>
                    <ModalHeader >Add Kompetensi</ModalHeader>
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
                                    <Input type="text" id="nama_cluster" name="nama_cluster" placeholder="Name Cluster" value={this.state.nama_cluster} onChange={this.handleChange} disabled/>
                                    </InputGroup>
                                    
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="data_kompetensi" name="data_kompetensi" placeholder="Name Kompetensi" value={this.state.data_kompetensi} onChange={this.handleChange}/>
                                    </InputGroup>
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="requirment" name="requirment" placeholder="Requirment" value={this.state.requirment} onChange={this.handleChange}/>
                                    </InputGroup>
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="level1" name="level1" placeholder="Name Analisis" value={this.state.level1} onChange={this.handleChange}/>
                                    </InputGroup>
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="level2" name="level2" placeholder="Name Analisis" value={this.state.level2} onChange={this.handleChange}/>
                                    </InputGroup>
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="level3" name="level3" placeholder="Name Analisis" value={this.state.level3} onChange={this.handleChange}/>
                                    </InputGroup>
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="level4" name="level4" placeholder="Name Analisis" value={this.state.level4} onChange={this.handleChange}/>
                                    </InputGroup>
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="level5" name="level5" placeholder="Name Analisis" value={this.state.level5} onChange={this.handleChange}/>
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
                    <ModalHeader >{this.state.action} Kompetensi</ModalHeader>
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
                                    <Input type="text" disabled="on" id="nama_cluster" name="nama_cluster" placeholder="Nama Cluster" value={this.state.nama_cluster} onChange={this.handleChange}/>
                                    </InputGroup>
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="data_kompetensi" name="data_kompetensi" placeholder="Name Kompetensi" value={this.state.data_kompetensi} onChange={this.handleChange}/>
                                    </InputGroup>
                                    
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="requirment" name="requirment" placeholder="Requirment" value={this.state.requirment} onChange={this.handleChange}/>
                                    </InputGroup>
                                    
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="level1" name="level1" placeholder="Name Level 1" value={this.state.level1} onChange={this.handleChange}/>
                                    </InputGroup>
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="level2" name="level2" placeholder="Name Level 2" value={this.state.level2} onChange={this.handleChange}/>
                                    </InputGroup>
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="level3" name="level3" placeholder="Name Level 3" value={this.state.level3} onChange={this.handleChange}/>
                                    </InputGroup>
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="level4" name="level4" placeholder="Name Level 4" value={this.state.level4} onChange={this.handleChange}/>
                                    </InputGroup>
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="level5" name="level5" placeholder="Name Level 5" value={this.state.level5} onChange={this.handleChange}/>
                                    </InputGroup>
                                </Col>
                            </FormGroup>
                            {/* <CardFooter >
                                <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                            </CardFooter> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" >{this.state.action}</Button>{' '}
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

export default withFirebase(Kompetens);
