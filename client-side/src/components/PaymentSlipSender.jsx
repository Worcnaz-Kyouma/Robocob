import { useMutation } from "@tanstack/react-query"

export default function PaymentSlipSender(){


    function sendPaymentSlip(form){
        const base64File = URL.createObjectURL(form.querySelector('input[type="file"]').files[0])

        const formData = new FormData()
        
        formData.append("phone", form.querySelector('input[name="numero_destino"]').value)
        formData.append("base64", base64File)
        formData.append("isGroup", false)

        const formJson = Object.fromEntries(formData.entries())

        sendFileMutation.mutate(formJson)
    }

    function sendAdditionalMessage(form){
        const formData = new FormData()
        
        formData.append("phone", form.querySelector('input[name="numero_destino"]').value)
        formData.append("message", form.querySelector('input[name="mensagem_adicional"]').value)
        formData.append("isGroup", false)

        const formJson = Object.fromEntries(formData.entries())

        sendMessageMutation.mutate(formJson)
    }

    function persistMessage(form){
        const formData = new FormData(form)
        
        formData.append("nome_arquivo", form.querySelector('input[type="file"]').value)
        formData.delete("boleto")

        const formJson = Object.fromEntries(formData.entries())

        messageMutation.mutate(formJson)
    }
    
    function handleSubmit(event){
        event.preventDefault()

        const form = event.target

        sendPaymentSlip(form)

        sendAdditionalMessage(form)

        persistMessage(form)

        //URL.createObjectURL(event.target.querySelector('input[type="file"]'))
        //const formData = new FormData(form)
        //formData.delete("boleto") 
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="numero_destino"/>
            <input type="text" name="mensagem_adicional"/>
            <input type="file" name="boleto" accept="application/pdf"/>
        </form>
    )
}