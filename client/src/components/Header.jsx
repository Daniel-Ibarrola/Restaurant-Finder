import React from 'react'

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Restaurant Finder</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/"><i className="fas fa-home"></i> Home</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
