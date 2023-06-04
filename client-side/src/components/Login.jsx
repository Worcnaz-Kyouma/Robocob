import { useLocation } from "react-router-dom"
import { useQueryClient, useQuery } from "@tanstack/react-query"

export default function Login(){
    const location = useLocation()

    const sessionStartQuery = useQuery({
        queryKey: ['session', 'start'],
        queryFn: () => {
            return fetch('http://localhost:21465/api/robocob/start-session', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + location.state.token
                },
                body: JSON.stringify({
                    webhook: null,
                    waitQrCode: true
                })
            }).then(res => res.json())
        },
        refetchInterval: 1000 * 40,
    })

    const sessionQRCodeQuery = useQuery({
        queryKey: ['session', 'qrcode'],
        queryFn: () => {
            return fetch('http://localhost:21465/api/robocob/qrcode-session', {
                headers: {
                    'Authorization': 'Bearer ' + location.state.token
                }
            }).then(res => res.blob())
        },
        enabled: sessionStartQuery.isSuccess,
        refetchInterval: 1000 * 1
    })

    if (sessionQRCodeQuery.isSuccess) return (
        <img src={URL.createObjectURL(sessionQRCodeQuery.data)} alt="QRCode" />)
    else return <h1>Loading</h1>

    
}