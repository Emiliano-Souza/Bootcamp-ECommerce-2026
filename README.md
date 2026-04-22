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

## Objetivo do Repositório

Este repositório foi organizado para representar a entrega completa do projeto em formato de portfólio técnico, preservando apenas o código-fonte relevante e a documentação necessária para entender, executar e demonstrar a solução.
