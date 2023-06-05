import Header from "../Header"
import MessagesList from "./MessagesList"
import Footer from "./Footer"
import { useLocation, Link } from "react-router-dom"
import { StyledButton } from "../styles/Button.styled"

export default function Home(){
    const location = useLocation()

    return (
        <>
        <Header token={location.state?.token}>
            <Link to={location.pathname + "/sender"} state={{token: location.state?.token}}><StyledButton>Enviar boleto</StyledButton></Link>
        </Header>
        <h1 style={{
            textAlign: "center"
        }}>Mensagens enviadas</h1>
        <MessagesList token={location.state?.token}/>
        
        <Footer token={location.state?.token}/>
        </>
        
    )
}