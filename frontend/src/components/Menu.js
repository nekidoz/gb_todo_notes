import React from 'react'
import {Link} from 'react-router-dom'

function MenuItem({name, href}) {
    // <a className="nav-link" href={href}>{name}</a> - так было до cliend-side routing
    return (
        <li className="nav-item active">
            <Link className="nav-link" to={href}>{name}</Link>
        </li>
    )
}

export default function Menu({menuItems, app}) {
    // app - объект приложения, нужен для передачи статуса - залогинен ли и прочего
    // <nav> - навигация <BrowserRouter>
    return (
        <nav className="navbar navbar-expand-md navbar-dark sticky-top bg-dark">
            <a className="navbar-brand" href="#">{app.state.username}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                    {menuItems.map((item) => <MenuItem name={item.name} href={item.href} />)}
                    <li className="nav-item active">
                        {app.is_authenticated() ?
                            <button onClick={() => app.logout()}>Logout</button> :
                            <Link className="nav-link" to='/login'>Login</Link>}
                    </li>
                </ul>
                <form className="form-inline mt-2 mt-md-0">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}

