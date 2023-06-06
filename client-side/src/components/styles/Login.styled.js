import styled from "styled-components"

export const QRcodeWrapper = styled.div`
    position: absolute;
    width: 278px;
    height: 278px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border-top: 8px solid black;
    border-right: 8px solid black;
    border-bottom: 8px solid ${({theme}) => theme.colors.primary};
    border-left: 8px solid ${({theme}) => theme.colors.primary};

    img{
        width: 100%;
    }

    &::before, &::after{
        content: '';
        position: absolute;

        width: 180px;
        height: 180px;

        z-index: -1;

        background-color: white
    }

    &::before{
        top: -10px;
        left: -10px;
    }
    &::after{
        bottom: -10px;
        right: -10px;
    }
`