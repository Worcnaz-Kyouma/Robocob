import styled from "styled-components";

export const Flex = styled.div`
    position: relative; 

    display: flex;
    justify-content: space-around;
    flex-grow: 1;

    div{
        width: 500px;
        height: 750px;

        border: 2px dotted black;

        padding: 5px;

        margin: 15px;

        embed{
            width: 100%;
            height: 100%;
        }
    }
`

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;

    padding: 20px 10% 20px 10%;

    button{
        width: 120px;
    }
`

export const StyledInputSpan = styled.span`
    position: relative;

    input:not([type="file"]), textarea {
        width: 100%;
        height: 100%;

        border: 0;
        border-bottom: 1px solid black;
        border-radius: 4px;
        box-shadow: 1px 1px 5px 0px rgb(1,1,1);

        padding: 5px 10px 5px 10px;

        font-size: 16px;

        outline:none;
    }
    label{
        position: absolute;
        z-index: 2;
    }

    input[type="file"]{
        display: none;
    }
`