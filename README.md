# Gabriela Simonelli — Advocacia Estratégica

Landing page institucional em HTML5, CSS3 e JavaScript puro (sem frameworks e sem backend).

## Estrutura

```
index.html
css/style.css
js/script.js
assets/          fotografias, favicon, imagem de compartilhamento
assets/marca/    monograma GS, selo, assinatura e ícones (SVG + PNG)
```

> A pasta `apresentacao/` (PDF e DOCX de revisão enviados à advogada) fica fora do
> repositório por conter material interno — veja o `.gitignore`.

## Marca

Monograma **G | S** desenhado em Cormorant Garamond, a mesma família dos títulos do
site, com filete em bronze. As letras estão convertidas em curvas: os arquivos não
dependem da fonte instalada.

| Arquivo | Uso |
| --- | --- |
| `gs-monograma` | versão principal, fundo transparente (cabeçalho do site) |
| `gs-monograma-claro` | mesma marca para fundos escuros (rodapé) |
| `gs-selo-escuro` / `gs-selo-claro` | 1024×1024, foto de perfil em redes sociais |
| `logo-horizontal` | assinatura com o nome, para papelaria e documentos |
| `favicon.svg` / `apple-touch-icon.png` | ícones (copiados para `assets/`) |

Cada peça está em SVG (vetor) e PNG em alta resolução.

## Como executar localmente

Basta abrir o `index.html` no navegador. Para um servidor local:

```bash
npx serve .
```

## O que precisa ser preenchido antes de publicar

Todos os campos abaixo estão marcados como placeholders no código.

**Em `index.html`** (localize e substitua):

| Placeholder | Onde aparece |
| --- | --- |
| `[OAB/UF]` e `[XX.XXX/UF]` | hero, sobre, contato, footer |
| `[TELEFONE]` | contato (`href="tel:"`) e JSON-LD |
| `[WHATSAPP]` | seção de contato (texto exibido) |
| `[E-MAIL]` | contato, modal de privacidade, JSON-LD |
| `[ENDEREÇO]` | contato, footer, JSON-LD |
| `[INSTAGRAM]` / `[LINKEDIN]` | contato e JSON-LD |
| `[URL DO SITE]` | canonical e Open Graph |
| `[INSERIR TÍTULO DO ARTIGO]` / `[INSERIR LINK PARA PUBLICAÇÃO]` | seção Publicações |
| `[INSERIR DEPOIMENTO AUTORIZADO]` | seção Depoimentos — preencher **apenas** com depoimentos reais e autorizados, ou remover a seção |
| `[INSERIR INFORMAÇÕES SOBRE A CONSULTA]` etc. | respostas do FAQ |

**Em `js/script.js`** (bloco `01. CONFIGURAÇÃO`, no topo do arquivo):

```js
var WHATSAPP_NUMBER = '5543999999999'; // formato internacional, só dígitos
```

As mensagens pré-preenchidas ficam em `WHATSAPP_MESSAGES` e são selecionadas pelo
atributo `data-wa` de cada CTA no HTML (`consulta`, `demanda`, `empresarial`,
`civel`, `imobiliario`, `tributario`).

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
