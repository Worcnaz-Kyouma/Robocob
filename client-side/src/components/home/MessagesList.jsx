export default function MessagesList(){
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
                <tr>
                    <td>-1</td>
                    <td>Sugoma</td>
                    <td>5599813748</td>
                    <td>{new Date().toISOString()}</td>
                    <td>sugoma.pdf</td>
                </tr>
            </tbody>
        </table>
    )
}