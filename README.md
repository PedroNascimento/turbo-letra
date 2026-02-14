# ⚡ Turbo Letra

**Turbo Letra** é uma aplicação web minimalista para treino de escrita rápida, projetada para auxiliar crianças (especialmente neurodivergentes) a praticarem a cópia de textos com blocos cronometrados. O responsável cadastra os textos, define o tempo e as preferências visuais, e a criança treina em modo tela cheia, focando exclusivamente no conteúdo.

---

## 🎯 Objetivo

Crianças com dificuldade em acompanhar a escrita do quadro na escola precisam de um treino simples, previsível e sem distrações. O **Turbo Letra** resolve isso oferecendo:

- Blocos de texto exibidos um por vez, em tela cheia
- Temporizador regressivo com troca automática de bloco
- Interface calma, sem excesso de estímulos visuais
- Configuração flexível pelo responsável

---

## ✨ Funcionalidades

### Página de Configuração (`/`)

- **Editor de blocos** com dois modos:
  - **Colar texto**: cole um texto inteiro e gere blocos automaticamente por parágrafos (`\n\n`)
  - **Lista de blocos**: visualize, reordene (↑/↓) e remova blocos individualmente
- **Configurações personalizáveis**:
  - Tempo por bloco (5–600 segundos) com slider e input numérico
  - Tamanho da fonte (24px, 32px, 40px, 48px)
  - Espaçamento de linha (Compacto, Normal, Espaçado)
  - Tema claro/escuro
  - Beep sonoro ao finalizar cada bloco (toggle)
- **Persistência automática** via `localStorage`

### Tela de Execução (`/run`)

- Ativação automática de **tela cheia** (Fullscreen API) com fallback
- Exibição centralizada do texto com fonte grande e configurável
- **Timer regressivo** em formato `mm:ss`, grande e legível
- Indicador de progresso: `Bloco X/Y`
- **Troca automática** de bloco ao zerar o timer
- **Beep sonoro** (Web Audio API) ao finalizar cada bloco
- **Aviso visual** nos últimos 5 segundos (borda pulsante)
- **Controles acessíveis**: Pausar/Continuar, Anterior, Próximo, Reiniciar, Sair
- **Atalhos de teclado**: `Espaço` (pausar), `←` `→` (navegar), `R` (reiniciar bloco), `Esc` (sair)

### Tela de Conclusão

- Mensagem "Concluído ✅" ao finalizar todos os blocos
- Botões para **recomeçar** ou **voltar** à tela de configuração

---

## 🛠️ Tecnologias

| Tecnologia                                     | Uso                                                 |
| ---------------------------------------------- | --------------------------------------------------- |
| [Next.js 16](https://nextjs.org/) (App Router) | Framework React com roteamento server-side          |
| [React 19](https://react.dev/)                 | Biblioteca de UI com hooks e componentes funcionais |
| [TypeScript](https://www.typescriptlang.org/)  | Tipagem estática para maior robustez                |
| [Tailwind CSS v4](https://tailwindcss.com/)    | Estilização utilitária com tokens semânticos        |
| [Turbopack](https://turbo.build/pack)          | Bundler de alta performance para desenvolvimento    |
| Web Audio API                                  | Geração de beep sonoro sem dependências externas    |
| Fullscreen API                                 | Modo tela cheia nativo do navegador                 |
| localStorage                                   | Persistência local de dados sem backend             |

---

## 📁 Estrutura do Projeto

```
turbo-letra/
├── app/
│   ├── layout.tsx          # Layout raiz (fonte, metadados, tema)
│   ├── page.tsx            # Página de configuração
│   ├── globals.css         # Design system com tokens semânticos
│   └── run/
│       └── page.tsx        # Tela de execução (fullscreen + timer)
├── components/
│   ├── BlockEditor.tsx     # Editor de blocos (colar texto / lista)
│   ├── SettingsPanel.tsx   # Painel de configurações
│   └── RunControls.tsx     # Controles da tela de execução
├── lib/
│   ├── storage.ts          # Persistência em localStorage com validação
│   ├── timer.ts            # Formatação de tempo (mm:ss)
│   └── audio.ts            # Beep via Web Audio API (OscillatorNode)
└── public/
```

---

## 🚀 Como Rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+ instalado

### Instalação

```bash
git clone https://github.com/seu-usuario/turbo-letra.git
cd turbo-letra
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Build de Produção

```bash
npm run build
npm start
```

---

## 🧩 Decisões Técnicas

- **Zero dependências extras**: todo o áudio é gerado via Web Audio API (OscillatorNode com fade-out exponencial) e a persistência usa `localStorage` nativo, sem bibliotecas externas.
- **Design system via CSS custom properties**: cores semânticas (`--accent`, `--card`, `--muted`, etc.) centralizadas em `globals.css`, com suporte completo a dark mode via classe `.dark`.
- **UX pensada para acessibilidade**: interface calma e previsível, sem barras de progresso que possam gerar ansiedade, com fonte configurável e espaçamentos adaptativos.
- **Client-side only**: toda a lógica roda no navegador, tornando a aplicação leve, offline-friendly e sem necessidade de backend.
- **Validação defensiva no localStorage**: funções de leitura com fallback para valores padrão previnem crashes por dados corrompidos.

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).
