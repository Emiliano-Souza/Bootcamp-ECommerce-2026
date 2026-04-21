# Bootcamp Emiliano

Projeto final público do bootcamp com integração entre quatro frentes:

- Shopify Hydrogen como storefront headless
- Adobe Commerce como catálogo via REST
- Adobe Experience Manager como camada de conteúdo e experiência
- Shopify Storefront API como origem de produtos e metafields do storefront

Este repositório é o hub principal do projeto. Ele contém o storefront Hydrogen, a documentação consolidada da solução e os guias operacionais usados para validar a entrega final.

## Demo rápida

Fluxos já validados no projeto:

- Adobe Commerce -> Hydrogen via endpoint REST
- AEM -> Hydrogen via GraphQL
- AEM -> Commerce via banner na home do Commerce
- AEM Author -> AEM Publish via replication agent
- Dashboard unificado no Hydrogen com status das três plataformas

Rotas principais do storefront:

- `/` Home do storefront Hydrogen
- `/commerce` Validação da integração com Adobe Commerce
- `/about` Validação da integração com AEM GraphQL
- `/dashboard` Visão consolidada das integrações

## Estrutura do projeto

Este projeto ficou distribuído entre mais de uma base local:

- `C:\Users\emili\BOOTCAMP\bootcamp-emiliano`
  Repositório principal do storefront Hydrogen e da documentação
- `C:\Users\emili\bootcamp-emiliano`
  Projeto-fonte do AEM com módulos `ui.apps`, `ui.content`, `ui.config`, `core` e `all`
- `\\wsl.localhost\Ubuntu\home\emiliano\project-community-edition`
  Projeto Adobe Commerce/Magento usado no bootcamp
- `C:\Users\emili\Downloads\crx-quickstart`
  Runtime local do AEM Author
- `C:\Users\emili\Downloads\crx-quickstart-publish`
  Runtime local do AEM Publish

Importante:

- As pastas `crx-quickstart` e `crx-quickstart-publish` são ambiente/runtime, não código-fonte para versionar
- O código-fonte do AEM e do Commerce não está integralmente dentro deste repositório
- Este repo documenta a arquitetura completa e centraliza a parte Hydrogen

## Tecnologias

- React
- React Router 7
- Shopify Hydrogen
- Shopify Storefront API
- TypeScript
- Vite
- Adobe Commerce REST
- Adobe Experience Manager GraphQL

## Como rodar o storefront

Pré-requisitos:

- Node.js 22 ou 24
- npm
- variáveis do Hydrogen configuradas no ambiente local
- AEM Author em `http://localhost:4502`
- Adobe Commerce acessível em `http://magento2.docker` ou `https://magento2.docker`

Instalação:

```bash
npm install
```

Desenvolvimento:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Checagens úteis:

```bash
npm run lint
npm run typecheck
```

## Documentação

Guias principais deste repositório:

- [Arquitetura do Projeto](guides/project-architecture.md)
- [Setup e Execução](guides/setup-and-run.md)
- [Checklist Final](guides/final-checklist.md)
- [Comandos de Validação da Demo](guides/demo-validation-commands.md)
- [Estratégia de Repositório Público](guides/repository-strategy.md)

## Integrações

### Adobe Commerce

O storefront consome o catálogo do Commerce via:

- `http://magento2.docker/rest/V1/bootcamp/catalog/products`
- `https://magento2.docker/rest/V1/bootcamp/catalog/products`

### Adobe Experience Manager

O storefront consome o AEM via GraphQL:

- `http://localhost:4502/content/cq:graphql/bootcamp-emiliano/endpoint.json`

Páginas AEM criadas e validadas:

- Author:
  - `http://localhost:4502/content/bootcamp-emiliano/us/en/vitrine-bootcamp.html`
  - `http://localhost:4502/content/bootcamp-emiliano/us/en/loja-bootcamp.html`
- Publish:
  - `http://localhost:4503/content/bootcamp-emiliano/us/en/vitrine-bootcamp.html`
  - `http://localhost:4503/content/bootcamp-emiliano/us/en/loja-bootcamp.html`

### Shopify

O storefront usa a Storefront API para:

- home do Hydrogen
- coleção em destaque
- produtos recomendados
- metafields como `tech_stack` e `highlight_badge`

## O que este repositório inclui

- storefront Hydrogen
- rotas customizadas de integração
- estilos e componentes da entrega do bootcamp
- documentação operacional e de apresentação

## O que este repositório não inclui integralmente

- runtime completo do AEM
- runtime completo do Adobe Commerce
- histórico Git isolado do projeto-fonte AEM
- histórico Git isolado do projeto-fonte Commerce

## Publicação pública recomendada

Se você quiser publicar o projeto como portfólio:

1. Use este repositório como hub principal
2. Publique também o projeto-fonte AEM em repositório separado
3. Publique o projeto-fonte Commerce em repositório separado
4. Linke tudo neste README

## Estado atual

Resumo do que foi validado:

- Commerce REST funcionando
- AEM GraphQL funcionando
- filtro de destaque no AEM retornando 4 itens
- Hydrogen `/about` funcionando
- Hydrogen `/dashboard` funcionando
- replication AEM Author -> Publish funcionando
- páginas AEM renderizando no Publish

## Próximos passos recomendados

- revisar variáveis e remover qualquer dado sensível antes do push
- publicar o projeto-fonte AEM em repositório dedicado
- publicar o projeto-fonte Commerce em repositório dedicado
- adicionar screenshots e diagrama de arquitetura

