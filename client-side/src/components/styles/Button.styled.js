import styled from "styled-components";

export const StyledButton = styled.button`
    position: relative;

    border: 0px;
    box-shadow: 1px 1px 5px 0px rgba(1, 1, 1, 0.475);
    border-radius: 8px;

    cursor: pointer;

    padding: 6px 30px 12px 30px;

    font-size: 16px;
    font-weight: 500;
    font-family: 'Segoe UI';

    background-color: ${({theme}) =>theme.colors.four};

    transition: all 0.2s;

    &:hover{
        transform: scale(1.02)
    }

    &::before, &::after{
        content: '';
        position: absolute;
        bottom: 17%;
        left: 15%;
        width: 70%;
        height: 3px;
        background-color: inherit;
        z-index: 1;
        filter: brightness(0.9);
    }

    &::after{
        width: 0;
        background-color: ${({theme, barColor}) => barColor || theme.colors.second} ;
        z-index: 2;
        transition: all 0.5s;
        
    }
    &:hover::after{
        width: 70%;
    }
`