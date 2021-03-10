import React from 'react';
import './styles/Footer.css'

function Footer() {
    return (
        <div className='footer mt-5 bg-dark'>
            <div className="container">
                <div className="row">
                    <div className='col link-list'>
                        <h5>Links</h5>
                        <ul className='list-unstyled'>
                            <li><a href='/'>Home</a></li>
                            <li><a href='/'>About</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <div className='footer-icon'>             
                                <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
                                <a href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                                <a href="https://facebook.com/"><i className="fab fa-facebook-square"></i></a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className='bottom'>
                            <p>© Copyright 2021 Restaurant Finder</p>    
                        </div>
                        
                    </div>
                </div>
            </div>
    </div>
    )
}

export default Footer
