import { useMutation } from "@tanstack/react-query"
import { useLocation, useNavigate } from "react-router-dom"
import Header from "./Header"
import Footer from "./home/Footer";
import moment from 'moment';
import { StyledButton } from "./styles/Button.styled";
import { Flex, StyledForm, StyledInputSpan } from "./styles/PaymentSlipSender.styled";
import { useRef } from "react";

export default function PaymentSlipSender(props){
    const navigate = useNavigate()
    const location = useLocation()
    const embedRef = useRef(null)

    const sendFileMutation = useMutation({
        mutationFn: (newFile) => {
            return fetch("http://localhost:21465/api/robocob/send-file-base64", {
                method: "POST",
                body: JSON.stringify(newFile),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + location.state.token
                }
            }).then(res => res.json())
        }
    })

    const sendMessageMutation = useMutation({
        mutationFn: (newAdditionalMessage) => {
            return fetch("http://localhost:21465/api/robocob/send-message", {
                method: "POST",
                body: JSON.stringify(newAdditionalMessage),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + location.state.token
                }
            }).then(res => res.json())
        }
    })

    const messageMutation = useMutation({
        mutationFn: (newMessage) => {
            return fetch("http://localhost:8000/api/boleto", {
                method: "POST",
                body: JSON.stringify(newMessage),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
        }
    })

    async function sendPaymentSlip(form){
        function pdfFileToBase64(file){
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
        
                fileReader.onload = () => {
                    resolve(fileReader.result);
                };
        
                fileReader.onerror = (error) => {
                    reject(error);
                };
            });
        };

        const formJson = {
            phone: form.querySelector('input[name="numero_destino"]').value,
            base64: await pdfFileToBase64(form.querySelector('input[type="file"]').files[0]),
            isGroup: false
        }

        sendFileMutation.mutate(formJson)
    }

    function sendAdditionalMessage(form){
        const formJson = {
            phone: form.querySelector('input[name="numero_destino"]').value,
            message: form.querySelector('input[name="mensagem_adicional"]').value,
            isGroup: false
        }

        sendMessageMutation.mutate(formJson)
    }

    function persistMessage(form){
        const formData = new FormData(form)
        
        formData.append("nome_arquivo", form.querySelector('input[type="file"]').files[0].name)
        formData.delete("boleto")
        formData.append("data_envio", moment().format())

        const formJson = Object.fromEntries(formData.entries())
        messageMutation.mutate(formJson)
    }
    
    function handleSubmit(event){
        event.preventDefault()

        const form = event.target

        sendPaymentSlip(form)

        sendAdditionalMessage(form)

        persistMessage(form)
    }

    return (
        <>
        <Header>
            <StyledButton onClick={() => navigate(-1)}>Go back</StyledButton>
        </Header>
        <Flex>
            <StyledForm onSubmit={handleSubmit}>
                <StyledInputSpan>
                    <label htmlFor="numero_destino">Numero</label>
                    <input type="text" name="numero_destino" id="numero_destino"/>
                </StyledInputSpan>
                <StyledInputSpan>
                    <label htmlFor="mensagem_adicional">Mensagem</label>
                    <textarea id="mensagem_adicional" name="mensagem_adicional"
                        rows="5" cols="33">
                    </textarea>
                </StyledInputSpan>
                <StyledInputSpan>
                    <label htmlFor="boleto">Boleto
                    </label>
                    <input type="file" name="boleto"
                    id="boleto"
                    accept="application/pdf"
                    onChange={(event) => {
                        embedRef.current.src = URL.createObjectURL(event.target.files[0])
                    }}/>
                </StyledInputSpan>
                <StyledButton barColor="#5FAB5F" type="submit">Submit</StyledButton>
            </StyledForm>

            <div>
                <embed src="../placeholder.pdf" alt="" ref={embedRef}/>
            </div>
        </Flex>
        
        <Footer token={location.state.token}/>
        </>
        
    )
}