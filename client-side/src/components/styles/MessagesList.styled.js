import styled from "styled-components";

export const TableWrapper = styled.div`
    width: 80%;

    margin: 20px auto;

    border: 3px solid #3C4856;
    border-bottom: 15px solid #3C4856;
    border-radius: 9px;
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.3);

    div{
        display: flex;
        align-items: center;
        justify-content: space-around;
        
        width: 160px;
        height: 40px;
        
        margin-left: auto;

        button{
            padding: 5px 10px 5px 10px;

            border: 0px;
            border-bottom: 1px solid black;
            border-radius: 6px;

            cursor: pointer;

            color: white;
            background-color: ${({ theme }) => theme.colors.primary};

            transition: all 0.3s;
            
            &:disabled{
                filter: brightness(0.6);
            }

            &:hover{
                transform: scale(1.05);
            }

            &:active{
                transform: scale(1);
                border: 0px;
            }
        }

        span {
            padding: 2px 6px 2px 6px;

            border: 1px solid black;
            border-radius: 8px;
            box-shadow: 1px 1px 4px 0px rgb(165, 165, 165) inset;
        }
    }
`

export const StyledTable = styled.table`
    width: 100%;

    border-collapse: collapse;

    thead, tbody{
        border-collapse: collapse;
    }

    thead th, td{
        padding: 10px 25px 10px 25px;
        text-align: start;
    }

    tr{
        border-bottom: 1px solid black;
    }

`