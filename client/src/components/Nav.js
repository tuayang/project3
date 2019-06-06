import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import M from 'materialize-css'

export default class Nav extends Component {
    componentDidMount() {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
    }

    render() {
        return (
            <div>
                <nav className='purple'>
                    <div className="nav-wrapper">
                        <a className="logo">FlashC</a>
                        <ul id="nav-mobile" className="right ">

                            <li className="hide-on-med-and-down"><Link to="/">Home</Link></li>
                            <li className="hide-on-med-and-down"><Link to="/addproject">Create New</Link></li>
                            <li className="hide-on-med-and-down"><Link to="/projects">Review</Link></li>
                            <li className="hide-on-med-and-down"><Link to="/">Sign Up</Link></li>
                            <li className="hide-on-med-and-down"><Link to="/">Login</Link></li>

                            <a className='dropdown-trigger hide-on-large-only' href='#' data-target='dropdown1'><i className='material-icons'>dehaze</i></a>
                        </ul>

                        <ul id='dropdown1' className='dropdown-content'>
                            <li className=""><Link to="/">Home</Link></li>
                            <li className=""><Link to="/addproject">Create</Link></li>
                            <li className=""><Link to="/projects">Review</Link></li>
                        </ul>

                    </div>
                </nav>
            </div>
        )
    }
}
