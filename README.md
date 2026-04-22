# Bootcamp Emiliano

Monorepo do projeto final do bootcamp com as tres frentes de codigo-fonte versionadas em um unico repositorio:

- `hydrogen/`: storefront headless em Shopify Hydrogen
- `aem/`: projeto Adobe Experience Manager baseado em Maven
- `commerce/`: customizacoes Adobe Commerce/Magento do projeto

## Estrutura

```text
.
|-- aem/
|-- commerce/
|   `-- app/code/Bootcamp/
`-- hydrogen/
```

## O que entra neste repositorio

- codigo-fonte do storefront Hydrogen
- codigo-fonte AEM com modulos `all`, `core`, `ui.apps`, `ui.content`, `ui.config`, `ui.apps.structure`, `ui.frontend`, `dispatcher`, `it.tests` e `ui.tests`
- modulos customizados do Commerce em `commerce/app/code/Bootcamp`
- documentacao e materiais operacionais do projeto

## O que nao entra

- runtimes locais do AEM como `crx-quickstart`
- instalacao completa do Adobe Commerce
- `node_modules`, `dist`, `target`, caches e logs
- arquivos de ambiente e credenciais locais

## Subprojetos

### Hydrogen

Diretorio: `hydrogen/`

Comandos principais:

```bash
cd hydrogen
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

Mais detalhes em [hydrogen/README.md](hydrogen/README.md).

### AEM

Diretorio: `aem/`

Comandos comuns:

```bash
cd aem
mvn clean install
mvn -PautoInstallPackage clean install
```

### Commerce

Diretorio: `commerce/`

Este repositorio guarda apenas os modulos customizados:

- `Bootcamp/HelloWorld`
- `Bootcamp/CatalogApi`
- `Bootcamp/AemContent`

Mais detalhes em [commerce/README.md](commerce/README.md).

## Integracoes principais

- Adobe Commerce -> Hydrogen via endpoint REST customizado
- AEM -> Hydrogen via GraphQL
- AEM -> Commerce via banner/endpoint customizado
- Shopify Storefront API -> Hydrogen para produtos, colecoes e metafields

## Observacao

Se o objetivo for apresentar ou publicar o projeto como portifolio, este formato em mono-repo representa melhor a entrega completa do que manter apenas o storefront.
