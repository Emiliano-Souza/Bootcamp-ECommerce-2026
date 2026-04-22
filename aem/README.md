# AEM Project

Projeto Adobe Experience Manager da solução integrada do bootcamp.

## Objetivo

Este diretório concentra a camada de conteúdo e experiência do projeto, incluindo:

- componentes AEM
- configuração OSGi
- estrutura de páginas
- conteúdo inicial
- frontend associado ao projeto AEM
- dispatcher e testes

## Módulos

- `all`: pacote agregador da solução
- `core`: código Java, modelos, servlets, filtros e serviços
- `ui.apps`: componentes, clientlibs e estrutura de aplicação
- `ui.apps.structure`: estrutura base do projeto AEM
- `ui.config`: configurações OSGi por ambiente
- `ui.content`: conteúdo inicial e configuração do site
- `ui.frontend`: frontend e build de clientlibs
- `dispatcher`: configuração do dispatcher
- `it.tests`: testes de integração
- `ui.tests`: testes de interface

## Build

```bash
mvn clean install
```

## Deploy Local

Instalar pacote no Author:

```bash
mvn -PautoInstallPackage clean install
```

Instalar pacote no Publish:

```bash
mvn -PautoInstallPackagePublish clean install
```

## Observações

- o projeto assume AEM local em `localhost:4502` e `localhost:4503`
- runtimes como `crx-quickstart` não fazem parte deste repositório
- este diretório contém o código-fonte, não a instalação do AEM
