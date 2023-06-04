import { useMutation } from "@tanstack/react-query"

export default function Header(props){
    const logoutMutation = useMutation({
        mutationFn: () => {
            return fetch("http://localhost:21465/api/robocob/logout-session", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            }).then(res => res.json())
        }
    })

    return (
        <div>
            <div>
                {props.children}
            </div>
            <div>
                <button onClick={logoutMutation.mutate}>
                    Logout
                </button>
            </div>
            
        </div>
    )
}