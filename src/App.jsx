import React, {Component} from "react"

import Routes from "./main/Routes"
import Menu from "./Components/Menu"
import "bootstrap/dist/css/bootstrap.css"

export default class App extends Component{
    render(){
        return(
            <>
                <div className="container">
                    <Menu/>
                    <Routes/>
                </div>
            </>
        )
    }
}