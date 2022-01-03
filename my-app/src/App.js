import React, { Component } from 'react';
import axios from 'axios';
import Form from './components/Form.js';
import Chart from './components/Chart'
import PirChart from './components/PieChart'
import ScatterPlot from './components/ScatterChart'
import ProfileDetails from './components/ProfileDetails.js';
import './App.css'
import firebase from './components/Firebase'

class App extends Component {
    constructor() {
        super();
        this.state = {
            gitun: null,
            infoclean : '',
            formData: {
                username: '',
            },
        }
        this.handleUserFormSubmit = this.handleUserFormSubmit.bind(this);
        this.handleFormChange= this.handleFormChange.bind(this);
        const ref = firebase.firestore().collection("developers")
        console.log(ref)

    }
    handleUserFormSubmit(event) {
        event.preventDefault();
        axios.get('https://api.github.com/users/'+this.state.formData.username)
            .then(response => this.setState({
                gitun: response.data.login,
                infoclean: response.data,
            })).catch((err) => { console.log(err); });

    };
    handleFormChange(event) {
        const obj = this.state.formData;
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    };

    renderInfo(){
        return (
            <div>
            <p><b>Username:</b></p>
            <p>{this.state.gitun}</p>
                <ProfileDetails infoclean={this.state.infoclean}/>

                <PirChart user={this.state.formData.username}/>
                <ScatterPlot user={this.state.formData.username}/>
                <Chart user={this.state.formData.username}></Chart>


        </div>)
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">GitHub Analytics</h1>
                </header>
                
                <div className="app-container">

                    <Form
                        formData={this.state.formData}
                        handleUserFormSubmit={this.handleUserFormSubmit}
                        handleFormChange={this.handleFormChange}
                    />

                    {this.state.gitun ?
                        this.renderInfo()
                        :
                        <p></p>}
                </div>

            </div>
        );
    }
}
export default App;