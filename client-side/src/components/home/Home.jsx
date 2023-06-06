import Header from "../Header"
import MessagesList from "./MessagesList"
import Footer from "./Footer"
import { useOutletContext, Link } from "react-router-dom"
import { StyledButton } from "../styles/Button.styled"

export default function Home(){
    const [ token ] = useOutletContext()

    return (
        <>
        <Header token={token}>
            <Link to={location.pathname + "/sender"} state={{token: token}}><StyledButton>Enviar boleto</StyledButton></Link>
        </Header>
        <h1 style={{
            textAlign: "center"
        }}>Mensagens enviadas</h1>
        <MessagesList token={token}/>
        
        <Footer token={token}/>
        </>
        
    )
}