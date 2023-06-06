import { useOutletContext } from "react-router-dom"
import { useQueryClient, useQuery } from "@tanstack/react-query"
import { QRcodeWrapper } from "./styles/Login.styled"
import Header from "./Header"
import { StyledError, StyledLoading } from "./styles/Utils.styled"
import { useState } from "react"

export default function Login(){
    const queryClient = useQueryClient()
    const [ token ] = useOutletContext()
    const [ reloadCooldown, setCooldown ] = useState(null)

    const sessionStartQuery = useQuery({
        queryKey: ['session', 'start'],
        queryFn: () => {
            setCooldown(setTimeout(()=>{
                sessionStartQuery.refetch();
            }, 20000))
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
        refetchOnWindowFocus: false,
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
            }).then(res => {
                if(res.headers.get('Content-Type') == 'application/json; charset=utf-8'){
                    return res.json()
                }
                return res.blob()
            })
        },
        enabled: sessionStartQuery.isSuccess,
        refetchInterval: 1000 * 1
    })

    return (
        <>
        <Header login={true} token={token} />
        <QRcodeWrapper>
            {sessionQRCodeQuery.isSuccess && !sessionQRCodeQuery.data?.message
                ? <img src={URL.createObjectURL(sessionQRCodeQuery.data)} alt="" />

                : sessionQRCodeQuery.isLoading || sessionQRCodeQuery.data?.message
                    ? <StyledLoading />
                    : <StyledError />

            }
        </QRcodeWrapper>
        </>
    )

    
}