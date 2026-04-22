# Arquitetura do Projeto

## Visão Geral

O projeto foi estruturado como uma solução composable de e-commerce e experiência digital, distribuída entre três camadas principais:

- storefront headless com Shopify Hydrogen
- catálogo e APIs customizadas em Adobe Commerce
- conteúdo, páginas e experiência em Adobe Experience Manager

## Plataformas Envolvidas

- Shopify Hydrogen
- Shopify Storefront API
- Adobe Commerce
- Adobe Experience Manager

## Fluxos Principais

### 1. Adobe Commerce -> Hydrogen

Objetivo:

- expor o catálogo do Commerce por meio de uma API REST customizada
- validar esse consumo no storefront Hydrogen

Endpoint principal:

- `http://magento2.docker/rest/V1/bootcamp/catalog/products`

Uso no storefront:

- rota `/commerce`
- rota `/dashboard`

### 2. AEM -> Hydrogen

Objetivo:

- disponibilizar produtos e conteúdo via AEM GraphQL
- renderizar esse material no storefront headless

Endpoint principal:

- `http://localhost:4502/content/cq:graphql/bootcamp-emiliano/endpoint.json`

Uso no storefront:

- rota `/about`
- rota `/dashboard`

### 3. AEM -> Commerce

Objetivo:

- disponibilizar conteúdo de experiência dentro do Commerce
- exibir banner e conteúdo integrados ao ambiente da loja

Uso no projeto:

- homepage do Commerce em ambiente local
- validação visual da integração AEM + Commerce

### 4. Shopify -> Hydrogen

Objetivo:

- utilizar a Shopify Storefront API como base do storefront headless
- consumir produtos, coleção em destaque e metafields

Uso no storefront:

- home `/`
- página de produto
- dashboard

## Estrutura do Monorepo

- `hydrogen/`
  Storefront headless, documentação operacional e páginas de validação
- `aem/`
  Projeto AEM com módulos Maven, componentes, configuração e conteúdo
- `commerce/`
  Módulos customizados do Adobe Commerce

## Responsabilidades por Camada

### Storefront

- Hydrogen
- React Router
- componentes React
- estilos customizados em `hydrogen/app/styles/bootcamp.css`

### Conteúdo

- AEM Author
- AEM Publish
- Content Fragments
- Experience Fragments
- páginas e configuração do site

### Catálogo

- Adobe Commerce via endpoint REST customizado
- Shopify Storefront API para catálogo do storefront

## Observações

- o runtime do AEM não deve ser versionado
- o runtime completo do Commerce não faz parte deste repositório
- o monorepo foi desenhado para representar a entrega completa do projeto sem incluir instalações locais pesadas
