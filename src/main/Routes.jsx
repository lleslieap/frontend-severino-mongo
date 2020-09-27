import React from "react"
import {Router, Route, Redirect, Switch} from "react-router-dom"

import Servicos from "../Components/Servicos"
import Produtos from "../Components/Produtos"
import OrdemServico from "../Components/OrdemServico"
import Enderecos from "../Components/Enderecos"
import Comentarios from "../Components/Comentarios"

import {createBrowserHistory} from "history"

const history = createBrowserHistory()

export default () => (
    <Router history={history}>
        <Switch>
            <Route path="/servicos" component={Servicos}></Route>
            <Route path="/produtos" component={Produtos}></Route>
            <Route path="/os" component={OrdemServico}></Route>
            <Route path="/enderecos" component={Enderecos}></Route>
            <Route path="/comentarios" component={Comentarios}></Route>
            <Redirect from="*" to="/servicos"></Redirect>
        </Switch>
    </Router>
)