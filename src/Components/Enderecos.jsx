import React, { Component } from "react"
import axios from "axios"

export default class Enderecos extends Component {

    constructor() {
        super()
        this.state = {
            id_cliente: "",
            rua: "",
            nCasa: "",
            bairro: "",
            cep: "",
            cidade: "",
            uf: "",
            complemento: "",
            data: null
        }
    }

    setId_Cliente(e) {
        this.setState({
            id_cliente: e.target.value
        })
    }

    setRua(e) {
        this.setState({
            rua: e.target.value
        })
    }

    setNCasa(e){
        this.setState({
            nCasa: e.target.value
        })
    }

    setBairro(e){
        this.setState({
            bairro: e.target.value
        })
    }

    setCep(e){
        this.setState({
            cep: e.target.value
        })
    }

    setCidade(e){
        this.setState({
            cidade: e.target.value
        })
    }

    setUf(e){
        this.setState({
            uf: e.target.value
        })
    }

    setComplemento(e){
        this.setState({
            complemento: e.target.value
        })
    }

    async getData() {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/enderecos",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                })

            return response
        }
        catch (error) {
            console.log(error);
        }
    }

    async componentDidMount() {
        const response = await this.getData()
        const data = response.data
        this.setState({ data: data })
    }

    cadastrar() {
        axios.post("http://localhost:3000/api/enderecos", {
            id_cliente: this.state.id_cliente,
            rua: this.state.rua,
            nCasa: this.state.nCasa,
            bairro: this.state.bairro,
            cep: this.state.cep,
            cidade: this.state.cidade,
            uf: this.state.uf,
            complemento: this.state.complemento
        })
            .then(() => alert(`Endereço cadastrado com sucesso!`))
            .catch((error) => console.log(error))

        window.location.reload()
    }

    alterar() {
        axios.put(`http://localhost:3000/api/enderecos/${this.state.id}`, {
            id_cliente: this.state.id_cliente,
            rua: this.state.rua,
            nCasa: this.state.nCasa,
            bairro: this.state.bairro,
            cep: this.state.cep,
            cidade: this.state.cidade,
            uf: this.state.uf,
            complemento: this.state.complemento
        })
            .then(() => alert(`Endereço alterado com sucesso!`))
            .catch((error) => console.log(error))
    }

    editar(id, id_cliente, rua, nCasa, bairro, cep, cidade, uf, complemento) {
        this.setState({ id, id_cliente, rua, nCasa, bairro, cep, cidade, uf, complemento })
    }

    remover(id) {
        axios.delete(`http://localhost:3000/api/enderecos/${id}`)
            .then(() => alert(`Endereço removido com sucesso!`))
            .catch((error) => console.log(error))

        window.location.reload()
    }

    listarEnderecos() {
        return (
            this.state.data.map(element => (
                <>
                    <input type="text" style={{ display: "none" }} onChange={() => { }} value={element._id}></input>
                    <tbody>
                        <tr>
                            <td>
                                {element.id_cliente}
                            </td>
                            <td>
                                {element.rua}, n.º {element.nCasa}
                            </td>
                            <td>
                                {element.bairro}
                            </td>
                            <td>
                                {element.cep}
                            </td>
                            <td>
                                {element.cidade}/{element.uf}
                            </td>
                            <td>
                                {element.complemento}
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <button className="btn" onClick={e => this.editar(element._id, element.id_cliente, element.rua, element.nCasa, element.bairro, element.cep, element.cidade, element.uf, element.complemento)}>
                                    <svg width="20px" height="20px" style={{ color: "#008B8B" }} viewBox="0 0 16 16" className="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                </button>

                                <button className="btn" onClick={e => this.remover(element._id)}>
                                    <svg width="20px" height="20px" style={{ color: "#DF0101" }} viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </>
            ))
        )
    }

    render() {
        if (this.state.data == null)
            return <p>Carregando...</p>
        else {
            return (
                <>
                    <form>
                        <div className="form-group row">
                            <label htmlFor="id_cliente" className="col-sm-2 col-form-label">Cód.</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Cód. do cliente" name="id_cliente" onChange={e => this.setId_Cliente(e)} value={this.state.id_cliente} />
                            </div>
                        </div>
                        
                        <div className="form-group row">
                            <label htmlFor="rua" className="col-sm-2 col-form-label">Rua</label>
                            <div className="col-sm-7">
                                <input type="text" className="form-control" placeholder="Rua" name="rua" onChange={e => this.setRua(e)} value={this.state.rua} />
                            </div>

                            <label htmlFor="nCasa" className="col-sm-1 col-form-label" style={{textAlign:"right"}}>N.º</label>
                            <div className="col-sm-2">
                                <input type="text" className="form-control" name="nCasa" onChange={e => this.setNCasa(e)} value={this.state.nCasa} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="bairro" className="col-sm-2 col-form-label">Bairro</label>
                            <div className="col-sm-7">
                                <input type="text" className="form-control" name="bairro" onChange={e => this.setBairro(e)} value={this.state.bairro} />
                            </div>

                            <label htmlFor="cep" className="col-sm-1 col-form-label" style={{textAlign:"right"}}>CEP</label>
                            <div className="col-sm-2">
                                <input type="text" className="form-control" name="cep" onChange={e => this.setCep(e)} value={this.state.cep} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="cidade" className="col-sm-2 col-form-label">Cidade</label>
                            <div className="col-sm-7">
                                <input type="text" className="form-control" name="cidade" onChange={e => this.setCidade(e)} value={this.state.cidade} />
                            </div>

                            <label htmlFor="uf" className="col-sm-1 col-form-label" style={{textAlign:"right"}}>UF</label>
                            <div className="col-sm-2">
                                <input type="text" className="form-control" name="uf" onChange={e => this.setUf(e)} value={this.state.uf} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="complemento" className="col-sm-2 col-form-label">Complemento</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Ex.: Bloco A, apto. 202" name="complemento" onChange={e => this.setComplemento(e)} value={this.state.complemento} />
                            </div>
                        </div>

                        <button className="btn" style={{ color: "#FFFFFF", backgroundColor: "#0B0C2B", width:"120px" }} onClick={e => this.cadastrar()} > Cadastrar </button>
                        <button style={{ marginLeft: "2rem", color: "#FFFFFF", backgroundColor: "#0B0C2B", width:"120px" }} className="btn" onClick={e => this.alterar()} > Alterar </button>
                    </form>

                    <hr />

                    <table className="table">
                        <thead className="" style={{ color: "#FFFFFF", background: "#0B0C2B" }}>
                            <tr>
                                <th style={{ textAlign: "center" }}>N.º cliente</th>
                                <th style={{ textAlign: "center" }}>Endereço</th>
                                <th style={{ textAlign: "center" }}>Bairro</th>
                                <th style={{ textAlign: "center" }}>CEP</th>
                                <th style={{ textAlign: "center" }}>Cidade/UF</th>
                                <th style={{ textAlign: "center" }}>Complemento</th>
                                <th style={{ textAlign: "center" }}>Ações</th>
                            </tr>
                        </thead>
                        {this.listarEnderecos()}
                    </table>
                </>
            )
        }
    }
}