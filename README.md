# Gabriela Simonelli — Advocacia e Consultoria Jurídica

Landing page institucional em HTML5, CSS3 e JavaScript puro (sem frameworks e sem backend).

## Estrutura

```
index.html
css/style.css
js/script.js
assets/          fotografias, favicon, imagem de compartilhamento
assets/marca/    monograma, assinatura e ícone, recortados da identidade oficial
```

> A pasta `apresentacao/` (PDF e DOCX de revisão enviados à advogada) fica fora do
> repositório por conter material interno — veja o `.gitignore`.

## Identidade visual

Os arquivos oficiais estão em `apresentacao/IDENTIDADE VISUAL GABRIELA SIMONELLI…`
(fora do repositório). O site segue o manual:

| | |
| --- | --- |
| Preto | `#080808` |
| Branco | `#ffffff` |
| Fonte principal | Cinzel — títulos, assinatura e numeração |
| Fonte secundária | Antipasto Pro — ver a observação abaixo |

> **Licença da fonte secundária.** Os arquivos da Antipasto Pro enviados pela
> designer são versões *trial*, licenciadas sob CC BY-NC: uso **não comercial**.
> Para um site de escritório é preciso comprar a licença web em
> [zetafonts.com/antipasto](https://www.zetafonts.com/antipasto). Até lá o texto
> corrido usa a **Jost** (Google Fonts, licença SIL OFL) — geométrica, mesma
> construção da Antipasto. Para trocar depois: hospede os arquivos da fonte,
> declare o `@font-face` e edite `--font-sans` no topo de `css/style.css`.

### Peças da marca

| Arquivo | Uso |
| --- | --- |
| `marca/monograma-preto.png` | monograma do cabeçalho, sobre fundo claro |
| `marca/monograma-branco.png` | monograma para fundos escuros |
| `marca/logo-preta.png` | assinatura completa, fundo claro |
| `marca/logo-branca.png` | assinatura completa do rodapé |
| `marca/icone-512.png` | 512×512, foto de perfil em redes sociais |
| `favicon-32.png` · `favicon-64.png` · `apple-touch-icon.png` | ícones |
| `og-image.jpg` | 1200×630, imagem de compartilhamento |

Todas são recortes diretos dos PNGs oficiais da designer — nada foi redesenhado.
No cabeçalho o nome é texto vivo em Cinzel, não imagem, para ficar nítido em
qualquer tela e legível por leitores de tela e buscadores.

## Como executar localmente

Basta abrir o `index.html` no navegador. Para um servidor local:

```bash
npx serve .
```

## Seções

Início · Posicionamento · Sobre · Áreas de Atuação · Diferenciais · Depoimentos ·
Dúvidas Frequentes · Chamada final · Contato

## Dados já preenchidos

OAB/PR 126.086 · WhatsApp e telefone (43) 99860-6421 · gsimonelli.adv@gmail.com ·
Rua Maria Lúcia da Paz, 550 — Edifício Quartier, Londrina/PR ·
[LinkedIn](https://www.linkedin.com/in/gabrielasimonelli-adv/) ·
atendimento de segunda a sexta das 8h30 às 18h e sábado das 8h30 às 12h,
presencial ou on-line.

O número do WhatsApp fica em `WHATSAPP_NUMBER` e o e-mail em `EMAIL_CONTATO`, no
topo de `js/script.js`. As mensagens pré-preenchidas ficam em `WHATSAPP_MESSAGES`
e são escolhidas pelo atributo `data-wa` de cada CTA (`consulta`, `demanda`,
`contratos`, `familia`, `consumidor`, `civel`, `tributario`).

## O que ainda falta

| Placeholder | Onde aparece | Observação |
| --- | --- | --- |
| `[URL DO SITE]` | canonical, Open Graph e JSON-LD | domínio ainda não definido |
| `[FOTO PROFISSIONAL]` | hero e seção Sobre | ensaio fotográfico pendente (entram em preto e branco, por CSS) |
| `[INSERIR DEPOIMENTO AUTORIZADO]` | seção Depoimentos | preencher **apenas** com depoimentos reais e autorizados |

Sem Instagram no ar — quando houver, basta acrescentar ao bloco de contato e ao
`sameAs` do JSON-LD.

**Em `assets/`**: veja `assets/LEIA-ME.txt` para as fotografias e o passo a passo
de substituição dos placeholders visuais.

## Formulário de contato

O site não possui backend. O formulário faz validação completa em JavaScript e,
ao ser enviado com sucesso, exibe uma mensagem informando que a integração de
envio deve ser configurada, oferecendo WhatsApp e e-mail como alternativa.

Para ativar o envio real, aponte o `<form>` para um serviço externo — por exemplo
Formspree, Netlify Forms ou um endpoint próprio — e remova o `event.preventDefault()`
do handler em `js/script.js` (seção `08`).

## Publicação

Projeto 100% estático, sem build.

### GitHub Pages (ambiente de teste, já configurado)

O workflow `.github/workflows/deploy.yml` publica a cada push na `main`.
Basta deixar ligado em **Settings › Pages › Source: GitHub Actions**.

Endereço: <https://ghabriel99.github.io/site-simonelliadv/>

> Esse endereço está com `noindex` no `index.html`, para não concorrer com o
> domínio definitivo nos buscadores.

### Ao migrar para o domínio próprio

1. No `index.html`, troque `noindex, nofollow` por `index, follow`.
2. Atualize o endereço em `canonical`, `og:url`, `og:image`, `twitter:image` e
   no `url`/`image` do JSON-LD — são seis ocorrências do mesmo endereço.
3. Em **Settings › Pages › Custom domain**, informe o domínio e marque
   *Enforce HTTPS*. O GitHub cria um arquivo `CNAME` na raiz.
4. No provedor do domínio, aponte o DNS para o GitHub Pages.

### Alternativas

- **Vercel** — importar o repositório, preset `Other`, sem build command
- **Netlify** — conectar o repositório, publish directory `.`

## Acessibilidade e SEO

- HTML semântico, `h1` único e hierarquia de headings organizada
- Skip link, navegação por teclado, estados de foco visíveis e `aria-*` nos componentes interativos
- Suporte a `prefers-reduced-motion`
- Meta description, Open Graph, Twitter Card e dados estruturados (schema.org `Attorney`)

## Segurança e privacidade

Site estático, sem servidor, sem banco e sem dependências de terceiros no
build — a superfície de ataque é o próprio HTML.

- **CSP** declarada no `index.html`: script, estilo, imagem e fonte só de
  origem própria e do Google Fonts. Injeção de script inline é recusada.
  Ao integrar o formulário a um serviço externo, acrescente o domínio em
  `form-action` e `connect-src`.
- **Referrer-Policy** `strict-origin-when-cross-origin`.
- O aviso do formulário é montado com `createElement`, nunca `innerHTML`:
  o que a pessoa digita entra como texto e como parâmetro de URL.
- Os dados do formulário **não** são registrados em console nem em lugar
  nenhum. Podem conter informação sensível sobre um caso.
- Links externos levam `rel="noopener noreferrer"`.
- `apresentacao/` nunca entrou no histórico do Git — o material de revisão,
  o PSD e as fontes licenciadas não estão no repositório.
- O workflow do Pages roda com permissão mínima (`contents: read`).

### Pendente de um domínio próprio

O GitHub Pages não deixa definir cabeçalhos HTTP, então ficam de fora
`Content-Security-Policy: frame-ancestors` (anti-clickjacking),
`X-Content-Type-Options` e `Strict-Transport-Security`. Com domínio próprio
atrás de uma CDN (Cloudflare, Netlify) dá para configurar os três.
Em Pages, marque **Enforce HTTPS**.

### LGPD

As fontes vêm do Google: o IP de quem visita chega a um terceiro antes de
qualquer consentimento. Hospedar as fontes no próprio repositório elimina
essa chamada. O site não usa cookies, analytics nem pixel de rastreamento.

## Comunicação

O conteúdo foi redigido em tom sóbrio e informativo, sem promessa de resultado,
garantia de êxito, números, comparações ou depoimentos fictícios, em observância às
normas de publicidade e divulgação aplicáveis à advocacia.
