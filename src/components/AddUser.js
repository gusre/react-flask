import React, { Component } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, FormFeedback, Col, FormText
}
    from 'reactstrap';
//import FormData from 'FormData';

class AddUserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            username: '',
            telnum: '',
            photo: '',
            touched: {
                username: false,
                telnum: false,
                photo: false
            }
        }
        this.baseState=this.state;
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validate = this.validate.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleImageChange=this.handleImageChange.bind(this);
    }
    handleBlur = (field) => (evt) => {
        console.log('Hi');
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        })
    }
    validate(telnum) {
        console.log('Hello');
        const errors = {
            telnum: ''
        };
        const reg = /^\d+$/;
        if (this.state.touched.telnum && !reg.test(telnum))
            errors.telnum = 'Contact number should contain only digits';
        console.log(errors.telnum);
        return errors;
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }
    handleImageChange(e) {
        e.preventDefault();
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          this.setState({
            photo: reader.result
          });
        };
      }
    handleLogin(event) {
        this.toggleModal();
        event.preventDefault();
        console.log(this.state.photo);
        const url = '/datahandler';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({'user':this.state.username,'contactnum':this.state.telnum,'photo':this.state.photo})
        };

        fetch(url,options)
            .then(response => {
                alert(response);
            });
            this.setState(this.baseState);

    }
    render() {
        const errors = this.validate(this.state.telnum);
        return (
            <div >
                <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span>Add User</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form  onSubmit={this.handleLogin} >
                            <FormGroup row>
                                <Label htmlFor="username" md={2}>User Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="username" name="username"
                                        placeholder="User Name"
                                        value={this.state.username}
                                        onBlur={this.handleBlur('username')}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Input type="tel" id="telnum" name="telnum"
                                        placeholder="Tel. Number"
                                        value={this.state.telnum}
                                        valid={errors.telnum === ''}
                                        invalid={errors.telnum !== ''}
                                        onBlur={this.handleBlur('telnum')}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.telnum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleFile">File</Label>
                                <Input type="file" name="exampleFile" id="exampleFile" onChange={this.handleImageChange}/>
                                <FormText color="muted">
                                    This is some placeholder block-level help text for the above input.
                                    It's a bit lighter and easily wraps to a new line.
                                </FormText>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div >
        );
    }
}

export default AddUserDetail;