# Estratégia de Repositório

## Objetivo

Este documento registra a decisão de manter a solução em um único monorepo, sem versionar runtimes locais ou instalações completas de plataforma.

## Estratégia Adotada

O projeto foi consolidado em um único repositório com três áreas principais:

- `hydrogen/`
- `aem/`
- `commerce/`

Esse formato foi escolhido para:

- representar a entrega completa do bootcamp
- facilitar navegação e apresentação do projeto
- preservar o código-fonte principal em um só lugar
- evitar fragmentação excessiva para fins de portfólio

## O Que Está Dentro do Monorepo

- storefront Hydrogen
- projeto AEM com seus módulos principais
- módulos customizados do Adobe Commerce
- documentação de arquitetura, setup e validação

## O Que Fica Fora

- `node_modules`
- `dist`
- `target`
- logs temporários
- arquivos `.env`
- runtime AEM como `crx-quickstart`
- instalação completa do Adobe Commerce
- caches, builds e dados locais de ambiente

## Benefícios do Modelo Atual

- documentação centralizada
- visão completa da solução em um único lugar
- melhor leitura para recrutadores, avaliadores ou apresentação técnica
- separação clara entre código-fonte e infraestrutura local

## Observação

Mesmo em mono-repo, a execução completa da solução ainda depende de serviços locais externos, especialmente AEM Author/Publish e uma instância Adobe Commerce disponível no ambiente.
