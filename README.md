# <img src="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyMTgydTZlZGdzaXRicmd0bTV3ZGR4bGs5aW43dTBzaGRyZWR1ZDRlOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/ZR9nqLI2ZhUU8/giphy.gif" alt="class" width="50" height="50" /> Desafio Dev FullStack : Climate Brain


![logo](readme/climatebrainlogo.png)

## <img src="https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUyZm5sZjZmMTdvZnRteGIyaGttbHVuNXo5a3l0NzlyejNpNjhweXZhbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/l1J9vbuzm0F0AlUOI/giphy.gif" alt="class" width="35" height="35" /> Introdução do Projeto
Este projeto é uma aplicação full-stack moderna desenvolvida como parte do Desafio G-DASH. Ele integra múltiplas linguagens de programação (TypeScript com NestJS e React e Go), serviços (APIs, Workers, Bancos de Dados) e ferramentas de containerização (Docker Compose) para criar um sistema robusto de coleta, processamento, análise e visualização de dados climáticos.

A arquitetura do sistema é orientada a serviços, garantindo escalabilidade e separação de responsabilidades. Um ponto central é a integração de Inteligência Artificial (IA) através do serviço dedicado **`ai-service` (FastAPI/Python)**. Este serviço transforma dados brutos em *insights* acionáveis sobre o clima, permitindo uma análise interativa via **Chat IA**.

* [Explicação No YouTube](https://youtu.be/Jjl_cxBWDFo)

## <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmhjemhhdjZ2dWxyZ3FxcjV3OWRwaHpyN3p2ODdrYTd6aWpmNDd1cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3o7aD9CIy1AfFDTJ3W/giphy.gif" alt="class" width="35" height="35" /> Arquitetura do Projeto

![arquitetura](readme/arquitetura_desafio_dev_fullstack.gif)


##  <img src="https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUyaWd5NXp2M3d6cTlidGwybjh1Njkwejl4b3g2YTYyYzBqeXI0cmM5NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/26n7akkYdGGOk7fPy/giphy.gif" alt="class" width="35" height="35" /> Objetivo do Projeto
O principal objetivo deste projeto é construir um sistema completo e resiliente que demonstre proficiência na integração de stacks tecnológicas diversas e modernas. Especificamente, o projeto visa:

* Coleta de Dados em Tempo Real: Estabelecer um serviço (collector em Python) para obter dados climáticos periódicos e reais de uma localização específica (Toritama).
* Integração Assíncrona: Utilizar uma arquitetura de mensagens (via Redis) para garantir que a coleta e o processamento dos dados sejam desacoplados e resilientes, sendo processados por um Worker em Go.
* Desenvolvimento de API Robusta: Criar um backend (NestJS com MongoDB) que sirva como a fonte única de verdade para os dados climáticos e inclua funcionalidades essenciais, como CRUD de Usuários, Autenticação (Auth), conexão de dados de API externa (PokéAPI) e do Worker.
* Visualização Dinâmica: Desenvolver um frontend moderno (React + Vite + Tailwind + shadcn/ui) para exibir os dados coletados de forma clara e intuitiva em um Dashboard.
* Geração de Insights com IA: Implementar um **serviço dedicado (`ai-service` em FastAPI/Python)** que se conecta à API do **Google Gemini** para ler os dados de clima do MongoDB via NestJS e responder às perguntas do usuário em um **Chat IA interativo**.
* Gerenciamento de Dados: Incluir recursos de exportação de dados (CSV/XLSX).
* Conteinerização Completa: Garantir que toda a aplicação, incluindo backend, worker, collector e banco de dados, possa ser inicializada de maneira consistente e rápida através de Docker Compose.

## <img src="https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUyMGEwMnhiemI0ZHN1c2Z1Ynd5MXl4b2Rpc2s1NXozanczMHgwZjNjMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/46yPfgO81ZalJSKu74/giphy.gif" alt="class" width="35" height="35" /> Tecnologias Utilizadas

<p align="center">
  <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-%23DC382D.svg?style=for-the-badge&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white" />
  <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi" /> <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Google%20Gemini-FF6600?style=for-the-badge&logo=google&logoColor=white" /> </p>


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
  * Funcionalidade: Rotas para gerenciar os logs climáticos no MongoDB e criação de rotas personalizadas para as visualizações do dashboard.
  * Funcionalidade: Endpoints otimizados para consulta paginada e filtrada dos dados de clima.

* Gerenciamento de Usuários (CRUD):
  * Funcionalidade: Criação, leitura, atualização e exclusão de usuários.
  * Funcionalidade: Autenticação (Auth) completa com geração de tokens (JWT) e rotas protegidas.

* Integração Opcional:
  * Funcionalidade: Endpoint para consumo e exibição de uma API pública externa paginada (PokéAPI).

* Exportação de Dados:
  * Funcionalidade: Exportação sob demanda dos dados climáticos de logs para formatos CSV ou XLSX.

### <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWN1YmhhOG5qamp0anBhcThvcHkydGpvNTloMDZrbzlleTkyZW96MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/SFyIZ3qHSCA9EueRrj/giphy.gif" alt="class" width="25" height="25" /> Módulo de Análise e Chat IA (ai-service)
Este serviço utiliza o FastAPI para fornecer um endpoint de chat baseado nos dados climáticos.

* Serviço de Chat IA (ai-service - FastAPI/Python):
  * Funcionalidade: Recebe perguntas do usuário via API.
  * Funcionalidade: Consulta os dados climáticos do MongoDB (via NestJS ou acesso direto) para fornecer contexto ao Gemini.
  * Funcionalidade: Utiliza a API do **Google Gemini** para gerar respostas e *insights* em tempo real com base no contexto dos logs de clima.


### <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWN1YmhhOG5qamp0anBhcThvcHkydGpvNTloMDZrbzlleTkyZW96MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/SFyIZ3qHSCA9EueRrj/giphy.gif" alt="class" width="25" height="25" />  Frontend & Dashboard (frontend-project)
A interface do usuário, focada em visualização e interação.

* Dashboard de Clima:
  * Funcionalidade: Exibição gráfica de dados climáticos da minha localização (Toritama) recentes, históricos e insights através de KPIs e gráficos.
  * Funcionalidade: Filtros e paginação para navegar pelos logs climáticos.

* Página de Perfil:
  * Funcionalidade: Página para o usuário logado gerenciar suas informações de cadastro, como edição e deleção dos próprios dados (do perfil).

* Página de Explorar:
 * Funcionalidade: Chama a API do backend de dados externos (pokemon) e renderiza uma lista com os Pokémon e dados detalhados deles..

* Página de Chat IA:
  * Funcionalidade: Chat interativo que traz informações relevantes conforme as perguntas enviadas pelo usuário e de acordo com os logs de clima do banco.


## <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmNtdHd0a2F4ZWMyejF4bWxuMXV2OWp0ank2Y3Z4ZGRlbnhwcDNtcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/mmpkmOp2fA84o/giphy.gif" alt="class" width="35" height="35" /> Visualização da Plataforma

![plataforma](readme/plataforma.gif)

##  <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzI2ZjA5bnA2dXVmejNlMGRkM2QwZGNtcGF4dm9jczFuN2d5amE5cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/LoNV9fDvRFTDZC9znd/giphy.gif" alt="class" width="35" height="35" /> Orientações para Análise e Insights (Dashboard)

A seção de Insights do Climate Brain foi projetada para apoiar a análise exploratória dos dados climáticos. Em vez de apresentar conclusões estáticas, esta seção orienta o usuário sobre como interpretar as tendências e correlações nos gráficos.

### <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWJia2Ztbm5iczRtYWE3c2lpMXA2cm5wYnkyemoxYzIzNTd6MXZlYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/l17KV1N4q7PjzYkfsg/giphy.gif" alt="class" width="25" height="25" />  Análise da Estabilidade e Variação
Esta análise é crucial para entender a dinâmica do clima no período registrado:
* Gráficos de Linha do Tempo (Temperatura, Umidade, Vento): Observe a inclinação das curvas.
  * Tendência Plana (Flatlining): Indica extrema estabilidade nos dados. Se a temperatura e o vento estiverem estáticos, o ambiente não está sujeito a mudanças rápidas.
  * Flutuação: Grandes variações (picos e vales) em curtos períodos sugerem instabilidade ou a influência de eventos climáticos localizados.
* Extremos Meteorológicos: A comparação entre valores Máximos e Mínimos indica a amplitude da variação. Uma diferença pequena sinaliza alta estabilidade; uma diferença grande aponta para mudanças bruscas no ambiente (ex.: queda rápida de temperatura).

### <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWJia2Ztbm5iczRtYWE3c2lpMXA2cm5wYnkyemoxYzIzNTd6MXZlYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/l17KV1N4q7PjzYkfsg/giphy.gif" alt="class" width="25" height="25" />  Análise de Correlação (Temp vs Umidade)
O gráfico de Correlação entre Temperatura e Umidade é vital para identificar padrões de conforto térmico e potencial de precipitação:
* Padrão Incomum (Clima Seco): Identificar pontos com Temperatura Alta  e Umidade Baixa:
  * Insight Analítico: Isso sugere condições de stress hídrico e ar seco, que podem ser prejudiciais à saúde ou indicar condições de seca persistente, mesmo que haja nebulosidade ("overcast clouds"), como observado nos logs.
* Relação Clássica (Clima Úmido): Baixa temperatura e alta umidade podem indicar proximidade de chuvas ou neblina.
  * Insight Analítico: Use o gráfico de correlação para identificar se a umidade alta coincide com a temperatura mais amena.
 
### <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWJia2Ztbm5iczRtYWE3c2lpMXA2cm5wYnkyemoxYzIzNTd6MXZlYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/l17KV1N4q7PjzYkfsg/giphy.gif" alt="class" width="25" height="25" /> Análise da Distribuição de Condições
 
O gráfico de Distribuição de Condições Climáticas é essencial para entender a condição de tempo dominante:
* Dominância de uma Condição: Se 100% dos logs apontam para "overcast clouds" (nuvens encobertas) em um dia com umidade crítica, o insight é que a nebulosidade não está mitigando a baixa umidade.
  * Ação: Isso levanta a questão se a baixa umidade é causada por fatores geográficos (vento forte, baixa precipitação histórica) e se a previsão de chuva é baixa, apesar das nuvens.
* Variedade de Condições: A presença de múltiplas condições (sol, chuva, névoa) em um curto período sugere instabilidade atmosférica.


## <img src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MG92ZGV3b29seGViYWMzaXNncGwxNnhmYzlpcTVjaGxpNXZxemJ6eiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/209EXKSzNdqD77AatR/giphy.gif" alt="class" width="35" height="35" /> Estrutura do Banco de Dados

A persistência do projeto é feita utilizando MongoDB em conjunto com Mongoose no backend NestJS. As tabelas a seguir representam os principais schemas e coleções de dados da aplicação.

### <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTh4bDJ5bDc1a2tqcnFkdHJiNXVvN2tkYjBsaWVhbmwzdzVzdTV6cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/PtgBUWepLWMHqGsApe/giphy.gif" alt="class" width="25" height="25" />  Entidade: Usuário (users)


| Campo       | Tipo              | Descrição                                         |
| ----------- | ----------------- | ------------------------------------------------- |
| `_id`       | String (ObjectId) | ID único do usuário                               |
| `name`      | String            | Nome completo do usuário **(obrigatório)**        |
| `email`     | String            | E-mail único do usuário (login) **(obrigatório)** |
| `password`  | String            | Senha criptografada com hash **(obrigatório)**    |
| `isActive`  | Boolean           | Status de atividade do usuário (padrão: true)     |
| `createdAt` | Date              | Data de criação do registro                       |
| `updatedAt` | Date              | Data da última atualização                        |

### <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTh4bDJ5bDc1a2tqcnFkdHJiNXVvN2tkYjBsaWVhbmwzdzVzdTV6cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/PtgBUWepLWMHqGsApe/giphy.gif" alt="class" width="25" height="25" /> Entidade: Log Climático (weather_logs)
Esta coleção é o coração da aplicação, armazenando os dados coletados pelo collector e processados pelo worker-go.

| Campo                  | Tipo   | Descrição                                            |
| ---------------------- | ------ | ---------------------------------------------------- |
| `city`                 | String | Nome da cidade onde o dado foi coletado *(indexado)* |
| `temperatureCelsius`   | Number | Temperatura registrada em graus Celsius              |
| `humidityPercent`      | Number | Umidade relativa do ar (%)                           |
| `timestamp`            | Date   | Data e hora exata da coleta *(indexado)*             |
| `windSpeedMS`          | Number | Velocidade do vento (m/s)                            |
| `conditionDescription` | String | Descrição da condição climática (ex: “Céu limpo”)    |
| `createdAt`            | Date   | Data de inserção do log                              |


### <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTh4bDJ5bDc1a2tqcnFkdHJiNXVvN2tkYjBsaWVhbmwzdzVzdTV6cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/PtgBUWepLWMHqGsApe/giphy.gif" alt="class" width="25" height="25" /> Módulo de Integração Externa: Pokemon (PokéAPI)
Este módulo não armazena dados em uma coleção interna, mas sim normaliza a resposta da API pública para uso do frontend. A tabela a seguir descreve a estrutura dos dados normalizados recebidos e utilizados pelo frontend (via NormalizedPokemonDetails).

| Campo       | Tipo     | Descrição                                               |
| ----------- | -------- | ------------------------------------------------------- |
| `id`        | Number   | ID oficial do Pokémon                                   |
| `name`      | String   | Nome do Pokémon                                         |
| `height`    | Number   | Altura (decímetros)                                     |
| `weight`    | Number   | Peso (hectogramas)                                      |
| `types`     | String[] | Array de tipos elementais                               |
| `abilities` | String[] | Habilidades                                             |
| `spriteUrl` | String   | URL da imagem padrão                                    |
| `stats`     | Object[] | Estatísticas base (ex: `{ name: 'hp', base_stat: 45 }`) |

 
## <img src="https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUyZnVscGxwcWdweGdrZ2pwbWM2aHl0OW4xczlwcG5sMDZyemI2OWMwOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/l378zKVk7Eh3yHoJi/giphy.gif" alt="class" width="35" height="35" />  Como Executar o Projeto

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
   - A API do meu Gemini pode não está mais funcionando, por ter exposto a chave publicamente ao subir aqui no readme para que outros possam testar e como medida de segurança, foi suspensa, mesmo sabendo que não posso subir esse tipo de informação, só subir para que quem for avaliar posso rodar na própria máquina, mas pode pegar sua chave de API gratuita para substituir no .env e testar pelo seguinte [link](https://aistudio.google.com/app/api-keys).
   - Exemplo (raiz do projeto):
     ```bash
     
          # Configurações de API de Clima
          WEATHER_API_KEY=fe63c67d0813ed1c54564caf75149e1a
          WEATHER_API_URL=http://nestjs-api:4000/weather/logs
          CITY_NAME=Toritama
          
          # Configurações de IA (Gemini & AI-Service)
          GEMINI_API_KEY=AIzaSyD7ctMN7zFeP9d7DWiEazWdUYwfThnwOM4
          GEMINI_MODEL=gemini-1.5-flash
          AI_SERVICE_URL=http://ai-service:8000/api/v1/ingest
          
          # Configurações de Banco de Dados (MongoDB)
          MONGO_ROOT_USER=root
          MONGO_ROOT_PASSWORD=senha123
          MONGO_DB=weatherdb
          MONGO_URI=mongodb://mongodb:27017/weatherdb
          
          # Autenticação / Segurança
          JWT_SECRET=dfd54564f4fr4f4sd54f53sd4f489
          ADMIN_EMAIL=admin@example.com
          ADMIN_PASSWORD=123456
          
          # ache / Mensageria (Redis)
          REDIS_HOST=redis
          REDIS_PORT=6379
          
          # Configurações do Servidor
          PORT=4000
          NODE_ENV=production

     
     ```

3. **Subir os serviços com Docker Compose (o frontend será rodado localmente no próximo passo)**
   - Na raiz do projeto, execute:
     ```bash
     docker-compose up --build -d
     ```
   - O parâmetro `--build` reconstrói as imagens com o código atual.
   - O parâmetro `-d` executa os contêineres em background.

4. **Verificar o status**
   - Use `docker-compose ps` para garantir que todos os serviços (mongo, rabbitmq, backend, worker, collector, frontend) estejam `Up`.

5. **Instalar e Executar o Frontend Localmente (Desenvolvimento)**
  - Entre na pasta, execute:
     ```bash
     cd frontend-project
     ```
  - Instale as Dependências, execute:
     ```bash
     npm install
     ```
  - Rodar o Projeto, execute:
     ```bash
     npm run dev
     ```
  
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
  - URL base: http://localhost:4000 (ou porta configurada em `API_PORT`).
  - Swagger/Documentação: http://localhost:4000/api/docs (se habilitado).

- **Fast API Python**

  - URL base: http://localhost:8000 (ou porta configurada em `API_PORT`).
  - Swagger/Documentação: http://localhost:8000/docs (se habilitado).

### <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzVmMXo3b3lhYW5tc2RybXAxZmh0NWxqMWowcnBuZG5ueWUwNG52cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/rgmUYLyvByaO7OfhI3/giphy.gif" alt="class" width="25" height="25" /> Boas práticas

- Sempre atualize as variáveis de ambiente antes de subir novos contêineres.
- Use `docker-compose logs -f <servico>` para depurar problemas específicos.
- Execute `docker-compose down` ao final do dia para liberar recursos da máquina, se necessário.

## <img src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MG92ZGV3b29seGViYWMzaXNncGwxNnhmYzlpcTVjaGxpNXZxemJ6eiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/209EXKSzNdqD77AatR/giphy.gif" alt="class" width="35" height="35" /> Testando as Rotas da API

### <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzlneGM1YjJ1ZXE3MHUxZXI2ZTFoYmxqdWJiNDQ3M21mdW4zaWFyYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/7cHN73YZtel3gfod6Z/giphy.gif" alt="class" width="25" height="25" /> Tabela de Endpoints da API (NestJS))

* Para testar os endpoints do backend NestJS, utilize ferramentas como Postman ou Insomnia. O backend geralmente está disponível em http://localhost:4000 (ou a porta configurada no seu .env).
* Dica: A maioria das rotas requer autenticação. Comece sempre pelas rotas de Auth para obter seu token JWT.

| Entidade      | Método | Rota Base | Rota Completa                   | Descrição                                               |
| ------------- | ------ | --------- | ------------------------------- | ------------------------------------------------------- |
| **Auth**  ❌   | POST   | /auth     | /auth/login                     | Realiza o login e retorna o token JWT                   |
| **Users** ❌   | POST   | /users    | /users                          | Cria um novo usuário (rota pública)                     |
| **Users** ✅   | GET    | /users    | /users                          | Lista todos os usuários (paginação via `?page=&limit=`) |
| **Users** ✅   | GET    | /users    | /users/:id                      | Busca um usuário por ID                                 |
| **Users** ✅   | PATCH  | /users    | /users/:id                      | Atualiza campos de um usuário                           |
| **Users** ✅   | DELETE | /users    | /users/:id                      | Remove um usuário por ID                                |
| **Weather** ✅ | POST   | /weather  | /weather/logs                   | Registra um novo log climático                          |
| **Weather** ✅ | GET    | /weather  | /weather/logs                   | Obtém logs com paginação (`?page=&limit=`)              |
| **Weather** ✅ | GET    | /weather  | /weather/export.csv             | Exporta logs em CSV                                     |
| **Weather** ✅ | GET    | /weather  | /weather/export.xlsx            | Exporta logs em XLSX                                    |
| **Weather** ✅ | GET    | /weather  | /weather/chart/temperature      | Linha do tempo da temperatura                           |
| **Weather** ✅ | GET    | /weather  | /weather/chart/humidity         | Linha do tempo da umidade                               |
| **Weather** ✅ | GET    | /weather  | /weather/chart/temp-vs-humidity | Dados para gráfico de dispersão                         |
| **Pokemon** ✅ | GET    | /pokemon  | /pokemon/list                   | Lista de Pokémons (paginação)                           |
| **Pokemon** ✅ | GET    | /pokemon  | /pokemon/:nameOrId              | Detalhes de um Pokémon por nome ou ID                   |

1. Guia de Autenticação (JWT)

| Legenda | Descrição                                                               |
| ------- | ----------------------------------------------------------------------- |
| ✅       | Requer Token JWT. Use no header:<br>`Authorization: Bearer <seu_token>` |
| ❌       | Rota pública. Não requer autenticação.                                  |

2. Passos para Teste:
* Registro: Envie um POST para http://localhost:4000/users (rota pública) com name, email e password.
* Login: Use o novo e-mail e senha em um POST para http://localhost:4000/auth/login. Salve o token JWT retornado.
* Acesso Protegido: Utilize o token salvo no Header de todas as demais rotas para acessar os dados.

### <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzlneGM1YjJ1ZXE3MHUxZXI2ZTFoYmxqdWJiNDQ3M21mdW4zaWFyYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/7cHN73YZtel3gfod6Z/giphy.gif" alt="class" width="25" height="25" />  Serviço Dedicado: AI Service (FastAPI)
* Este serviço está separado do NestJS e é o responsável pela lógica do Chat IA. O serviço base é http://localhost:8000 (ou a porta configurada).
* Observação importante:
  * Todas as rotas abaixo estão públicas (❌).
  * No ideal, essas rotas deveriam ser privadas e consumidas pelo backend NestJS, utilizando a estrutura centralizada de autenticação JWT já existente.
Devido ao pouco tempo de desenvolvimento, essa integração ainda não foi implementada, por isso as rotas seguem públicas.

| Entidade | Método | Rota Base | Rota Completa   | Descrição                                                                                |
| -------- | ------ | --------- | --------------- | ---------------------------------------------------------------------------------------- |
| **AI** ❌ | POST   | /         | /api/v1/ingest         | Recebe logs climáticos enviados automaticamente pelo Worker Go (rota pública temporária) |
| **AI** ❌ | POST   | /         | /api/v1/chat           | Envia uma pergunta ao Chat IA, que responde com base nos dados climáticos armazenados    |
| **AI** ❌ | GET    | /         | /api/v1/weather/latest | Retorna o último registro climático salvo e o status do serviço                          |
| **AI** ❌ | GET    | /         | /api/v1/health         | Endpoint de verificação de saúde do serviço (healthcheck)                                |

1. Observação sobre Autenticação:

| Legenda | Descrição                                          |
| ------- | -------------------------------------------------- |
| ❌       | **Rota pública**. Atualmente não requer token JWT. |

2. Nota para desenvolvimento futuro:
* Estas rotas do AI Service deveriam ser privadas, atendidas apenas via requisições internas do backend NestJS, onde já existe todo o sistema de autenticação JWT estruturado.
Assim, o NestJS faria a ponte entre o frontend e o AI Service, mantendo segurança e centralizando o fluxo de autenticação.
Por falta de tempo, este refinamento ainda não foi implementado.



## <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGw4eDUzd3dybzhnY3Q3bG1md243ZmtsM2R0M2hwN3lsc3I1bTlmbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/KhdHwaqRgo8JB3omMg/giphy.gif" alt="class" width="35" height="35" /> Estrutura do Repositório

```
DESAFIO-GDASH-2025-02/

│
├── ai-service/                      # NOVO: Serviço de Chat IA (FastAPI/Python)
│ ├── app/
│ │ ├── gemini.py                    # Lógica de conexão e chamada da API do Gemini
│ │ ├── models.py                    # Definição de modelos de dados (ex: Pydantic)
│ │ └── router.py                    # Roteamento do FastAPI (Endpoint /chat)
│ ├── .env                           # Variáveis de ambiente (AI_API_KEY, etc.)
│ ├── Dockerfile                     # Instruções para construir a imagem Docker
│ ├── main.py                        # Ponto de entrada do FastAPI
│ └── requirements.txt               # Dependências Python (fastapi, google-genai, uvicorn)
|
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

## <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHZxNm5zdGlqMzEzNWNoc3lxaThmb202YnZvZWVpeGVnYW8wODZqciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3ohhwApOcJ6sh2VT7W/giphy.gif" alt="class" width="35" height="35" /> Conclusão

O Climate Brain demonstrou proficiência na implementação de uma arquitetura de microsserviços heterogêneos totalmente conteinerizada pelo Docker Compose.
Os principais desenvolvimentos envolveram:
1. Integração de Linguagens: Orquestração bem-sucedida de serviços em NestJS (API Core), Go (Worker Assíncrono) e Python (Coletor e Serviço de IA), provando o domínio em ambientes polyglot.
2. Fluxo de Dados Assíncrono: Uso do Redis para desacoplar a ingestão de dados, garantindo resiliência e processamento eficiente em background pelo Worker em Go.
3. Desenvolvimento de Frontend Moderno: Construção de uma Single-Page Application (SPA) com Next.js/React, aplicando boas práticas de UI/UX e utilizando bibliotecas profissionais como Tailwind CSS/shadcn/ui para criar um Dashboard interativo e páginas responsivas.
4. Integração de IA e LLMs: Criação de um serviço de IA (FastAPI/Python) que utiliza o Google Gemini para transformar logs do MongoDB em análises e respostas interativas via Chat IA.
5. Backend Robusto: Desenvolvimento de uma API com NestJS/MongoDB que gerencia autenticação JWT, CRUD e funcionalidades avançadas de manipulação e exportação de dados (CSV/XLSX).

Este projeto atesta a capacidade de construir sistemas escaláveis, resilientes e com funcionalidades inteligentes, entregando uma solução de ponta a ponta com alta qualidade técnica em todas as camadas.

## <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2Y2eXRyODd2eTJybnBxaGtnM2VsOGpvZDJqcHB6dW81ZXRuN3RpNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/jqqamef1hDwEDdfzNQ/giphy.gif" alt="class" width="35" height="35" /> Agradecimento
Agradeço imensamente a atenção e o interesse em acompanhar o projeto Climate Brain. Este trabalho é fruto de dedicação contínua e aprendizado prático em arquitetura de microsserviços e integração de IA, e representa mais do que uma aplicação funcional — é um passo concreto na jornada de evolução como desenvolvedor full-stack.

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:00777F,100:00777F&height=115&section=footer&text=✨Mesmo%20sob%20forte%20turbul%C3%AAncia,%20a%20arquitetura%20se%20mant%C3%A9m%20est%C3%A1vel.%20Agrade%C3%A7o%20a%20chance%20de%20construir%20este%20ecossistema!✨&fontSize=14&textColor=ffffff&fontAlign=center&fontAlignY=middle"/>
