<p align="center"><a href="https://www.aquicob.com.br/" target="_blank"><img src="https://www.aquicob.com.br/assets/img/logo/logo1.png" width="400"></a></p>

## Proposta do projeto/desafio

Problema:  Uma empresa precisa de uma ferramenta para o envio de boletos via WhatsApp, com isso foi idealizado um protótipo de 3 telas, sendo elas: 
 
- Conectar WhatsApp utilizando QRCode (WhatsAppWeb API).
  - Atualizar status ao conectar;
  - Atualizar status ao desconectar (opcional);
  - Informações sobre o número conectado (opcional);
- Preencher e anexar as seguintes informações necessárias para o envio:
  - Número a ser enviado o boleto;
  - Mensagem que acompanhará o boleto;
  - Campo para upload do arquivo (.pdf);
- Relatório de envio, onde deve conter as seguintes colunas:
  - ID do envio;
  - Mensagem enviada;
  - Número destino;
  - Data/Hora envio;
  - Nome do arquivo enviado;

## Sobre a implementação

O sistema consiste em 3 partes: 

- Front-end
  - React(Com Vite)
  - React Query
  - React Router
  - Styled Components
- Back-end
  - REST Api
  - PHP
  - MYSql
  - Framework Laravel
- WWPConnect-server
  - REST-Api desenvolvido pela WPPConnect Team utilizado neste projeto para comunicação com o whatsapp
  - Github: https://github.com/wppconnect-team/wppconnect-server

## Como rodar

Execute estes passos para as 3 partes da aplicação:

- Front-end: 
  - Node.js
  - Instalar depencencias node presentes no arquivo "package.json"
  - Executar em seu diretorio o comando: "npm run dev"
- Back-end:
  - PHP (instalando o servidor apache todos os requisitos ja estaram cumpridos)
  - Executar em seu diretorio o comando: "php artisan serve"
- WWPConnect-server:
  - Node.js
  - Instalar depencencias node presentes no arquivo "package.json"
  - Executar em seu diretorio o comando: "npm run dev"
