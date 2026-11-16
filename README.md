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

Projeto 100% estático, pronto para:

- **GitHub Pages** — Settings › Pages › Deploy from branch › `main` / `root`
- **Vercel** — importar o repositório, framework preset `Other`, sem build command
- **Netlify** — arrastar a pasta ou conectar o repositório, publish directory `.`

## Acessibilidade e SEO

- HTML semântico, `h1` único e hierarquia de headings organizada
- Skip link, navegação por teclado, estados de foco visíveis e `aria-*` nos componentes interativos
- Suporte a `prefers-reduced-motion`
- Meta description, Open Graph, Twitter Card e dados estruturados (schema.org `Attorney`)

## Comunicação

O conteúdo foi redigido em tom sóbrio e informativo, sem promessa de resultado,
garantia de êxito, números, comparações ou depoimentos fictícios, em observância às
normas de publicidade e divulgação aplicáveis à advocacia.
