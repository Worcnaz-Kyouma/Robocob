import { useQuery } from "@tanstack/react-query"

export default function Footer(props){
    const hostDeviceQuery = useQuery({
        queryKey: ["hostdevice"],
        queryFn: () => {
            return fetch("http://localhost:21465/api/robocob/host-device", {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            }).then(res => res.json())
        }
    }) 

    if(hostDeviceQuery.isLoading) return <h1>Loading!</h1>
    if(hostDeviceQuery.isError) return <h1>Error :c</h1>
    return (
        <>
            <p>{hostDeviceQuery.data.response.platform}</p>
            <p>{hostDeviceQuery.data.response.pushname}</p>
            <p>{hostDeviceQuery.data.response.phoneNumber}</p>
        </>
    )
}