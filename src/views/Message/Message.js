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
    Modal, ModalBody, ModalFooter, ModalHeader,
    ListGroup, ListGroupItem,
  } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { withFirebase } from '../../firebase';
import swal from 'sweetalert';

class Message extends Component {
    constructor(props) {
        super(props);
        // this.handleChange = this.
        // this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.togglePrimary = this.togglePrimary.bind(this);
            this.togglePrimary2 = this.togglePrimary2.bind(this);
            this.toggleAccordion = this.toggleAccordion.bind(this);
            this.toggleCustom = this.toggleCustom.bind(this);
            this.toggleFade = this.toggleFade.bind(this);
            this.state = {
            messages : [],
            message:'',
            authUser: JSON.parse(localStorage.getItem('authUser')),
            collapse: false,
            accordion: [true, false, false],
            custom: [true, false],
            status: 'Closed',
            fadeIn: true,
            timeout: 300,
            ...props.location.state,
            }
      }
      onEntering() {
        this.setState({ status: 'Opening...' });
      }
    
      onEntered() {
        this.setState({ status: 'Opened' });
      }
    
      onExiting() {
        this.setState({ status: 'Closing...' });
      }
    
      onExited() {
        this.setState({ status: 'Closed' });
      }
    
      toggle() {
        this.setState({ collapse: !this.state.collapse });
      }
    
      toggleAccordion(tab) {
    
        const prevState = this.state.accordion;
        const state = prevState.map((x, index) => tab === index ? !x : false);
    
        this.setState({
          accordion: state,
        });
      }
    
      toggleCustom(tab) {
    
        const prevState = this.state.custom;
        const state = prevState.map((x, index) => tab === index ? !x : false);
    
        this.setState({
          custom: state,
        });
      }
    
      toggleFade() {
        this.setState({ fadeIn: !this.state.fadeIn });
      }
    componentDidMount() {
        if(this.state.authUser.wilayah != "PUSAT"){
            this.unsubscribe=  
            this.props.firebase.pesan()
            .where("wilayah", "==", this.state.authUser.wilayah)
        .onSnapshot(snapshot => {
            let messages = [];
            snapshot.forEach(doc =>
                messages.push({ ...doc.data(), uid:doc.id, dari:"PUSAT"}),
            )
            this.setState({
                messages,
            })
            })
        }else{
            this.unsubscribe=  
            this.props.firebase.pesan()
        .orderBy("wilayah", "asc")
        .onSnapshot(snapshot => {
            let messages = [];
            snapshot.forEach(doc =>
                messages.push({ ...doc.data(), uid:doc.id, dari:doc.data().wilayah}),
            )
            this.setState({
                messages,
            })
            })
        }
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

        this.setState({
          primary: !this.state.primary,
          wilayah : name,
        });
        
    }

    togglePrimary2(e) {
      e.preventDefault();
      // const r = document.getElementsByClassName("mr-1")[0].getAttribute("id"); 
      // console.log(e.target)
      const data = e.target.id; 
      var array = data.split(",")
      var id = array[0]
      var name = array[1]

      this.props.firebase.pesanid(id).delete()
      swal("Success", "Success Delete Message", "success")
      // this.setState({
      //   primary: !this.state.primary,
      //   wilayah : name,
      // });
      
  }

    handleSubmit (e) {
        e.preventDefault();
        const { wilayah, message } = this.state;
        this.props.firebase.users()
        .where("roles", "==", ["ADMIN"])
        .where("wilayah", "==", wilayah)
        .orderBy("wilayah", "desc")
        .onSnapshot(snapshot => {
            let userssend = [];
            snapshot.forEach(doc =>
                userssend.push({ ...doc.data(), uid: doc.id }),
              );
            this.setState({
                userssend,
              });
           
        })

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
        toggleAccordion(tab) {

            const prevState = this.state.accordion;
            const state = prevState.map((x, index) => tab === index ? !x : false);
        
            this.setState({
              accordion: state,
            });
          }
          
  render() {
      const {messages, authUser} = this.state
      function getUnique(arr, comp) {

        const unique = arr
             .map(e => e[comp])
      
           // store the keys of the unique objects
          .map((e, i, final) => final.indexOf(e) === i && i)
      
          // eliminate the dead keys & store unique objects
          .filter(e => arr[e]).map(e => arr[e]);
      
         return unique;
      }
    return (
      <div className="animated fadeIn">
        <Col sm="12" xl="12">
            <Card>
            <CardBody>
                <div id="accordion">
                  <Card className="mb-0">
                    <CardHeader id="headingOne">
                      <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(0)} aria-expanded={this.state.accordion[0]} aria-controls="collapseOne">
                        <h5 className="m-0 p-0">ADMIN {authUser.wilayah}<Badge className="float-right" pill>{messages.length}</Badge></h5>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                      <CardBody>
                        <ListGroup>
                            {messages.map((model, index) =>
                            <ListGroupItem className="justify-content-between" key={index}>{model.message}
                            <div className="float-right">{authUser.wilayah == "PUSAT" ? <i className="fa fa-trash font-2xl" onClick={this.togglePrimary2} id={model.uid} name={model.message} action="Delete"></i>: ""}</div> 
                            <Badge className="float-right"><i>{authUser.wilayah == "PUSAT" ? "to: ":"from : "} </i>{model.dari} </Badge> </ListGroupItem>
                            )}
                        </ListGroup>
                      </CardBody>
                    </Collapse>
                  </Card>
                  </div>
        </CardBody>
        </Card>
          </Col>
      </div>
    );
  }
}
export default withFirebase(Message);

// export default ChartWilayah;
