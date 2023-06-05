import { useQuery } from '@tanstack/react-query'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import GlobalStyles from './styles/Global'
import { ThemeProvider } from 'styled-components'

export default function Root(){
    const navigate = useNavigate()
    const location = useLocation()
    let loginPageDelay = null;

    const tokenQuery = useQuery({
        queryKey: ['token'],
        queryFn: () => {
            return fetch('http://localhost:21465/api/robocob/ELPSYKONGROO/generate-token', {
                method: "POST"
            }).then(res => res.json())
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
            }).then(res => res.json())
        },
        enabled: tokenQuery.isSuccess,
        refetchInterval: 1000,
        onSuccess: (data) =>{
            if(data.status!="CONNECTED"){
                navigate('/login', {
                    state: {
                        token: tokenQuery.data.token
                    }
                })
            }
            else{
                (!location.pathname.includes('/home')) &&
                navigate('/home', {
                    state: {
                        token: tokenQuery.data.token
                    }
                })
            } 
        }
    })

    const theme = {
        colors: {
            primary: "#00c0fb",
            second: "#007DA3",
            third: "#95DB8F",
            four: "#D2E3E2",
            five: "#5FAB5F"
        }
    }

    return (
        <>
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Outlet />
        </ThemeProvider>
        </>
    )
}