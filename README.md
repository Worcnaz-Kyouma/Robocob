<p align="center"><a href="https://www.aquicob.com.br/" target="_blank"><img src="https://www.aquicob.com.br/assets/img/logo/logo1.png" width="400"></a></p>

## Proposta do projeto/desafio

Problema:  Uma empresa precisa de uma ferramenta para o envio de boletos via WhatsApp, com isso foi idealizado um protótipo de 3 telas, sendo elas: 
 
- Conectar WhatsApp utilizando QRCode (WhatsAppWeb API)
  - Atualizar status ao conectar
  - Atualizar status ao desconectar (opcional)
  - Informações sobre o número conectado (opcional)
- Preencher e anexar as seguintes informações necessárias para o envio
  - Número a ser enviado o boleto
  - Mensagem que acompanhará o boleto
  - Campo para upload do arquivo (.pdf)
- Relatório de envio, onde deve conter as seguintes colunas
  - ID do envio
  - Mensagem enviada
  - Número destino
  - Data/Hora envio
  - Nome do arquivo enviado

## Sobre a implementação

O sistema consiste em 3 partes: 

- Front-end
  - React(Com Vite)
  - React Query
  - React Router
  - Styled Components
- Back-end
  - REST-Api
  - PHP
  - MySQL Database
  - Framework Laravel
- WWPConnect-server
  - REST-Api desenvolvido pela WPPConnect Team utilizado neste projeto para comunicação com o whatsapp
  - Github: https://github.com/wppconnect-team/wppconnect-server

## Como rodar

Execute estes passos para as 3 partes da aplicação:

- Front-end: 
  - Node.js
  - Dentro da pasta client-side, instalar dependencias node presentes no arquivo "package.json"
  - Executar em seu diretorio o comando: "npm run dev"
- Back-end:
  - PHP (instalando o servidor apache todos os requisitos do Laravel ja estarão cumpridos)
  - MySQL Database
  - Composer
  - Dentro da pasta server-side, instalar dependencias laravel utilizando o comando "composer install"
  - Caso o arquivo ".env" não exista mas o ".env.example" exista, execute o comando "copy .env.example .env"
  - Dentro do arquivo ".env" atribuir os seguintes valores:
    - DB_DATABASE = aquicob
    - DB_USERNAME = [seu usuario do banco]
    - DB_PASSWORD = [senha deste usuario]
  - Executar em seu diretorio o comando: "php artisan serve"
- WWPConnect-server:
  - Node.js
  - Dentro da pasta wppconnect-server, instalar dependencias node presentes no arquivo "package.json"
  - Executar em seu diretorio o comando: "npm run dev"

## Em caso de erros/Telas de carregamente prolongadas:

A aplicação pode conter alguns erros, estas ações podem (provavelmente) resolve-los:
- Recarregar a pagina
- Reiniciar todas as partes da aplicação, principalmente a "WWPConnect-server", seguindo os passos orietados no segmento "Como rodar"
