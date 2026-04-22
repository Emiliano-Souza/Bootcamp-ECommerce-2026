# Demo Validation Commands

Comandos de apoio para validar o ambiente antes de apresentar o projeto.

## Observação Importante

Os exemplos abaixo usam URLs e fluxos de autenticação de ambiente local. Caso seu setup use credenciais, hosts ou portas diferentes, ajuste os comandos conforme a sua configuração.

Para evitar versionar segredos no repositório, prefira definir variáveis locais no terminal antes de executar chamadas autenticadas.

## 1. Adobe Commerce

Retorna o JSON do catálogo Bootcamp:

```bash
curl -s http://magento2.docker/rest/V1/bootcamp/catalog/products
```

Conta quantos produtos vieram:

```powershell
(Invoke-RestMethod "http://magento2.docker/rest/V1/bootcamp/catalog/products").Count
```

Checagem rápida de status:

```bash
curl -s -o /dev/null -w "%{http_code}" http://magento2.docker/rest/V1/bootcamp/catalog/products
```

Esperado:

- `200`
- `6` produtos

## 2. AEM GraphQL

No `author`, o endpoint GraphQL exige `Authorization`, `Referer` e `CSRF-Token`.

Antes de rodar os exemplos abaixo, defina a variável de ambiente local:

```powershell
$env:AEM_BASIC_AUTH = "Basic <sua-credencial-em-base64>"
```

Consulta completa em PowerShell:

```powershell
$auth = $env:AEM_BASIC_AUTH
$authorUrl = "http://localhost:4502"
$baseHeaders = @{
  Authorization = $auth
  Referer = "$authorUrl/"
}

$token = (
  Invoke-RestMethod `
    -Method Get `
    -Uri "$authorUrl/libs/granite/csrf/token.json" `
    -Headers $baseHeaders
).token

$headers = @{
  Authorization = $auth
  Referer = "$authorUrl/"
  "CSRF-Token" = $token
  "Content-Type" = "application/json"
}

$body = @'
{
  "query": "{ produtodestaqueList { items { titulo preco categoria } } }"
}
'@

Invoke-RestMethod `
  -Method Post `
  -Uri "$authorUrl/content/cq:graphql/bootcamp-emiliano/endpoint.json" `
  -Headers $headers `
  -Body $body
```

Filtro por destaque:

```powershell
$auth = $env:AEM_BASIC_AUTH
$authorUrl = "http://localhost:4502"
$baseHeaders = @{
  Authorization = $auth
  Referer = "$authorUrl/"
}

$token = (
  Invoke-RestMethod `
    -Method Get `
    -Uri "$authorUrl/libs/granite/csrf/token.json" `
    -Headers $baseHeaders
).token

$headers = @{
  Authorization = $auth
  Referer = "$authorUrl/"
  "CSRF-Token" = $token
  "Content-Type" = "application/json"
}

$body = @'
{
  "query": "{ produtoDestaqueList: produtodestaqueList(filter: { destaque: { _expressions: [{ value: true }] } }) { items { titulo destaque preco categoria } } }"
}
'@

$response = Invoke-RestMethod `
  -Method Post `
  -Uri "$authorUrl/content/cq:graphql/bootcamp-emiliano/endpoint.json" `
  -Headers $headers `
  -Body $body

$response.data.produtoDestaqueList.items
$response.data.produtoDestaqueList.items.Count
```

Esperado:

- query geral retorna `6` itens
- filtro por destaque retorna `4` itens

## 3. Hydrogen

Checagem da home:

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/
```

Checagem da página About:

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/about
```

Checagem do Dashboard:

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/dashboard
```

Validação rápida do dashboard no PowerShell:

```powershell
(Invoke-WebRequest -UseBasicParsing "http://localhost:3000/dashboard").Content
```

Procure no HTML:

- `Adobe Commerce`
- `Adobe Experience Manager`
- `Shopify`
- `dashboard-status--ok`

## 4. Roteiro Rápido

Ordem sugerida para a demo:

1. Commerce Admin e API REST
2. AEM Author com Content Fragments
3. AEM query GraphQL
4. Hydrogen `/about`
5. Hydrogen `/dashboard`

## 5. Resultado Esperado Final

- Commerce REST: `200`
- AEM GraphQL: `6` itens
- AEM destaque: `4` itens
- Hydrogen `/`: `200`
- Hydrogen `/about`: `200`
- Hydrogen `/dashboard`: `200`
- dashboard com `3 plataformas ok`
