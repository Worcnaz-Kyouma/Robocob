import { useQuery } from '@tanstack/react-query'
import { useNavigate, Outlet } from 'react-router-dom'

export default function Root(){
    const navigate = useNavigate()

    const tokenQuery = useQuery({
        queryKey: ['token'],
        queryFn: () => {
            return fetch('http://localhost:21465/api/robocob/ELPSYKONGROO/generate-token', {
                method: "POST"
            }).then((res) => res.json())
        },
        staleTime: 1000 * 60 * 5
    })
    const sessionStatusQuery = useQuery({
        queryKey: ['session', 'status'],
        queryFn: () => {
            return fetch("http://localhost:21465/api/robocob/status-session", {
                headers: {
                    'Authorization': 'Bearer ' + tokenQuery.data.token
                }
            }).then((res) => res.json())
        },
        enabled: tokenQuery.isSuccess,
        refetchInterval: 1000,
        onSuccess: (data) =>{
            setTimeout(()=>{
                if(data.status!="CONNECTED"){
                    navigate('/login', {
                        state: {
                            token: tokenQuery.data.token
                        }
                    })
                }
                else{
                    navigate('/home', {
                        state: {
                            token: tokenQuery.data.token
                        }
                    })
                }
            }, 5000)
            
        }
    })

    return <><Outlet /></>
}