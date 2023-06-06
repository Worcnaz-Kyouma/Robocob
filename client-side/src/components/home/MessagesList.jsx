import { useQuery } from "@tanstack/react-query"
import { TableWrapper, StyledTable } from "../styles/Table.styled"
import { StyledLoading } from "../styles/Loading.styled"

export default function MessagesList(){
    const messageQuery = useQuery({
        queryKey: ["message"],
        queryFn: () => {
            return fetch("http://localhost:8000/api/boleto").then(res => res.json())
        }
    })

    return (
        messageQuery.isSuccess 
            ? <>
            <TableWrapper>
            <StyledTable>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th style={{width: '40%'}}>Mensagem</th>
                        <th>Número destino</th>
                        <th>Data/Hora envio</th>
                        <th>Nome do arquivo</th>
                    </tr>
                </thead>
                <tbody>
                        {messageQuery.data.map(message => {
                            return (
                                <tr key={message.id}>
                                    <td>{message.id}</td>
                                    <td>{message.mensagem_adicional}</td>
                                    <td>{message.numero_destino}</td>
                                    <td>{new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric'} ).format(new Date(message.data_envio))}</td>
                                    <td>{message.nome_arquivo}</td>
                                </tr>
                            )
                        })}
                </tbody>
            </StyledTable>
            </TableWrapper>
            </>
            : messageQuery.isLoading
                ? <StyledLoading />
                : <h1>Error</h1>
    )
}