# Setup e Execução

## Objetivo

Este guia resume como executar as partes principais do projeto no formato atual do monorepo.

## 1. Hydrogen

Diretório:

- `hydrogen/`

Instalação:

```bash
npm install
```

Execução local:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Validação:

```bash
npm run lint
npm run typecheck
```

## 2. AEM

Diretório do código-fonte:

- `aem/`

Build do projeto:

```bash
mvn clean install
```

Deploy local no Author:

```bash
mvn -PautoInstallPackage clean install
```

Deploy local no Publish:

```bash
mvn -PautoInstallPackagePublish clean install
```

Runtimes locais esperados:

- Author: `http://localhost:4502`
- Publish: `http://localhost:4503`

Observação:

- as pastas `crx-quickstart` e `crx-quickstart-publish` são runtime local e não devem ser versionadas

## 3. Adobe Commerce

Diretório versionado neste monorepo:

- `commerce/app/code/Bootcamp`

Escopo:

- módulos customizados do projeto
- não inclui a instalação completa do Adobe Commerce

Endpoint validado:

- `http://magento2.docker/rest/V1/bootcamp/catalog/products`

## 4. URLs Úteis

Hydrogen:

- `http://localhost:3000/`
- `http://localhost:3000/commerce`
- `http://localhost:3000/about`
- `http://localhost:3000/dashboard`

AEM:

- `http://localhost:4502/content/bootcamp-emiliano/us/en/vitrine-bootcamp.html`
- `http://localhost:4502/content/bootcamp-emiliano/us/en/loja-bootcamp.html`
- `http://localhost:4503/content/bootcamp-emiliano/us/en/vitrine-bootcamp.html`
- `http://localhost:4503/content/bootcamp-emiliano/us/en/loja-bootcamp.html`

## 5. Validação da Entrega

Use os comandos documentados em:

- [Comandos de Validação da Demo](demo-validation-commands.md)
