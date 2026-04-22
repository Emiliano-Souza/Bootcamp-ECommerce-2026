# Estratégia de Repositório Público

## Situação real do projeto

O projeto completo não vive em uma única pasta.

Partes identificadas:

- Hydrogen e documentação neste repositório
- código-fonte AEM em `C:\Users\emili\bootcamp-emiliano`
- código-fonte Commerce em `\\wsl.localhost\Ubuntu\home\emiliano\project-community-edition`
- runtimes AEM em `crx-quickstart` e `crx-quickstart-publish`

## Recomendação

Use um modelo com 3 repositórios:

1. `bootcamp-emiliano-storefront`
   Hydrogen + documentação consolidada
2. `bootcamp-emiliano-aem`
   código-fonte do projeto AEM
3. `bootcamp-emiliano-commerce`
   customizações do Adobe Commerce

## Se quiser apenas um repositório público por agora

Use este repositório como hub principal e documente claramente:

- o que está incluído
- o que está fora
- onde cada parte do sistema roda
- como reproduzir o ambiente

## O que não deve entrar no Git

- `node_modules`
- `.env`
- logs temporários
- `crx-quickstart`
- `crx-quickstart-publish`
- caches e builds locais

