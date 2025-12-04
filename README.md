## Introdução do Projeto:
Este projeto é uma aplicação full-stack moderna desenvolvida como parte do Desafio G-DASH. Ele integra múltiplas linguagens de programação (TypeScript com NestJS e React, e Go), serviços (APIs, Workers, Bancos de Dados), e ferramentas de conteinerização (Docker Compose) para criar um sistema robusto de coleta, processamento, análise e visualização de dados climáticos.

A arquitetura do sistema é orientada a serviços, garantindo escalabilidade e separação de responsabilidades. Um ponto central é a integração de Inteligência Artificial (IA) para transformar dados brutos em insights acionáveis sobre o clima, elevando a aplicação de um simples dashboard para uma ferramenta de análise preditiva e informativa.

## Objetivo do Projeto:
O principal objetivo deste projeto é construir um sistema completo e resiliente que demonstre proficiência na integração de stacks tecnológicas diversas e modernas. Especificamente, o projeto visa:

* Coleta de Dados em Tempo Real: Estabelecer um serviço (collector em Python) para obter dados climáticos periódicos e reais de uma localização específica.
* Integração Assíncrona: Utilizar uma arquitetura de mensagens (via RabbitMQ/Redis) para garantir que a coleta e o processamento dos dados sejam desacoplados e resilientes, sendo processados por um Worker em Go.
* Desenvolvimento de API Robusta: Criar um backend (NestJS com MongoDB) que sirva como a fonte única de verdade para os dados climáticos e inclua funcionalidades essenciais, como CRUD de Usuários e Autenticação (Auth).
* Visualização Dinâmica: Desenvolver um frontend moderno (React + Vite + Tailwind + shadcn/ui) para exibir os dados coletados de forma clara e intuitiva em um Dashboard.
* Geração de Insights com IA: Implementar um módulo que utilize Inteligência Artificial para gerar análises e insights valiosos (ex.: tendências climáticas, alertas de eventos extremos) a partir dos dados armazenados.
* Gerenciamento de Dados: Incluir recursos de exportação de dados (CSV/XLSX) e, opcionalmente, integrar e exibir dados de uma API pública paginada (como a PokéAPI).

* Conteinerização Completa: Garantir que toda a aplicação, incluindo backend, frontend, worker, collector e banco de dados, possa ser inicializada de maneira consistente e rápida através de Docker Compose.
