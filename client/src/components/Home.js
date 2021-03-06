import React, { Component } from 'react'
//import { Button } from 'react-materialize'
import { withRouter } from 'react-router-dom'




export default class Home extends Component {

    render() {
        const Button1 = withRouter(({ history }) => (
            <button
                type='button'
                className='button btn-large orange'
                waves='light'
                onClick={() => { history.push('/review') }}
            >
                Review
            </button>
        ))

        const Button2 = withRouter(({ history }) => (
            <button
                type='button'
                className='button btn-large'
                waves='light'
                onClick={() => { history.push('/addproject') }}
            >
                Create New
            </button>
        ))



        return (
            <div className='App-header'>
        
                <div className="header-container">
                    <h2 id="header-text2">Get Studyin'</h2>
                </div>
                <div className="button-container">
                    <Button1 />
                    <Button2 />
                </div>
            </div>
        )
    }
}
