import React, { Component, Fragment } from 'react';
import {withRouter} from 'react-router-dom';
import { Container, Table } from 'reactstrap';
import './Prediction.css';

class Prediction extends Component {
    state = {
        temp: [],
        humi: [],
        rain: [],
        years: [],
        months: [],
        days: [],
        totalmonth: [],
        start: 0,
        i: 0,
        stop: null,
        load: true
    }

    componentDidMount() {
        console.log(this.props.location.state);
        this.setState({
            temp: this.props.location.state.temp,
            humi: this.props.location.state.humi,
            rain: this.props.location.state.rain,
            years: this.props.location.state.years,
            months: this.props.location.state.months,
            days: this.props.location.state.days,
            totalmonth: this.props.location.state.totalmonth,
            stop: this.props.location.state.days[this.state.i]
        })
    }

    setFigures = () => {
        console.log("Here");
        if(this.stateload) {
            this.setState({
                start: this.state.stop,
                stop:this.state.days[this.state.i]
            })
        }
    }

    render() {
        let t = 0;
        let st = 0;
        let sp = 0;
        let mpointer = 0;
        let ms = 0;
        let me = 0;
        let tempOutput = this.state.temp.slice(st, sp).map((temp, index) => {
            console.log(st);
            return (
            <div key={index}>{temp}</div>
        )})

        let month = this.state.years.map((year, index) => {
            ms = 0 + me;
            me = me + this.state.totalmonth[mpointer];
            console.log(this.state.totalmonth[mpointer]);
            mpointer = mpointer + 1;
            
            console.log(ms);
            console.log(me); 

            return (
                this.state.months.slice(ms, me).map((month, ind) => {
                    st = 0 + sp;
                    sp = sp + this.state.days[t];
                    t = t+1;
                    // console.log(sp);
                    return (
                    <>
                        <div key={ind} className="title">
                            <h1>{month} {year}</h1>
                        </div>
                        <Table hover size="md" dark responsive>
                            <thead>
                                <tr>
                                <th className="indN">Day</th>
                                <th className="tempN">Temprature(°C)</th>
                                <th className="humiN">Humidity(%)</th>
                                <th className="rainN">Precipitation(mm)</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                    {this.state.temp.slice(st, sp).map((temp, index) => {
                                        return (
                                        <Fragment key={index}>
                                            <tr>
                                            <th scope="row" className="ind">{index+1}</th>
                                            <td className="temp">{temp}</td>
                                            <td className="humi">{this.state.humi[index+st]}</td>
                                            <td className="rain">{this.state.rain[index+st]}</td>
                                            </tr>
                                        </Fragment>
                                    )})}
                            </tbody>
                        </Table>
                    </>
                )})
            )
        })

        return (
            <div className="Body">
                <div className="Content-b">
                    <Container>
                        <div className="Content-head">
                            <h5>RESULT</h5>
                            <div className="hold">
                                <div className="btne">
                                    <p>Export to Excel</p>
                                </div>
                                <div className="btnp">
                                    <p>Print</p>
                                </div>
                            </div>
                        </div>
                        <div className="Predict-Container">
                            <div className="Predict">
                               {month}
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

export default withRouter(Prediction);