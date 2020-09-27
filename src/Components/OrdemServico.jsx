import React, { Component } from "react"
import axios from "axios"

export default class OrdemServico extends Component {

    constructor() {
        super()
        this.state = {
            id: "",
            id_agenda: "",
            status_os: 0,
            valor_mo: "",
            valor_total: "",
            descricao_manutencao: "",
            dt_abertura: undefined,
            data: null
        }
    }

    setId_agenda(e) {
        this.setState({
            id_agenda: e.target.value
        })
    }

    setStatus_os(e) {
        this.setState({
            status_os: e.target.value
        })
    }

    setValor_mo(e) {
        this.setState({
            valor_mo: e.target.value
        })
    }

    setValor_total(e) {
        this.setState({
            valor_total: e.target.value
        })
    }

    setDescricao_manutencao(e) {
        this.setState({
            descricao_manutencao: e.target.value
        })
    }

    async getData() {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/os",
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
        axios.post("http://localhost:3000/api/os", {
            id_agenda: this.state.id_agenda,
            status_os: this.state.status_os,
            valor_mo: this.state.valor_mo,
            valor_total: this.state.valor_total,
            descricao_manutencao: this.state.descricao_manutencao,
            dt_abertura: this.state.dt_abertura
        })
            .then(() => alert(`Ordem de serviço cadastrada com sucesso!`))
            .catch((error) => console.log(error))

            console.log(this.setState)
        window.location.reload()
    }

    alterar() {
        axios.put(`http://localhost:3000/api/os/${this.state.id}`, {
            id_agenda: this.state.id_agenda,
            status_os: this.state.status_os,
            valor_mo: this.state.valor_mo,
            valor_total: this.state.valor_total,
            descricao_manutencao: this.state.descricao_manutencao
        })
            .then(() => alert(`Ordem de serviço alterada com sucesso!`))
            .catch((error) => console.log(error))
    }

    editar(id, id_agenda, status_os, valor_mo, valor_total, descricao_manutencao) {
        this.setState({ id, id_agenda, status_os, valor_mo, valor_total, descricao_manutencao })
    }

    remover(id) {
        axios.delete(`http://localhost:3000/api/os/${id}`)
            .then(() => alert(`Ordem de serviço removida com sucesso!`))
            .catch((error) => console.log(error))

        window.location.reload()
    }

    listarOrdemServico() {
        return (
            this.state.data.map(element => (
                <>
                    <input type="text" style={{ display: "none" }} onChange={() => { }} value={element._id}></input>
                    <tbody>
                        <tr>
                            <td>
                                {element.id_agenda}
                            </td>
                            <td>
                                {element.status_os}
                            </td>
                            <td>
                                {element.valor_mo}
                            </td>
                            <td>
                                {element.valor_total}
                            </td>
                            <td>
                                {element.descricao_manutencao}
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <button className="btn" onClick={e => this.editar(element._id, element.id_agenda, element.status_os, element.valor_mo, element.valor_total, element.descricao_manutencao)}>
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
                            <label htmlFor="id_agenda" className="col-sm-2 col-form-label">N.º agendamento</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Informe o n.º do agendamento" name="id_agenda" onChange={e => this.setId_agenda(e)} value={this.state.id_agenda} />
                            </div>
                        </div>

                        <div className="form-group row">
                        <label htmlFor="status_os" className="col-sm-2 col-form-label">Status</label>
                            <div className="col-sm-10">
                                <select className="custom-select" onChange={e => this.setStatus_os(e)}>
                                    <option value={0}>Situação ordem de serviço</option>
                                    <option value={1}>Orçamento</option>
                                    <option value={2}>Em andamento</option>
                                    <option value={3}>Aguardando pagamento</option>
                                    <option value={4}>Finalizada</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="valor_mo" className="col-sm-2 col-form-label">Valor M.O.</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Valor da mão de obra" name="valor_mo" onChange={e => this.setValor_mo(e)} value={this.state.valor_mo} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="valor_total" className="col-sm-2 col-form-label">Valor Total</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Valor total" name="valor_total" onChange={e => this.setValor_total(e)} value={this.state.valor_total} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="descricao_manutencao" className="col-sm-2 col-form-label">Descrição</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Descrição da manutenção realizada" name="descricao_manutencao" onChange={e => this.setDescricao_manutencao(e)} value={this.state.descricao_manutencao} />
                            </div>
                        </div>

                        <button className="btn" style={{ color: "#FFFFFF", backgroundColor: "#0B0C2B", width: "120px" }} onClick={e => this.cadastrar()} > Cadastrar </button>
                        <button style={{ marginLeft: "2rem", color: "#FFFFFF", backgroundColor: "#0B0C2B", width: "120px" }} className="btn" onClick={e => this.alterar()} > Alterar </button>
                    </form>

                    <hr />

                    <table className="table">
                        <thead className="" style={{ color: "#FFFFFF", background: "#0B0C2B" }}>
                            <tr>
                                <th style={{ textAlign: "center" }}>N.º agendto.</th>
                                <th style={{ textAlign: "center" }}>Status O.S.</th>
                                <th style={{ textAlign: "center" }}>Valor M.O.</th>
                                <th style={{ textAlign: "center" }}>Valor Total</th>
                                <th style={{ textAlign: "center" }}>Descrição</th>
                                <th style={{ textAlign: "center" }}>Ações</th>
                            </tr>
                        </thead>
                        {this.listarOrdemServico()}
                    </table>
                </>
            )
        }
    }
}