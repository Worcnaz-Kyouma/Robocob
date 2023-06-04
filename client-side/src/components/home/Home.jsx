import Header from "../Header"
import MessagesList from "./MessagesList"
import Footer from "./Footer"
import { useLocation, Link } from "react-router-dom"

export default function Home(){
    const location = useLocation()

    return (
        <>
        <Header token={location.state.token}>
            <Link to={location.pathname + "/sender"} state={{token: location.state.token}}><button>Send</button></Link>
        </Header>

        <MessagesList token={location.state.token}/>
        
        <Footer token={location.state.token}/>
        </>
        
    )
}