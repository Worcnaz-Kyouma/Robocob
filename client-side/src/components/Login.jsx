import { useOutletContext } from "react-router-dom"
import { useQueryClient, useQuery } from "@tanstack/react-query"
import { QRcodeWrapper } from "./styles/Login.styled"
import Header from "./Header"
import { StyledLoading } from "./styles/Loading.styled"
import { useEffect, useState } from "react"

export default function Login(){
    const queryClient = useQueryClient()
    const [ token ] = useOutletContext()
    const [ reloadCooldown, setCooldown ] = useState(null)

    const sessionStartQuery = useQuery({
        queryKey: ['session', 'start'],
        queryFn: () => {
            setCooldown(setTimeout(()=>sessionStartQuery.refetch(), 20000))
            return fetch('http://localhost:21465/api/robocob/start-session', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    webhook: null,
                    waitQrCode: true
                })
            }).then(res => res.json())
        },
        enabled: queryClient.getQueryData(['token'])!=null,
        refetchInterval: 1000 * 40,
        cacheTime: Infinity,
        onSuccess: () => {
            clearTimeout(reloadCooldown)
        }
    })

    const sessionQRCodeQuery = useQuery({
        queryKey: ['session', 'qrcode'],
        queryFn: () => {
            return fetch('http://localhost:21465/api/robocob/qrcode-session', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(res => res.blob())
        },
        enabled: sessionStartQuery.isSuccess && !sessionStartQuery.isFetching,
        refetchInterval: 1000 * 1,
        cacheTime: Infinity
    })

    return (
        <>
        <Header login={true} token={token} />
        <QRcodeWrapper>
            {sessionQRCodeQuery.isSuccess
                ? <img src={URL.createObjectURL(sessionQRCodeQuery.data)} alt="" />

                : sessionQRCodeQuery.isLoading
                    ? <StyledLoading />
                    : <h1>Error</h1>

            }
        </QRcodeWrapper>
        </>
    )

    
}