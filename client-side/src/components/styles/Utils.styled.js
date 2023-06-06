import styled from "styled-components";

export const StyledLoading = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: ${({size}) => size || "150px"};
    aspect-ratio: 1;

    border-left: 2px solid ${({theme}) => theme.colors.primary};
    border-bottom: 3px solid ${({theme}) => theme.colors.primary};
    border-radius: 50%;

    animation: rotate 1.5s linear infinite;

    @keyframes rotate {
        from{
            transform: translate(-50%, -50%) rotate(0deg);
        }
        to{
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }
`

export const LoadingMessage = styled.span`
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    opacity: 0.8;
`

export const StyledError = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: ${({size}) => size || "150px"};
    aspect-ratio: 1;

    background-image: url("../error.png");
    background-repeat: no-repeat;
    background-size:100%;

    animation: error 1.5s linear forwards;

    @keyframes error {
        0%{
            opacity: 0;
        }
        50%, 80%{
            opacity: 1;
        }
        99.9%{
            opacity: 0;
        }
        100%{
            display: none;
            opacity: 0;
        }
    }
`