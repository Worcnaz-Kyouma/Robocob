import { useQuery } from "@tanstack/react-query"
import { TableWrapper, StyledTable } from "../styles/Table.styled"

export default function MessagesList(){
    const messageQuery = useQuery({
        queryKey: ["message"],
        queryFn: () => {
            return fetch("http://localhost:8000/api/boleto").then(res => res.json())
        }
    })

    if (messageQuery.isLoading) return <h1>Loading!</h1>
    if (messageQuery.isError) return <h1>Error :c</h1>

    return (
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
    )
}