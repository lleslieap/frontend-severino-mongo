import React, { Component } from "react"
import axios from "axios"

export default class Comentarios extends Component {

    constructor() {
        super()
        this.state = {
            id_prestador: "",
            id_cliente: "",
            comentario: "",
            dt_comentario: undefined,
            data: null
        }
    }

    setId_prestador(e) {
        this.setState({
            id_prestador: e.target.value
        })
    }

    setId_cliente(e) {
        this.setState({
            id_cliente: e.target.value
        })
    }

    setComentario(e) {
        this.setState({
            comentario: e.target.value
        })
    }

    async getData() {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/comentarios",
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

    inserir() {
        axios.post("http://localhost:3000/api/comentarios", {
            id_prestador: this.state.id_prestador,
            id_cliente: this.state.id_cliente,
            comentario: this.state.comentario,
            dt_comentario: this.state.dt_comentario
        })
            .then(() => alert(`Comentário inserido com sucesso!`))
            .catch((error) => console.log(error))

        window.location.reload()
    }

    alterar() {
        axios.put(`http://localhost:3000/api/comentarios/${this.state.id}`, {
            id_prestador: this.state.id_prestador,
            id_cliente: this.state.id_cliente,
            comentario: this.state.comentario
        })
            .then(() => alert(`Comentário alterado com sucesso!`))
            .catch((error) => console.log(error))
    }

    editar(id, id_prestador, id_cliente, comentario) {
        this.setState({ id, id_prestador, id_cliente, comentario })
    }

    remover(id) {
        axios.delete(`http://localhost:3000/api/comentarios/${id}`)
            .then(() => alert(`Comentário removido com sucesso!`))
            .catch((error) => console.log(error))

        window.location.reload()
    }

    listarComentarios() {
        return (
            this.state.data.map(element => (
                <>
                    <input type="text" style={{ display: "none" }} onChange={() => { }} value={element._id}></input>
                    <tbody>
                        <tr>
                            <td>
                                {element.id_prestador}
                            </td>
                            <td>
                                {element.id_cliente}
                            </td>
                            <td>
                                {element.comentario}
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <button className="btn" onClick={e => this.editar(element._id, element.id_prestador, element.id_cliente, element.comentario)}>
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
                            <label htmlFor="id_prestador" className="col-sm-2 col-form-label">Cód. Prestador</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Cód. do prestador" name="id_prestador" onChange={e => this.setId_prestador(e)} value={this.state.id_prestador} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="id_cliente" className="col-sm-2 col-form-label">Cód. Cliente</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Cód. do cliente" name="id_cliente" onChange={e => this.setId_cliente(e)} value={this.state.id_cliente} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="comentario" className="col-sm-2 col-form-label">Comentário</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Insira o seu comentário" name="comentario" onChange={e => this.setComentario(e)} value={this.state.comentario} />
                            </div>
                        </div>

                        <button className="btn" style={{ color: "#FFFFFF", backgroundColor: "#0B0C2B", width:"120px" }} onClick={e => this.inserir()} > Inserir </button>
                        <button style={{ marginLeft: "2rem", color: "#FFFFFF", backgroundColor: "#0B0C2B", width:"120px" }} className="btn" onClick={e => this.alterar()} > Alterar </button>
                    </form>

                    <hr />

                    <table className="table">
                        <thead className="" style={{ color: "#FFFFFF", background: "#0B0C2B" }}>
                            <tr>
                                <th style={{ textAlign: "center" }}>Cód. Prestador</th>
                                <th style={{ textAlign: "center" }}>Cód. Cliente</th>
                                <th style={{ textAlign: "center" }}>Comentário</th>
                                <th style={{ textAlign: "center" }}>Ações</th>
                            </tr>
                        </thead>
                        {this.listarComentarios()}
                    </table>
                </>
            )
        }
    }
}