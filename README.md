# Bootcamp E-Commerce 2026

Monorepo do projeto final do bootcamp, reunindo em um único repositório as três frentes principais da solução:

- `hydrogen/`: storefront headless construído com Shopify Hydrogen
- `aem/`: projeto Adobe Experience Manager com componentes, configuração e conteúdo
- `commerce/`: módulos customizados do Adobe Commerce/Magento

## Visão Geral

O projeto foi estruturado para demonstrar uma arquitetura composable de e-commerce, conectando:

- Shopify Storefront API como base do storefront headless
- Adobe Commerce como catálogo e API REST customizada
- Adobe Experience Manager como camada de conteúdo, páginas e experiência

Principais fluxos implementados:

- Adobe Commerce -> Hydrogen via endpoint REST customizado
- AEM -> Hydrogen via GraphQL
- AEM -> Commerce via módulo de conteúdo/banner
- Shopify -> Hydrogen via produtos, coleções e metafields

## Arquitetura da Solução

Em termos de arquitetura, o projeto foi desenhado para separar claramente as responsabilidades de catálogo, conteúdo e experiência:

- `Hydrogen` funciona como storefront headless e camada principal de apresentação
- `Shopify Storefront API` fornece dados nativos da loja, coleções, produtos e metafields
- `Adobe Commerce` concentra módulos customizados e um endpoint REST complementar de catálogo
- `Adobe Experience Manager` gerencia conteúdo, páginas e fragmentos distribuídos para os outros canais

Fluxo resumido:

```text
Shopify Storefront API ----\
                            \
                             > Hydrogen storefront
                            /
Adobe Commerce REST -------/

AEM GraphQL --------------> Hydrogen storefront
AEM content/banner -------> Adobe Commerce
```

Na prática, isso permite validar no mesmo projeto:

- um storefront headless integrado a múltiplas fontes de dados
- separação entre experiência editorial e catálogo
- reaproveitamento de conteúdo entre AEM, Commerce e storefront

## Responsabilidade de Cada Camada

### Hydrogen

- renderização da experiência principal
- rotas de integração e dashboard
- consumo de Storefront API, AEM GraphQL e Commerce REST

### AEM

- gestão de conteúdo e páginas
- Content Fragments e Experience Fragments
- configuração da experiência editorial e estrutura do site

### Commerce

- endpoint REST customizado do catálogo
- integração de banner/conteúdo vindo do AEM
- módulos customizados do projeto

## Estrutura do Repositório

```text
.
|-- aem/
|-- commerce/
|   `-- app/code/Bootcamp/
`-- hydrogen/
```

## Organização por Diretório

### `hydrogen/`

Aplicação principal do storefront headless. Contém:

- rotas customizadas de integração
- componentes React
- estilos do storefront
- documentação operacional da entrega

Veja mais em [hydrogen/README.md](hydrogen/README.md).

### `aem/`

Projeto AEM em estrutura Maven, incluindo:

- `core`
- `ui.apps`
- `ui.apps.structure`
- `ui.config`
- `ui.content`
- `ui.frontend`
- `dispatcher`
- `it.tests`
- `ui.tests`
- `all`

Veja mais em [aem/README.md](aem/README.md).

### `commerce/`

Escopo reduzido às customizações do projeto, mantendo apenas o código autoral do Adobe Commerce:

- `Bootcamp/HelloWorld`
- `Bootcamp/CatalogApi`
- `Bootcamp/AemContent`

Veja mais em [commerce/README.md](commerce/README.md).

## Como Navegar Pela Documentação

- Arquitetura da solução: [hydrogen/guides/project-architecture.md](hydrogen/guides/project-architecture.md)
- Setup do ambiente: [hydrogen/guides/setup-and-run.md](hydrogen/guides/setup-and-run.md)
- Checklist final: [hydrogen/guides/final-checklist.md](hydrogen/guides/final-checklist.md)
- Comandos de validação: [hydrogen/guides/demo-validation-commands.md](hydrogen/guides/demo-validation-commands.md)
- Índice dos guias do storefront: [hydrogen/guides/README.md](hydrogen/guides/README.md)

## O Que Está Versionado

- código-fonte do storefront Hydrogen
- código-fonte AEM do projeto
- módulos customizados do Adobe Commerce
- documentação de arquitetura, setup e validação

## O Que Não Está Versionado

- runtimes locais do AEM como `crx-quickstart`
- instalação completa do Adobe Commerce
- `node_modules`, `dist`, `target`, caches e logs
- arquivos locais de ambiente e credenciais

## Execução Rápida

### Hydrogen

```bash
cd hydrogen
npm install
npm run dev
```

### AEM

```bash
cd aem
mvn clean install
```

### Commerce

As customizações ficam em `commerce/app/code/Bootcamp` e devem ser copiadas ou integradas a uma instância Adobe Commerce local.

## Pré-Requisitos

Para reproduzir a solução completa, o ambiente esperado é:

- Node.js 22 ou 24 para o storefront Hydrogen
- Java 11+ e Maven para o projeto AEM
- instâncias locais do AEM Author e Publish
- instância local ou em container do Adobe Commerce
- variáveis e credenciais configuradas localmente fora do Git

## Limitações Deliberadas do Repositório

Este monorepo foi estruturado para versionar a solução sem carregar runtimes pesados ou arquivos sensíveis. Por isso:

- o runtime local do AEM não está incluído
- a instalação completa do Adobe Commerce não está incluída
- credenciais e configurações locais devem ser definidas no ambiente
- alguns fluxos dependem de serviços rodando localmente

## Objetivo do Repositório

Este repositório foi organizado para representar a entrega completa do projeto em formato de portfólio técnico, preservando apenas o código-fonte relevante e a documentação necessária para entender, executar e demonstrar a solução.
