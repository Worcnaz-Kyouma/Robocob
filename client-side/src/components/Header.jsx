import { useMutation } from "@tanstack/react-query"
import { HeaderStyled, HeaderButtonsWrapper } from "./styles/Header.styled"
import { StyledButton } from "./styles/Button.styled"
import { useQueryClient } from "@tanstack/react-query"

export default function Header(props){
    const queryClient = useQueryClient();

    const logoutMutation = useMutation({
        mutationFn: () => {
            return fetch("http://localhost:21465/api/robocob/logout-session", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            }).then(res => res.json())
        },
        onSuccess: () => {
            queryClient.resetQueries(['session', 'qrcode'])
        }
    })

    return (
       <HeaderStyled>
            <HeaderButtonsWrapper>
                {props.children}
            </HeaderButtonsWrapper>
            {!props?.login &&
            <div>
            <StyledButton onClick={logoutMutation.mutate} barColor={'#9C0707'}>
                Sair
            </StyledButton>
            </div>
            }
            
        </HeaderStyled>
        
    )
}