import { useQuery } from "@tanstack/react-query"

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
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Mensagem</th>
                    <th>Número destino</th>
                    <th>Data/Hora envio</th>
                    <th>Nome do arquivo enviado</th>
                </tr>
            </thead>
            <tbody>
                {messageQuery.data.map(message => {
                    return (
                        <tr key={message.id}>
                            <td>{message.id}</td>
                            <td>{message.mensagem_adicional}</td>
                            <td>{message.numero_destino}</td>
                            <td>{message.data_envio}</td>
                            <td>{message.nome_arquivo}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}