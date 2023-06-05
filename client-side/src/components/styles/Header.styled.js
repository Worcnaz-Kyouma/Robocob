import styled from "styled-components";

export const HeaderStyled = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    border-bottom: 1px solid black;

    width: 100%;
    height: 90px;

    background-color: ${({theme}) =>theme.colors.primary};

    div{
        min-width: 10%;
        margin-right: 10px;
        button{
            display: block;
            margin: auto;
        }
    }
`

export const HeaderButtonsWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    margin-left: 10px;


    a{
        text-decoration: none;
    }
`