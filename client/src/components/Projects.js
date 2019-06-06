import React, { Component } from 'react'
import axios from 'axios'
import { Modal, Button } from 'react-materialize'
import Flashcard from './Flashcard'



export default class Projects extends Component {
    constructor() {
        super();
        this.state = {
            projectResults: [],
            currentID: '',
            showCase: false
        }

        this.componentDidMount = this.componentDidMount.bind(this)
        this.onDeleteClick = this.onDeleteClick.bind(this)
        this.studyClick = this.studyClick.bind(this)
    }

    componentDidMount() {
        
        axios.get('/projects')
            .then((response) => {
                //console.log(response.data)
                let results = response.data
                //console.log('project results ' + JSON.stringify(results))
                //set state to database results
                this.setState({
                    projectResults: results
                })
            })
            .catch(function (error) {
                console.log(error)
            })

    }

    onDeleteClick(id) {
        // console.log('id ' + id)
        console.log('project delete in process')

        axios.delete('/delete/' + id)
            .then((response) => {
                //reset state
                let newProjectResults = this.state.projectResults
                    .filter(project => project._id !== id)

                this.setState({
                    projectResults: newProjectResults
                })
                //console.log(response)
            })
            .catch(err => console.log(err))
    }

    studyClick(id) {
        console.log('review button clicked ' + id)
        this.setState({
            ...this.state,
            currentID: id,
            showCase: true
        })

    }
    
    render() {

        const trigger = <Button>Review</Button>;

        let card;
         if (this.state.showCase) {
            card = <Flashcard id={this.state.currentID}/>


        }
        
        //use a map function to render DOM elements from db/state
        var projectList = this.state.projectResults.map((project) => {

            return (
                <div className='projectDiv valign-wrapper' key={project._id}>
                    <Button className="project-delete right red" onClick={this.onDeleteClick.bind(this, project._id)}><i className="material-icons">clear</i></Button>
                    <div className="projectListTitle">{project.projectName}</div>
                    
                    
                    <Modal header={project.projectName} trigger={trigger}>
                    <Button onClick={this.studyClick.bind(this, project._id)} className='study-button'>Start</Button>
                    <div className='container center-align '>{card}</div>
                    </Modal>
                    

                    
                </div>
            )
        })
        
        
       


        return (
            <div className='topic-header'>
            <div className='container center-align '>
                
                <h1>Select a Topic</h1>
                <hr></hr>
                {projectList}
            </div>
            </div>
        )
    }
}
