import React, { useState } from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import './Duration.css';

const Duration = (props) => {
    const [start, setStart] = useState('');
    const [starty, setStarty] = useState('');
    const [end, setEnd] = useState('');
    const [endy, setEndy] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        const data = {
            start,
            starty,
            end,
            endy
        }
        axios.post('/res', {
            method: "POST",
            headers:{
                "content_type":"application/json",
            },
            body: data
        })
            .then(res => 
                props.history.push({
                    pathname: '/result',
                    state: res.data
                })
            )
            .catch(err => console.log(err));
    };

    return (
        <div className="Body-f">
            <div className="Content">
                <Container>
                    <div className="headin">
                        <h5 className="H5">DURATION SELECTION</h5>
                    </div>
                    <Form className="Form" onSubmit={onSubmit}>
                        <h5 className="TimeHead">Start Period</h5>
                        <div className="Group">
                            <FormGroup className="Item-r Item">
                                <Label htmlfor="exampleSelect">Start Month</Label>
                                <Input type="select" className="Input" name="select" id="exampleSelect" value={start} onChange={(e) => setStart(e.target.value)}>
                                    <option defaultValue>Select...</option>
                                    <option>January</option>
                                    <option>Feburary</option>
                                    <option>March</option>
                                    <option>April</option>
                                    <option>May</option>
                                    <option>June</option>
                                    <option>July</option>
                                    <option>August</option>
                                    <option>September</option>
                                    <option>October</option>
                                    <option>November</option>
                                    <option>December</option>
                                </Input>
                            </FormGroup>
                            <FormGroup className="Item">
                                <Label for="exampleSelect">Start Year</Label>
                                <Input type="select" className="Input" name="select" id="exampleSelect" value={starty} onChange={(e) => setStarty(e.target.value)}>
                                    <option defaultValue>Select...</option>
                                    <option>2020</option>
                                    <option>2021</option>
                                    <option>2022</option>
                                    <option>2023</option>
                                    <option>2024</option>
                                    <option>2025</option>
                                </Input>
                            </FormGroup>
                        </div>
                        <h5 className="TimeHead">End Period</h5>
                        <div className="Group">
                            <FormGroup className="Item-r Item">
                                <Label for="exampleSelect">End Month</Label>
                                <Input type="select" className="Input" name="select" id="exampleSelect" value={end} onChange={(e) => setEnd(e.target.value)}>
                                    <option defaultValue>Select...</option>
                                    <option>January</option>
                                    <option>Feburary</option>
                                    <option>March</option>
                                    <option>April</option>
                                    <option>May</option>
                                    <option>June</option>
                                    <option>July</option>
                                    <option>August</option>
                                    <option>September</option>
                                    <option>October</option>
                                    <option>November</option>
                                    <option>December</option>
                                </Input>
                            </FormGroup>
                            <FormGroup className="Item">
                                <Label for="exampleSelect">End Year</Label>
                                <Input type="select" className="Input" name="select" id="exampleSelect" value={endy} onChange={(e) => setEndy(e.target.value)}>
                                    <option defaultValue>Select...</option>
                                    <option>2020</option>
                                    <option>2021</option>
                                    <option>2022</option>
                                    <option>2023</option>
                                    <option>2024</option>
                                    <option>2025</option>
                                </Input>
                            </FormGroup>
                        </div>
                        <Button className="Btn" color="success">Predict</Button>
                    </Form>
                </Container>
            </div>
        </div>
    )
}

export default Duration;