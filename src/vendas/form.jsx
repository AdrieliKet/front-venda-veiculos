import React, { useEffect, useState } from "react";
import './Vendas.css';
import axios from "axios";


export default function VendasFunction() {

    const [venda, setVenda] = useState({ nomeCliente: '', cpf: '', descricaoVeiculo: '', valorCompra: '', valorVenda: '', desconto: '', totalVenda: '', comissao: '' });
    const [vendas, setVendas] = useState([]);
    const [atualizar, setAtualizar] = useState({});

    useEffect(() => {
        listarTodos();
    }, [atualizar])


    function handleChange(event) { // função para atualizar variável sempre que o valor for passado no campo
        setVenda({ ...venda, [event.target.name]: event.target.value });
    }

    function handleSubmit(event) { // quando o formulário for submetido
        event.preventDefault();

        if (venda.id == undefined) {
            axios.post("http://localhost:8080/api/vendas/", venda).then(result => {
                console.log(result);
                setAtualizar(result);
            });
        } else {
            axios.put("http://localhost:8080/api/vendas/", venda).then(result => {
                setAtualizar(result);

            });
        }
        limpar();
    }
    function limpar(event) {
        setVenda({ nomeCliente: '', cpf: '', descricaoVeiculo: '', valorCompra: '', valorVenda: '', desconto: '', totalVenda: '', comissao: '' });
    }
    function listarTodos(event) {
        axios.get("http://localhost:8080/api/vendas/").then(result => {
            console.log(result.data);
            setVendas(result.data);
        });
    }

    function excluir(id) {
        axios.delete("http://localhost:8080/api/vendas/" + id).then(result => {
            setAtualizar(id);
        });
    }
    return (

        <div className="formulario">
            <h1> Vendas de Veículos</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="form-label">Nome Cliente</label>
                    <input name="nome" className="form-control" value={vendas.nomeCliente} onChange={handleChange} type="text" /><br /><br />
                </div>
                <div>
                    <label className="form-label">CPF</label>
                    <input name="cpf" className="form-control" value={vendas.cpf} onChange={handleChange} type="number" /><br /><br />
                </div>
                <div>
                    <label className="form-label">Descrição Veículo</label>
                    <input name="descricaoVeiculo" className="form-control" value={vendas.descricaoVeiculo} onChange={handleChange} type="text" /><br /><br />
                </div>
                <div>
                    <label className="form-label">Valor de Compra</label>
                    <input name="valorCompra" className="form-control" value={vendas.valorCompra} onChange={handleChange} type="number" /><br /><br />
                </div>
                <div>
                    <label className="form-label">Valor de Venda</label>
                    <input name="valorVenda" className="form-control" value={vendas.valorVenda} onChange={handleChange} type="number" /><br /><br />
                </div>
                <div>
                    <label className="form-label">Desconto</label>
                    <input name="desconto" className="form-control" value={vendas.desconto} onChange={handleChange} type="number" /><br /><br />
                </div>
                <div>
                    <label className="form-label">Total do Valor da Venda</label>
                    <input name="valorVenda" className="form-control" value={vendas.valorVenda} onChange={handleChange} type="number" /><br /><br />
                </div>
                <div>
                    <label className="form-label">Valor da Comissão</label>
                    <input name="comissao" className="form-control" value={vendas.comissao} onChange={handleChange} type="number" /><br /><br />
                </div>
                <br />

                <input type="submit" className="btn btn-success" value="Cadastrar" /> &nbsp;&nbsp;
                <input type="button" className="btn btn-primary" value="Limpar" onClick={limpar} /> &nbsp;&nbsp; <br /> <hr /> <br />
                <input type="button" className="btn btn-secondary" value="Listar Todos" onClick={listarTodos} /> &nbsp;&nbsp;
                <br /> <br />

            </form>

            <table className="table table-dark" >
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Veículo</th>
                        <th>Resultado</th>
                        <th>Comissão</th>
                    </tr>
                </thead>
                <tbody>
                    {vendas.map(vendas =>
                        <tr key={vendas.id}>
                            <td>{vendas.nomeCliente}</td>
                            <td>{vendas.descricaoVeiculo}</td>
                            <td>{vendas.totalVenda}</td>
                            <td>{vendas.comissao}</td>
                            <td>
                                {vendas.status != 'cancelado' &&
                                    <button onClick={() => setVendas(vendas)} className="btn btn-primary">Alterar</button>
                                } &nbsp;&nbsp;
                                {vendas.status != 'cancelado' &&
                                    <button onClick={() => excluir(vendas.id)} className="btn btn-danger">Excluir</button>
                                }
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>


        </div>
    );

}