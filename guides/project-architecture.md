# Arquitetura do Projeto

## Visão geral

O projeto foi construído como uma solução composable de e-commerce e experiência digital.

Plataformas envolvidas:

- Adobe Commerce
- Adobe Experience Manager
- Shopify
- Shopify Hydrogen

## Fluxos principais

### 1. Adobe Commerce -> Hydrogen

Objetivo:

- expor o catálogo do Commerce via REST
- validar consumo desse catálogo no storefront Hydrogen

Endpoint:

- `http://magento2.docker/rest/V1/bootcamp/catalog/products`

Uso no projeto:

- rota `/commerce`
- rota `/dashboard`

### 2. AEM -> Hydrogen

Objetivo:

- expor produtos e conteúdo via AEM GraphQL
- renderizar esses dados no storefront headless

Endpoint:

- `http://localhost:4502/content/cq:graphql/bootcamp-emiliano/endpoint.json`

Uso no projeto:

- rota `/about`
- rota `/dashboard`

### 3. AEM -> Commerce

Objetivo:

- publicar conteúdo de experiência no Commerce
- exibir banner vindo do AEM na home do Commerce

Uso no projeto:

- homepage do Commerce
- validação visual em ambiente local

### 4. Shopify -> Hydrogen

Objetivo:

- usar Shopify como base do storefront headless
- consumir produtos, coleção em destaque e metafields

Uso no projeto:

- home `/`
- página de produto
- dashboard

## Camadas

### Storefront

- Hydrogen
- React Router
- componentes React
- estilos customizados em `app/styles/bootcamp.css`

### Conteúdo

- AEM Author
- AEM Publish
- Experience Fragments
- páginas AEM do site
- GraphQL para Content Fragments

### Catálogo

- Adobe Commerce via REST
- Shopify Storefront API

## Estrutura física local

- `C:\Users\emili\BOOTCAMP\bootcamp-emiliano`
  Hydrogen + documentação
- `C:\Users\emili\bootcamp-emiliano`
  código-fonte AEM
- `\\wsl.localhost\Ubuntu\home\emiliano\project-community-edition`
  código-fonte Adobe Commerce
- `C:\Users\emili\Downloads\crx-quickstart`
  AEM Author runtime
- `C:\Users\emili\Downloads\crx-quickstart-publish`
  AEM Publish runtime

## Páginas AEM de apoio criadas

- `Vitrine Bootcamp`
- `Loja Bootcamp`

Publish:

- `http://localhost:4503/content/bootcamp-emiliano/us/en/vitrine-bootcamp.html`
- `http://localhost:4503/content/bootcamp-emiliano/us/en/loja-bootcamp.html`

## Observações importantes

- O runtime do AEM não deve ser versionado
- O código do AEM precisa existir no Publish para o render funcionar
- O storefront Hydrogen é a parte mais portátil do projeto

