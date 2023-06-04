import { useLocation } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

export default function Login(){
    const queryClient = useQueryClient()
    const location = useLocation()
    
    //console.log(location.state?.token)

    queryClient.refetchQueries({
        queryKey: ['session', 'status'],
        type: "inactive",
        exact: true
    })

    return (
        <h1>Login with QR</h1>
    )
}