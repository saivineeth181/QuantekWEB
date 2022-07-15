import axios from "axios";
import React, { Component } from 'react'
import '../styles/HomePage.css'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.status = '';
        this.response = {};
    }

    

    handleChange(event) {
    this.setState({value: event.target.value});
    }

    handleSubmit(event) {
    event.preventDefault();
    axios.post("http://127.0.0.1:8000/post",null, {params:{"html_doc":this.state.value}})
    .then(res =>{
        this.setState({status:res.status,response:res.data});
    })
    .catch((err) => alert(err));
    }

    content(data){
        return data.map(
            (res) =>
            <div className="grid-item">
                <div className="tag">
                    <td dangerouslySetInnerHTML={{__html: res.tag}} />
                </div>
                <hr className="hr"/>
                <div className="padding">
                    <p className="bold">Name</p>
                    <p>{res.tag_name}</p>
                    <p className="bold">Occurances</p>
                    <p>{res.count}</p>
                </div>
            </div>
        )
    }

    render() {
        if(this.state.status === 200){
            return (
                <div className="result">
                    <div>
                        <h1>Results</h1>
                    </div>
                    <div className="grid-container">
                        {this.content(this.state.response)}
                    </div>
                </div>
            )
        }
        
        return (
            <div>
                <div>
                    <h1>Find Simlar Nodes</h1>
                </div>

                <div>
                    <p>Paste HTML in textbox below</p>
                </div>

                <div>
                    <form onSubmit={this.handleSubmit}>
                        <textarea className="textarea" type="text" value={this.state.value} onChange={this.handleChange}></textarea>
                        <div className="container">
                            <button className="Button" type='submit' value="Submit">Process Code</button>
                        </div>
                    </form>
                </div>
                <div>
                    {this.state.response}
                    {this.state.status}
                </div>
            </div>
        )
        
  }
}


