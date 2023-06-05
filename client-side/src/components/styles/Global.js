import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
    body{
        margin: 0px;
        font-family: 'Segoe UI';
    }

    #root{
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    h1, p {
        opacity: 0.6;
        line-height: 1.5;
    }
`

export default GlobalStyles