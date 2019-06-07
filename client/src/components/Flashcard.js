import React, { Component } from 'react'
import axios from 'axios'



export default class Flashcard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDoc: [],
            cards: [],
            counter: 0,
            showAnswer: false,
            id: ''
        }


    }

    componentWillMount() {
        //create a post request to get data from mongo
        console.log('component did mount')
        axios.post('/displayCard', {
            id: this.props.id
        })
            .then((response) => {
                // console.log(response.data.cards);
                this.setState({
                    currentDoc: response.data,
                    cards: response.data.cards
                })
            })
            .catch(function (error) {
                console.log(error);
            })


        //console.log('component did mount')
    }


    componentWillReceiveProps(nextProps) {
        //console.log('component recieve props')
        //changes state of component when props update
        this.setState({ id: nextProps.id });

    }

    componentDidUpdate() {
        // console.log('update')

        /*------BUG---------*/
        /*WHEN ANOTHER STUDY BUTTON IS CLICKED, THE STATE AND PROPS UPDATE IN THIS COMPONENT,
        BUT THE POST REQUEST IS NOT RESENT.  I WILL LOOK INTO NEW LIFECYCLE METHODS*/
    }

    answerClick = () => {
        //console.log('answer click triggered')
        this.setState({
            showAnswer: true
        })
    }

    nextClick = () => {
        //console.log('next click clicked')
        this.setState({
            counter: this.state.counter + 1,
            showAnswer: false
        })
    }

    startOver = () => {
        console.log('Start Over Again')
        this.setState({
            counter: 0,
            showAnswer: false
        })
    }

    render() {
        // const flashcard = this.state.currentDoc;
        // let cards = this.state.cards
        let counter = this.state.counter
        let nextButton;
        let startOverButton;
        let startOverDiv;
        let cardDivFront;
        let cardDivBack;
        let cardDivBackButton;
        if (counter < this.state.cards.length) {
            cardDivFront = <div>{this.state.cards[counter].front}</div>
            // cardDivBack = <div>{this.state.cards[counter].back}</div>
            cardDivBackButton = <button onClick={this.answerClick} className="waves-effect waves-light btn">Show Answer</button>
            nextButton = <button onClick={this.nextClick} className="waves-effect waves-light btn red">Skip</button>
            


            if (this.state.showAnswer) {
                cardDivBackButton = <div>{this.state.cards[counter].back}</div>
                nextButton = <button onClick={this.nextClick} className="waves-effect waves-light btn">Next Card</button>
            }
        }

        if (counter === this.state.cards.length) {
            startOverDiv = <h2 id="cards-flash">No more Cards!</h2>
            startOverButton = <button onClick={this.startOver} className="waves-effect waves-light btn">Start Over</button>
        }


        return (

            
            <div >

                <h6>Card {this.state.counter + 1}</h6>
                <div className="flashcardDisplay row">
                    <div className="flashcardFront col s12 m6 black">
                        {startOverDiv}
                        {startOverButton}
                        <h2 id="cards-flash">{cardDivFront}</h2>
                    </div>
                    <div className="flashcardBack col s12 m6 white">
                        <h2 id="cards-flash">{cardDivBackButton}</h2>
                    </div>
                    {nextButton}
                </div>
            </div>
        )
    }
}
