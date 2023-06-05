import styled from "styled-components";

export const StyledFooter = styled.footer`
    display: flex;
    align-items: center;
    justify-content: space-around;

    margin-top: auto;

    height: 200px;

    color: rgb(226, 226, 226);
    background-color: ${({ theme }) => theme.colors.third};

    ul{
        display: flex;
        flex-direction: column;
        font-size: 17px;
        list-style: square;
    }

    li span{
        margin: 0px;
        margin-right: 10px;
        font-size: 20px;
    }

    h2{
        position: relative;
    }

    h2::before{
        content: '';
        position: absolute;
        top: 40%;
        left: -17px;
        width: 9px;
        aspect-ratio: 1;
        border-radius: 100%;

        background-color: white;
    }
`