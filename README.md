# <img src="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyMTgydTZlZGdzaXRicmd0bTV3ZGR4bGs5aW43dTBzaGRyZWR1ZDRlOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/ZR9nqLI2ZhUU8/giphy.gif" alt="class" width="50" height="50" /> Desafio Dev FullStack : Climate Brain


![logo](readme/climatebrainlogo.png)

## <img src="https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUyZm5sZjZmMTdvZnRteGIyaGttbHVuNXo5a3l0NzlyejNpNjhweXZhbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/l1J9vbuzm0F0AlUOI/giphy.gif" alt="class" width="35" height="35" /> Introdução do Projeto:
Este projeto é uma aplicação full-stack moderna desenvolvida como parte do Desafio G-DASH. Ele integra múltiplas linguagens de programação (TypeScript com NestJS e React, e Go), serviços (APIs, Workers, Bancos de Dados), e ferramentas de conteinerização (Docker Compose) para criar um sistema robusto de coleta, processamento, análise e visualização de dados climáticos.

A arquitetura do sistema é orientada a serviços, garantindo escalabilidade e separação de responsabilidades. Um ponto central é a integração de Inteligência Artificial (IA) para transformar dados brutos em insights acionáveis sobre o clima, elevando a aplicação de um simples dashboard para uma ferramenta de análise através de IA.

##  <img src="https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUyaWd5NXp2M3d6cTlidGwybjh1Njkwejl4b3g2YTYyYzBqeXI0cmM5NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/26n7akkYdGGOk7fPy/giphy.gif" alt="class" width="35" height="35" /> Objetivo do Projeto:
O principal objetivo deste projeto é construir um sistema completo e resiliente que demonstre proficiência na integração de stacks tecnológicas diversas e modernas. Especificamente, o projeto visa:

* Coleta de Dados em Tempo Real: Estabelecer um serviço (collector em Python) para obter dados climáticos periódicos e reais de uma localização específica (Toritama).
* Integração Assíncrona: Utilizar uma arquitetura de mensagens (via Redis) para garantir que a coleta e o processamento dos dados sejam desacoplados e resilientes, sendo processados por um Worker em Go.
* Desenvolvimento de API Robusta: Criar um backend (NestJS com MongoDB) que sirva como a fonte única de verdade para os dados climáticos e inclua funcionalidades essenciais, como CRUD de Usuários, Autenticação (Auth), conexão de dados de API externa (PokéAPI) e do Worker.
* Visualização Dinâmica: Desenvolver um frontend moderno (React + Vite + Tailwind + shadcn/ui) para exibir os dados coletados de forma clara e intuitiva em um Dashboard.
* Geração de Insights com IA: Implementar um módulo que utilize Inteligência Artificial para gerar insights valiosos, através de um chat de IA com perguntas e respostas com base nos dados de tempo do banco.
* Gerenciamento de Dados: Incluir recursos de exportação de dados (CSV/XLSX).
* Conteinerização Completa: Garantir que toda a aplicação, incluindo backend, worker, collector e banco de dados, possa ser inicializada de maneira consistente e rápida através de Docker Compose.

## <img src="https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUyMGEwMnhiemI0ZHN1c2Z1Ynd5MXl4b2Rpc2s1NXozanczMHgwZjNjMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/46yPfgO81ZalJSKu74/giphy.gif" alt="class" width="35" height="35" /> Tecnologias Utilizadas:

<p align="center">
  <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-%23DC382D.svg?style=for-the-badge&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white" />
  <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" />
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Artificial%20Intelligence-FF6600?style=for-the-badge&logo=google&logoColor=white" />
</p>

## <img src="https://media4.giphy.com/media/v1.Y2lkPTZjMDliOTUycGRrZHJkazl3OTNtZDdvOXA2ZjFtYXJiM2o5aGxyMW5yaGF0bjA5NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/jJe90kHmZFpte/giphy.gif" alt="class" width="35" height="35" /> Etapas do Projeto & Funcionalidades
O projeto foi dividido em quatro grandes módulos interconectados, cada um responsável por uma parte do ciclo de vida dos dados climáticos e do gerenciamento do sistema.

### <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWN1YmhhOG5qamp0anBhcThvcHkydGpvNTloMDZrbzlleTkyZW96MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/SFyIZ3qHSCA9EueRrj/giphy.gif" alt="class" width="25" height="25" /> Módulo de Coleta e Processamento de Dados
Esta etapa garante a captura de dados em tempo real e seu processamento assíncrono.
* Coleta Periódica (collector-python):
  * Funcionalidade: Coleta dados climáticos (temperatura, umidade, vento, etc.) de uma API externa (OpenWeather) para uma localização definida (Toritama).
  Funcionalidade: Serializa e envia o objeto de dados em tempo real para o Message Broker.

* Worker Assíncrono (worker-go):
  * Funcionalidade: Consome a fila de mensagens (Redis) de forma persistente.
  * Funcionalidade: Realiza a validação e formatação final dos dados antes de enviá-los à API NestJS para persistência.

### <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWN1YmhhOG5qamp0anBhcThvcHkydGpvNTloMDZrbzlleTkyZW96MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/SFyIZ3qHSCA9EueRrj/giphy.gif" alt="class" width="25" height="25" /> Backend Core (backend-nestjs)
A API central que serve como a fonte única de verdade para toda a aplicação.
* API de Dados Climáticos:
  * Funcionalidade: Rotas para gerenciar os logs climáticos no MongoDB e criaçãode rotas personalizadas para as visualizações do dashboard.
  * Funcionalidade: Endpoints otimizados para consulta paginada e filtrada dos dados de clima.

* Gerenciamento de Usuários (CRUD):
  * Funcionalidade: Criação, leitura, atualização e exclusão de usuários.
  * Funcionalidade: Autenticação (Auth) completa com geração de tokens (JWT) e rotas protegidas.

* Integração Opcional:
  * Funcionalidade: Endpoint para consumo e exibição de uma API pública externa paginada (PokéAPI).

* Exportação de Dados:
  * Funcionalidade: Exportação sob demanda dos dados climáticos de logs para formatos CSV ou XLSX.

### <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWN1YmhhOG5qamp0anBhcThvcHkydGpvNTloMDZrbzlleTkyZW96MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/SFyIZ3qHSCA9EueRrj/giphy.gif" alt="class" width="25" height="25" />  Frontend & Dashboard (frontend-project)
A interface do usuário, focada em visualização e interação.

* Dashboard de Clima:
  * Funcionalidade: Exibição gráfica de dados climáticos da minha localização (Toritama) recentes, históricos e insights através de Kpise gráficos.
  * Funcionalidade: Filtros e paginação para navegar pelos logs climáticos.

* Página de Perfil:
  * Funcionalidade: Página para o usuário logado gerenciar suas informações de cadastro, como edição e deleção dos próprios dados.

* Página de Explorar:
 * Funcionalidade: Chama a API do backend de dados externos (pokemon) e renderiza uma lista com os pokemons e dados detalhados deste.

* Página de Chat IA:
  * Funcionalidade: Chat interativo que traz informações relevantes conforme as perguntas enviadas pelo usuário e de acordo com os logs de clima do banco.
 
## <img src="https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUyZnVscGxwcWdweGdrZ2pwbWM2aHl0OW4xczlwcG5sMDZyemI2OWMwOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/l378zKVk7Eh3yHoJi/giphy.gif" alt="class" width="35" height="35" />  Como Executar o Projeto:

### <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzVmMXo3b3lhYW5tc2RybXAxZmh0NWxqMWowcnBuZG5ueWUwNG52cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/rgmUYLyvByaO7OfhI3/giphy.gif" alt="class" width="25" height="25" />  Pré-requisitos
Certifique-se de ter instalado em sua máquina:

- **Git** – para clonar o repositório.
- **Docker** – versão 20.10 ou superior.
- **Docker Compose** – versão 1.29 ou superior (ou o comando `docker compose` integrado).

### <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzVmMXo3b3lhYW5tc2RybXAxZmh0NWxqMWowcnBuZG5ueWUwNG52cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/rgmUYLyvByaO7OfhI3/giphy.gif" alt="class" width="25" height="25" /> Instruções de inicialização

1. **Clonar o repositório**
   - Abra o terminal e execute:
     ```bash
     git clone [URL_DO_SEU_REPOSITORIO]
     cd desafio-gdash-2025-02
     ```

2. **Configurar variáveis de ambiente**
   - Copie os arquivos `.env.example` para `.env` em cada pasta relevante.
   - Preencha chaves de API (clima, IA), strings de conexão do MongoDB, credenciais do RabbitMQ e segredos de JWT.
   - Exemplo (raiz do projeto):
     ```bash
     # Configurações globais
     MONGODB_URI=mongodb://root:example@mongo:27017/weatherdb?authSource=admin
     WEATHER_API_KEY=[SUA_CHAVE_OPENWEATHER_OU_OPENMETEO]
     AI_API_KEY=[SUA_CHAVE_DE_IA]
     ```

3. **Subir os serviços com Docker Compose**
   - Na raiz do projeto, execute:
     ```bash
     docker-compose up --build -d
     ```
   - O parâmetro `--build` reconstrói as imagens com o código atual.
   - O parâmetro `-d` executa os contêineres em background.

4. **Verificar o status**
   - Use `docker-compose ps` para garantir que todos os serviços (mongo, rabbitmq, backend, worker, collector, frontend) estejam `Up`.
  
### <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzVmMXo3b3lhYW5tc2RybXAxZmh0NWxqMWowcnBuZG5ueWUwNG52cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/rgmUYLyvByaO7OfhI3/giphy.gif" alt="class" width="25" height="25" /> Comandos úteis

- **Subir e reconstruir serviços**
  ```bash
  docker-compose up --build -d
  ```

- **Ver status dos contêineres**
  ```bash
  docker-compose ps
  ```

- **Parar e remover contêineres**
  ```bash
  docker-compose down
  ```

- **Acompanhar logs de um serviço específico (ex.: backend)**
  ```bash
  docker-compose logs -f backend
  ```

### <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzVmMXo3b3lhYW5tc2RybXAxZmh0NWxqMWowcnBuZG5ueWUwNG52cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/rgmUYLyvByaO7OfhI3/giphy.gif" alt="class" width="25" height="25" /> Endpoints de acesso

- **Dashboard (frontend React)**
  - URL: http://localhost:3000 (ou porta configurada em `PORT` no `.env`).

- **Backend NestJS**
  - URL base: http://localhost:3001 (ou porta configurada em `API_PORT`).
  - Swagger/Documentação: http://localhost:3001/api/docs (se habilitado).
 
### <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzVmMXo3b3lhYW5tc2RybXAxZmh0NWxqMWowcnBuZG5ueWUwNG52cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/rgmUYLyvByaO7OfhI3/giphy.gif" alt="class" width="25" height="25" /> Boas práticas

- Sempre atualize as variáveis de ambiente antes de subir novos contêineres.
- Use `docker-compose logs -f <servico>` para depurar problemas específicos.
- Execute `docker-compose down` ao final do dia para liberar recursos da máquina, se necessário.

## <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGw4eDUzd3dybzhnY3Q3bG1md243ZmtsM2R0M2hwN3lsc3I1bTlmbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/KhdHwaqRgo8JB3omMg/giphy.gif" alt="class" width="35" height="35" /> Estrutura do Repositório:

```
DESAFIO-GDASH-2025-02/
├── backend-nestjs/
│   ├── src/
│   │   ├── auth/                        # Módulo de Autenticação e Autorização (Login/JWT)
│   │   │   ├── dto/
│   │   │   ├── guards/
│   │   │   ├── strategies/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   │
│   │   ├── common/                      # Classes e utilitários compartilhados (Decorators)
│   │   ├── pokemon/                     # Módulo Opcional de Integração com PokéAPI
│   │   ├── users/                       # Módulo de Gerenciamento de Usuários (CRUD)
│   │   └── weather/                     # Módulo de Dados e Logs Climáticos
│   │
│   ├── .env                           # Variáveis de ambiente específicas do backend
│   └── Dockerfile
│
├── collector/                       # Serviço de Coleta Periódica (Python)
│   ├── collector.py                   # Script principal que coleta dados e envia para o Redis
│   ├── Dockerfile                     # Imagem Docker do coletor
│   └── requirements.txt               # Dependências Python (requests, client Redis/RabbitMQ)
│
├── frontend-project/                # Aplicação Frontend (Next.js/React)
│   ├── app/                           # Diretório de roteamento baseado em arquivos (App Router)
│   │   ├── (auth)/                      # Grupo de rotas de Autenticação (sign-in, sign-up)
│   │   │   ├── sign-in/page.tsx           # Página de login
│   │   │   └── sign-up/page.tsx           # Página de registro
│   │   │
│   │   ├── (dashboard)/                 # Grupo de rotas principais da Aplicação
│   │   │   ├── dashboard/page.tsx         # Dashboard principal com dados de clima e insights
│   │   │   ├── explore/[id]/page.tsx      # Rota dinâmica para detalhe da API opcional
│   │   │   ├── notifications/page.tsx     # Área de notificações/alertas
│   │   │   ├── profile/page.tsx           # Configurações do perfil do usuário
│   │   │   ├── tables/page.tsx            # Visualização tabular e exportação de dados climáticos
│   │   │   └── layout.tsx                 # Layouts específicos do dashboard
│   │   ├── layout.tsx                   # Layouts raiz
│   │   └── global.css                   # Estilos globais
│   │
│   ├── components/
│   │   ├── ui/                          # Componentes de UI (shadcn/ui)
│   │   └── theme-provider.tsx           # Provedor de tema/modo escuro
│   │
│   ├── hooks/
│   │   ├── use-mobile.ts                # Hook para detecção de dispositivo móvel
│   │   └── use-toast.ts                 # Hook para notificações toast
│   │
│   ├── lib/                           # Funções utilitárias e de conexão
│   ├── public/                        # Arquivos estáticos (imagens, ícones)
│   └── styles/
│
├── worker-go/                       # Serviço Worker Assíncrono (Go)
│   ├── Dockerfile                     # Imagem Docker do worker
│   ├── go.mod                         # Dependências do Go
│   ├── go.sum
│   └── main.go                        # Lógica principal: consome a fila e envia dados para o NestJS
│
├── .env                             # Variáveis de ambiente globais (Docker Compose, secrets)
├── docker-compose.yml               # Orquestração de todos os serviços (Backend, Frontend, Worker, Collector, DB, Redis)
└── README.md

```
