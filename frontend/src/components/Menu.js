import React from 'react'
import UserList from "./User"

function MenuItem({name, href}) {
    return (
        <li className="nav-item active">
            <a className="nav-link" href={href}>{name}</a>
        </li>
    )
}

export default function Menu({menuItems}) {
    return (
        <nav className="navbar navbar-expand-md navbar-dark sticky-top bg-dark">
            <a className="navbar-brand" href="#">Nekidoz</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                    {menuItems.map((item) => <MenuItem name={item.name} href={item.href} />)}
                </ul>
                <form className="form-inline mt-2 mt-md-0">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}

