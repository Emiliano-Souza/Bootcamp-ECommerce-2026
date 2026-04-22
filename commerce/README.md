# Commerce Customizations

Esta pasta reúne exclusivamente o código autoral do Adobe Commerce utilizado no projeto.

## Escopo

Os módulos versionados aqui são:

- `Bootcamp/HelloWorld`
  Módulo inicial de apoio usado durante a evolução do bootcamp.
- `Bootcamp/CatalogApi`
  Expõe o endpoint REST customizado consumido pelo storefront Hydrogen.
- `Bootcamp/AemContent`
  Faz a ponte entre conteúdo do AEM e a experiência renderizada no Commerce.

## Estrutura

```text
commerce/
`-- app/
    `-- code/
        `-- Bootcamp/
            |-- AemContent/
            |-- CatalogApi/
            `-- HelloWorld/
```

## O Que Este Diretório Não Inclui

Para manter o repositório enxuto e publicável, não estão versionados aqui:

- instalação completa do Magento
- `vendor/`
- `generated/`
- `var/`
- configuração local da instância
- arquivos sensíveis como `auth.json` e `app/etc/env.php`

## Uso Esperado

Esta pasta deve ser tratada como fonte das customizações. Para executar a solução em um ambiente Commerce real, os módulos precisam ser colocados dentro de uma instância Adobe Commerce local ou em container.
