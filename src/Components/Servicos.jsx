import React, { Component } from "react"
import axios from "axios"

export default class Servicos extends Component {

    constructor() {
        super()
        this.state = {
            id: "",
            nm_servico: "",
            obs: "",
            data: null
        }
    }

    setNm_Servico(e) {
        this.setState({
            nm_servico: e.target.value
        })
    }

    setObs(e) {
        this.setState({
            obs: e.target.value
        })
    }

    async getData() {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/servicos",
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
        axios.post("http://localhost:3000/api/servicos", {
            nm_servico: this.state.nm_servico,
            obs: this.state.obs
        })
            .then(() => alert(`Serviço ${this.state.nm_servico} cadastrado com sucesso!`))
            .catch((error) => console.log(error))

        window.location.reload()
    }

    alterar() {
        axios.put(`http://localhost:3000/api/servicos/${this.state.id}`, {
            nm_servico: this.state.nm_servico,
            obs: this.state.obs
        })
            .then(() => alert(`Serviço alterado com sucesso!`))
            .catch((error) => console.log(error))
    }

    editar(id, nm_servico, obs) {
        this.setState({ id, nm_servico, obs })
    }

    remover(id) {
        axios.delete(`http://localhost:3000/api/servicos/${id}`)
            .then(() => alert(`Serviço removido com sucesso!`))
            .catch((error) => console.log(error))

        window.location.reload()
    }

    listarServicos() {
        return (
            this.state.data.map(element => (
                <>
                    <input type="text" style={{ display: "none" }} onChange={() => { }} value={element._id}></input>
                    <tbody>
                        <tr>
                            <td>
                                {element.nm_servico}
                            </td>
                            <td>
                                {element.obs}
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <button className="btn" onClick={e => this.editar(element._id, element.nm_servico, element.obs)}>
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
                            <label htmlFor="nm_servico" className="col-sm-2 col-form-label">Serviço</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Nome do serviço" name="nm_servico" onChange={e => this.setNm_Servico(e)} value={this.state.nm_servico} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="ds_servico" className="col-sm-2 col-form-label">Descrição</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Descrição do serviço" name="ds_servico" onChange={e => this.setObs(e)} value={this.state.obs} />
                            </div>
                        </div>

                        <button className="btn" style={{ color: "#FFFFFF", backgroundColor: "#0B0C2B", width:"120px" }} onClick={e => this.cadastrar()} > Cadastrar </button>
                        <button style={{ marginLeft: "2rem", color: "#FFFFFF", backgroundColor: "#0B0C2B", width:"120px" }} className="btn" onClick={e => this.alterar()} > Alterar </button>
                    </form>

                    <hr />

                    <table className="table">
                        <thead className="" style={{ color: "#FFFFFF", background: "#0B0C2B" }}>
                            <tr>
                                <th style={{ textAlign: "center" }}>Serviço</th>
                                <th style={{ textAlign: "center" }}>Descrição</th>
                                <th style={{ textAlign: "center" }}>Ações</th>
                            </tr>
                        </thead>
                        {this.listarServicos()}
                    </table>
                </>
            )
        }
    }
}