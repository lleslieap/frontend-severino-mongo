import React, { Component } from "react"
import logo from "../img/logo.png"

export default class Menu extends Component {
    render() {
        return (
            <>
                <nav className="navbar navbar-inverse" style={{ backgroundColor: "#0B0C2B", padding: "0px" }}>

                    <div className="nav navbar">
                        <a className="nav-bar-brand" href="/servicos">
                            <i className="fa fa-calendar-check-o"></i>
                            <img src={logo} width="70" height="70" alt="" />
                        </a>


                        <li><a style={{ marginLeft: "20px", marginRight: "20px", color: "#FFFFFF" }} href="/servicos">Serviços</a></li>
                        <li><a style={{ marginRight: "20px", color: "#FFFFFF" }} href="/produtos">Produtos</a></li>
                        <li><a style={{ marginRight: "20px", color: "#FFFFFF" }} href="/os">O.S.</a></li>
                        <li><a style={{ marginRight: "20px", color: "#FFFFFF" }} href="/enderecos">Endereços</a></li>
                        <li><a style={{ marginRight: "20px", color: "#FFFFFF" }} href="/comentarios">Comentários</a></li>

                    </div>
                </nav>
                <br />
            </>
        )
    }
}