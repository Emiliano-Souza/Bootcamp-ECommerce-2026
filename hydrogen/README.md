# Hydrogen Storefront

Aplicação headless do projeto, construída com Shopify Hydrogen e usada como camada principal de apresentação da solução.

## Responsabilidades

O storefront concentra:

- navegação principal da experiência
- integração com Adobe Commerce via REST
- integração com AEM via GraphQL
- consumo da Shopify Storefront API
- páginas de validação e dashboard da entrega

## Rotas Principais

- `/`: home do storefront
- `/commerce`: validação da integração com Adobe Commerce
- `/about`: validação da integração com AEM GraphQL
- `/dashboard`: visão consolidada das integrações

## Desenvolvimento Local

```bash
npm install
npm run dev
```

## Validação

```bash
npm run lint
npm run typecheck
npm run build
```

## Estrutura Relevante

- `app/`: rotas, componentes e lógica do storefront
- `guides/`: documentação operacional e arquitetural
- `public/`: arquivos públicos

## Documentação Relacionada

- [Índice dos Guias](guides/README.md)
- [Arquitetura do Projeto](guides/project-architecture.md)
- [Setup e Execução](guides/setup-and-run.md)
- [Comandos de Validação](guides/demo-validation-commands.md)
