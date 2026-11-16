# Gabriela Simonelli — Advocacia e Consultoria Jurídica

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
site, em preto e branco, com filete em cinza. As letras estão convertidas em curvas: os arquivos não
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
| `[FOTO PROFISSIONAL]` | hero e seção Sobre | ensaio fotográfico pendente |
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
