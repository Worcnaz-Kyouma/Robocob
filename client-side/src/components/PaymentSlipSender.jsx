import { useMutation } from "@tanstack/react-query"
import { useLocation, useNavigate } from "react-router-dom"
import Header from "./Header"
import Footer from "./home/Footer";
import moment from 'moment';
import { StyledButton } from "./styles/Button.styled";
import { Flex, StyledForm, StyledInputSpan, StyledInputFileSpan, StyledSucess } from "./styles/PaymentSlipSender.styled";
import { useRef } from "react";
import { StyledError } from "./styles/Utils.styled";

export default function PaymentSlipSender(props){
    const navigate = useNavigate()
    const location = useLocation()
    const embedRef = useRef(null)

    const fileMutation = useMutation({
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

    const additionalMessageMutation = useMutation({
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
        },
        onSuccess: () => {
            setTimeout(()=>navigate(0), 2000)
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

         return fileMutation.mutateAsync(formJson)
    }

    function sendAdditionalMessage(form){
        const formJson = {
            phone: form.querySelector('input[name="numero_destino"]').value,
            message: form.querySelector('textarea').value,
            isGroup: false
        }

        return additionalMessageMutation.mutateAsync(formJson)
    }

    function persistMessage(form){
        const formData = new FormData(form)
        
        formData.append("nome_arquivo", form.querySelector('input[type="file"]').files[0].name)
        formData.delete("boleto")
        formData.append("data_envio", moment().format())

        const formJson = Object.fromEntries(formData.entries())

        return messageMutation.mutateAsync(formJson)
    }
    
    function handleSubmit(event){
        event.preventDefault()

        const form = event.target

        sendAdditionalMessage(form).then(()=>{
            sendPaymentSlip(form).then(() => {
                persistMessage(form)
            })
        })

        

       
    }

    return (
        <>
        {(messageMutation.isSuccess) && <StyledSucess />}
        {(fileMutation.isError || additionalMessageMutation.isError || messageMutation.isError) && <StyledError infinity={true}/>}
        <Header>
            <StyledButton onClick={() => navigate(-1)}>Voltar</StyledButton>
        </Header>
        <Flex>
            <StyledForm onSubmit={handleSubmit}>
                <StyledInputSpan>
                    <label htmlFor="numero_destino">Numero</label>
                    <input type="tel" name="numero_destino" id="numero_destino" required onChange={(event) => {
                        const inputElement = event.target
                        let alphabeticRegExp = /[a-zA-Z]/g
                        if(alphabeticRegExp.test(inputElement.value))
                            inputElement.setCustomValidity('Um numero de telefone não pode conter letras')
                        else
                            inputElement.setCustomValidity('')
                    }}/>
                </StyledInputSpan>
                <StyledInputSpan>
                    <label htmlFor="mensagem_adicional">Mensagem</label>
                    <textarea id="mensagem_adicional" name="mensagem_adicional"
                        rows="10" cols="45">
                    </textarea>
                </StyledInputSpan>
                <StyledInputFileSpan>
                    <span>Boleto</span>
                    <label htmlFor="boleto">
                        <img src="../pdf.png" alt="" />
                    </label>
                    <input type="file" name="boleto"
                    id="boleto"
                    accept="application/pdf"
                    required
                    onChange={(event) => {
                        embedRef.current.src = URL.createObjectURL(event.target.files[0])
                    }}/>
                </StyledInputFileSpan>
                <StyledButton barColor="#5FAB5F" type="submit">Enviar</StyledButton>
            </StyledForm>

            <div>
                <embed src="../placeholder.pdf" alt="" ref={embedRef}/>
            </div>
        </Flex>
        
        <Footer token={location.state.token}/>
        </>
        
    )
}