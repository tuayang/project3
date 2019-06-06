import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AddFlashCard from './AddFlashCard'
import axios from 'axios'


export default class ProjectForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCards: [],
            projectName: '',
            projectError: '',
            addError: true,
            redirect: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addCardHandler = this.addCardHandler.bind(this)
    }

    addCardHandler(data) {
        // console.log('add card handler ' + data)
        //set parent state to have current flashcards
        this.setState({
            ...this.state,
            currentCards: data
        })

    }

    handleSubmit(event) {
        event.preventDefault()
        //event.stopPropagation()

        const err = this.validate()

        if (err) {
            console.log('error subitting form')
        }

        if (!err) {
            console.log('NO ERROR! PROJECT ADDED!')
            axios.post('/newDocument', {
                projectName: this.state.projectName,
                cards: this.state.currentCards
            })
                .then((response) => {
                    //console.log('response ' + response.data)
                    // console.log('status ' + response.status)
                    //set the state for a redirect
                    this.setState({
                        ...this.state,
                        redirect: true
                    })
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    validate = () => {
        let isError = false;
        const errors = {
            projectError: ''
        }

        if (this.state.projectName.length < 1) {
            isError = true;
            errors.nameError = 'You must enter a topic.'

            this.setState({
                ...this.state,
                addError: true,
                ...errors
                // errors: { ...errors }
            })
        }

        if (this.state.currentCards.length < 1) {
            isError = true;
            errors.projectError = 'No cards have been added yet.'

            this.setState({
                ...this.state,
                addError: true,
                ...errors
                // errors: { ...errors }
            })
        }


        return isError;
    }

    render() {
        let frontError = this.state.nameError
        let cardError = this.state.projectError
        //let cardsAdded = this.state.currentCards.length

        const nameErrorOptions = <div className="errorMessage">{frontError}</div>
        const cardErrorOptions = <div className="errorMessage">{cardError}</div>

        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/review' />
        }


        return (
            <div className="form-header">
            <div className='container'>
                <h1>Topic</h1>
                <form onSubmit={this.handleSubmit}>
                    {nameErrorOptions}
                    {cardErrorOptions}
                    <label>
                        Enter a Topic:
                    <input onChange={this.handleChange} type="text" name="projectName" />
                    </label>
                    <AddFlashCard handler={this.addCardHandler} />
                    <input id="project-submit" className="btn" type="submit" value="Submit" />
                </form>
            </div>
            </div>
        )
    }
}
