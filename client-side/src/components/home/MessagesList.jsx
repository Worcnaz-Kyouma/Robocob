import { useQuery } from "@tanstack/react-query"
import { TableWrapper, StyledTable } from "../styles/Table.styled"
import { StyledError, StyledLoading } from "../styles/Utils.styled"
import { useState } from "react"

export default function MessagesList(){
    const [ messagesPerPage, setMessagesPerPage ] = useState(15)
    const [ page, setPage ] = useState(0)
    const [ maxPage, setMaxPage] = useState(null)

    const messageQuery = useQuery({
        queryKey: ["message"],
        queryFn: () => {
            return fetch("http://localhost:8000/api/boleto").then(res => res.json())
        },
        onSuccess: (data) => {
            setMaxPage(Math.floor(data.length/messagesPerPage))
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
                        {messageQuery.data.slice(page*messagesPerPage, page*messagesPerPage+messagesPerPage).map(message => {
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
            <div>
                <button onClick={() => setPage((prev)=>--prev)} disabled={page==0}>&larr;</button>
                <span>{page} / {maxPage}</span>
                <button onClick={() => setPage((prev)=>++prev)} disabled={page==maxPage}>&rarr;</button>
            </div>
            </TableWrapper>
            </>
            : messageQuery.isLoading
                ? <StyledLoading />
                : <StyledError />
    )
}