import React, { Component } from 'react';
import { db } from './config/firebase.js';

class FirebaseTesting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputVal: '',
            allIzakaya: []
        };
    }

    componentWillMount() {
        var izakayas = [];

        db.collection('izakaya').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                izakayas.push(doc.data().name);
            });
        }).then(() => this.setState({allIzakaya: izakayas}))
    }

    inputOnchange(event){
        this.setState({inputVal: event.target.value})
    }
    
    addIzakaya() {
        db.collection("izakaya").doc(this.state.inputVal).set({
            name: this.state.inputVal
        }).then(() => {
            const a = this.state.allIzakaya
            a.push(this.state.inputVal)

            this.setState({allIzakaya: a, inputVal: ''})
        })
    }

    renderIzakayas() {
        return this.state.allIzakaya.map((i) => {
            return <p>{i}</p>
        })
    }

    render() {
        return (
            <>
                <div>
                    <input onChange={(el) => this.inputOnchange(el)} value={this.state.inputval}/>
                    <button onClick={() => this.addIzakaya()}>add izakaya</button>
                </div>
                <div>
                    {this.renderIzakayas()}
                </div>
            </>
        );
    }
  }
  
export default FirebaseTesting;