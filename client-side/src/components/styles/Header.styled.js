import styled from "styled-components";

export const HeaderStyled = styled.header`
    position: relative;
    
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

export const LogoWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 285px;
    height: 70px;

    border-radius: 25px;

    box-shadow: 1px 1px 5px 0px rgb(0, 0, 0) inset;

    background-image: url("../RobocobLogo.png");
    background-repeat: no-repeat;
    background-size:70% 70%;
    background-position: 50%;

    background-color: #ffffff;

    filter: brightness(1);
`