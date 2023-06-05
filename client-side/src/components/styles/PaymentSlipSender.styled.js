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

    padding: 20px 0 20px 0;

    button{
        width: 120px;
    }
`

export const StyledInputSpan = styled.span`
    display: flex;
    flex-direction: column;

    input:not([type="file"]), textarea {
        border: 0;
        border-bottom: 1px solid black;
        border-radius: 4px;
        box-shadow: 1px 1px 3px 0px rgb(1,1,1);

        padding: 5px 10px 5px 10px;

        font-size: 16px;

        resize: none;

        outline:none;
    }

    label{
        margin-bottom: 15px;
    }

    input[type="file"]{
        display: none;
    }
`

export const StyledInputFileSpan = styled.span`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50%;

    input[type="file"]{
        display: none;
    }

    label{
        display: block;
        width: 50px;
        padding: 5px;
        border: 2px dotted black;
        cursor: pointer;

        img {
            width: 100%;
        }
    }

    span {
        font-size: 22px;
    }
`