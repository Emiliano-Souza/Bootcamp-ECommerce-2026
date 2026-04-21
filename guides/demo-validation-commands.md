# Demo Validation Commands

Comandos finais para validar o ambiente antes da apresentacao.

## 1. Adobe Commerce

Retorna o JSON do catalogo Bootcamp:

```bash
curl -s http://magento2.docker/rest/V1/bootcamp/catalog/products
```

Conta quantos produtos vieram:

```powershell
(Invoke-RestMethod "http://magento2.docker/rest/V1/bootcamp/catalog/products").Count
```

Checagem rapida de status:

```bash
curl -s -o /dev/null -w "%{http_code}" http://magento2.docker/rest/V1/bootcamp/catalog/products
```

Esperado:

- `200`
- `6` produtos

## 2. AEM GraphQL

No `author`, o endpoint GraphQL exige `Authorization`, `Referer` e `CSRF-Token`.

Consulta completa em PowerShell:

```powershell
$auth = "Basic YWRtaW46YWRtaW4="
$baseHeaders = @{
  Authorization = $auth
  Referer = "http://localhost:4502/"
}

$token = (
  Invoke-RestMethod `
    -Method Get `
    -Uri "http://localhost:4502/libs/granite/csrf/token.json" `
    -Headers $baseHeaders
).token

$headers = @{
  Authorization = $auth
  Referer = "http://localhost:4502/"
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
  -Uri "http://localhost:4502/content/cq:graphql/bootcamp-emiliano/endpoint.json" `
  -Headers $headers `
  -Body $body
```

Filtro por destaque:

```powershell
$auth = "Basic YWRtaW46YWRtaW4="
$baseHeaders = @{
  Authorization = $auth
  Referer = "http://localhost:4502/"
}

$token = (
  Invoke-RestMethod `
    -Method Get `
    -Uri "http://localhost:4502/libs/granite/csrf/token.json" `
    -Headers $baseHeaders
).token

$headers = @{
  Authorization = $auth
  Referer = "http://localhost:4502/"
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
  -Uri "http://localhost:4502/content/cq:graphql/bootcamp-emiliano/endpoint.json" `
  -Headers $headers `
  -Body $body

$response.data.produtoDestaqueList.items
$response.data.produtoDestaqueList.items.Count
```

Esperado:

- Query geral retorna `6` items
- Filtro por destaque retorna `4` items

## 3. Hydrogen

Checagem da home:

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/
```

Checagem da pagina About:

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/about
```

Checagem do Dashboard:

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/dashboard
```

Validacao rapida do dashboard no PowerShell:

```powershell
(Invoke-WebRequest -UseBasicParsing "http://localhost:3000/dashboard").Content
```

Procure no HTML:

- `Adobe Commerce`
- `Adobe Experience Manager`
- `Shopify`
- `dashboard-status--ok`

## 4. Roteiro Rapido

Ordem sugerida para a demo:

1. Commerce Admin e API REST
2. AEM Author com Content Fragments
3. AEM query GraphQL
4. Hydrogen `/about`
5. Hydrogen `/dashboard`

## 5. Resultado Esperado Final

- Commerce REST: `200`
- AEM GraphQL: `6` items
- AEM destaque: `4` items
- Hydrogen `/`: `200`
- Hydrogen `/about`: `200`
- Hydrogen `/dashboard`: `200`
- Dashboard com `3 plataformas ok`
