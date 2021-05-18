import React, {useState, useEffect, Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    NavbarBrand,
    Container
  } from 'reactstrap';
  import './Landing.css';
  import Logo from '../../assets/cloud_pic.png';
  import humid from '../../assets/humid.png';
  import prec from '../../assets/prec.png';
  import temp from '../../assets/temp.png';
  import arrow from '../../assets/arrow.png';
  import cloud from '../../assets/cloud.mp4';

  class Landing extends Component {
    state = {
        tempno: '',
        humino: '',
        precno: '',
        loading: true
    }

    componentDidMount() {
        axios.get('/current')
        .then(res => {
            this.setState({
                tempno: res.data.temp,
                humino: res.data.humi,
                precno: res.data.prec
            })
        })
        .catch(err => console.log(err));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.loading) {
            console.log(this.state);
            this.setState({loading: false})
        }
    }

    render () {
        return (
            <div>
                <div className="Bodyd">
                    <div className="fullscreen-video-wrap">
                            <video src={cloud} autoPlay={true} loop={true}></video>
                        <div className="header-overlay"></div>
                    </div>
                            
                    <div className="header-content">
                            <div className="temp">
                                <h5>{this.state.tempno}°C</h5>
                            </div>
                            <div className="down">
                                <div className="circle-holder">
                                    <div className="circ">
                                        <div className="circle">
                                            <img src={humid} height="80" width="80" alt="" />
                                        </div>
                                        <div className="pe">
                                            <p>Humidity(%)</p>
                                        </div>
                                        <div className="Values">
                                            <p>{this.state.humino}</p>
                                        </div>
                                    </div>
                                    <div className="circtwo">
                                        <div className="circle">
                                            <img src={prec} height="80" width="80" alt="" />
                                        </div>
                                        <div className="pd">
                                            <p>Precipitation(mm)</p>
                                        </div>
                                        <div className="Values">
                                            <p>{this.state.precno}</p>
                                        </div>
                                    </div>
                                </div>
                                <Container>
                                    <div className="Buttons">
                                        <Link to="/duration" className="btns">Custom Predictions</Link>
                                        <Link to="/#instructions" className="read">Read Instructions</Link>
                                    </div>
                                </Container>
                            </div>
    
                        <div className="cont">
                            <img src={arrow} className="arrow" alt="arrow" />
                        </div> 
                    </div>
    
                    <div className="second">
                        <div className="heading">
                            <h5>A Predictive Climate System</h5>
                            <h4>For Agriculture</h4>
                        </div>
                        <Container>
                            <div className="subhead">
                                <p>This is a prediction system that helps in predicting future values of certain climate variables useful to agriculture in order to enable the user plan ahead of time to have good agricultural output and prevent unexpected result. The climatic variables includes:</p>
                            </div>
                            <div className="SC-holder">
                                <div className="Sec-Circle">
                                    <div className="circle_two right">
                                        <img src={temp} height="70" width="70" alt="" />
                                    </div>
                                    <p>Temperature</p>
                                </div>
                                <div className="Sec-Circle">
                                    <div className="circle_two right">
                                    <img src={prec} height="70" width="70" alt="" />
                                    </div>
                                    <p className="right">Precipitation</p>
                                </div>
                                <div className="Sec-Circle">
                                    <div className="circle_two right">
                                        <img src={humid} height="70" width="70" alt="" />
                                    </div>
                                    <p className="right">Humidity</p>
                                </div>
                            </div>
                        </Container>
                    </div>

                    <div className="inst" id={'instructions'}>
                        <div className="heading">
                            <h4>Instructions</h4>
                        </div>
                        <Container>
                            <div className="body_content">
                                <div className="content_left">
                                    <div className="number"><p>1</p></div>
                                    <div className="body_text">
                                        <p>To make custom predictions from a particular month and year to another period in the future, select the custom prediction button.</p>
                                    </div>
                                </div>
                                <div className="content_left">
                                    <div className="body_text_one">
                                        <p>Input values for the month from the dropdown and the year for both peroid required for the prediction then click the predict button to start prediction</p>
                                    </div>
                                    <div className="numberS"><p>2</p></div>
                                </div>
                                <div className="content_left">
                                    <div className="number"><p>3</p></div>
                                    <div className="body_text">
                                        <p>View the output of the prediction and export if you want to have to saved and you can plan all along and have a good agricultural year!</p>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;