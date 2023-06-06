import { useLocation, useNavigate } from "react-router-dom"
import { useQueryClient, useQuery } from "@tanstack/react-query"
import { QRcodeWrapper } from "./styles/Login.styled"
import Header from "./Header"
import {LoadingMessage,  StyledLoading } from "./styles/Loading.styled"
import { useEffect, useRef, useState } from "react"

export default function Login(){
    const navigate = useNavigate()
    const location = useLocation()
    const loadingTimeout = useRef(null);
    const [ loadingMessage, setLoadingMessage ] = useState(null)
    
    useEffect(() => {
        loadingTimeout.current = setTimeout(() => {
            setLoadingMessage(<LoadingMessage>Esta demorando muito? Por favor, recarregue a pagina</LoadingMessage>)
        }, 30000)
    }, []);

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
        refetchInterval: 1000 * 45,
        staleTime: Infinity,
        onSuccess: () => {
            clearTimeout(loadingTimeout.current)
        }
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
        staleTime: Infinity,
        refetchInterval: 1000 * 5
    })

    return (
        <>
        <Header login={true} token={location.state.token} />
        <QRcodeWrapper>
            {(sessionQRCodeQuery.isSuccess)
                ? <img src={URL.createObjectURL(sessionQRCodeQuery.data)} onError={() => navigate(0)} />

                : <StyledLoading />
            }
        </QRcodeWrapper>
        {loadingMessage}
        </>
    )

    
}