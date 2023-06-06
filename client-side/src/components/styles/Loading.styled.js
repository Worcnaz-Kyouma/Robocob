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