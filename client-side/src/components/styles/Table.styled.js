import styled from "styled-components";

export const TableWrapper = styled.div`
    width: 80%;

    margin: 20px auto;

    border: 3px solid #3C4856;
    border-bottom: 15px solid #3C4856;
    border-radius: 9px;
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.3);
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