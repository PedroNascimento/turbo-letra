# ✏️ Turbo Letra

**Turbo Letra** é uma aplicação web focada em treino de escrita calma e profunda (_Deep Work_), projetada para auxiliar estudantes e crianças (especialmente neurodivergentes) a praticarem a cópia de textos com blocos cronometrados.

Com uma identidade visual **"Azul Sereno"** e modos de foco, o projeto visa criar um ambiente livre de distrações e ansiedade.

---

## 🎯 Objetivo

Oferecer um treino de escrita previsível e confortável. Diferente de apps gamificados cheios de estímulos, o **Turbo Letra** aposta na calmaria:

- **Blocos de texto isolados**: Foco total em um parágrafo por vez.
- **Temporizador suave**: Sem cores de alerta (vermelho) ou piscadas agressivas.
- **Identidade Visual Confortável**: Paleta de cores azulada e tipografia arredondada que reduz a carga cognitiva.
- **Feedback Sonoro Sutil**: Beep opcional para marcar o ritmo sem sustos.

---

## ✨ Funcionalidades

### 🏠 Página de Configuração (`/`)

- **Editor de Blocos Inteligente**:
  - **Colar Texto**: Cole um texto longo e ele será dividido automaticamente em blocos (separados por `\n\n`).
  - **Gerenciamento Visual**: Reordene e exclua blocos com facilidade.
- **Painel de Controle**:
  - **Tempo por bloco**: Ajuste de 5s a 10 minutos.
  - **Tipografia**: Ajuste de tamanho da fonte e espaçamento entre linhas.
  - **Temas**: Alternância entre **Claro** (Papel Azulado) e **Escuro Calmo** (Deep Navy).
  - **Som**: Ativar/desativar beep de conclusão.
- **Persistência Automática**: Seus blocos e configurações são salvos no navegador.

### ⏱️ Tela de Execução (`/run`)

- **Imersão Total**: Modo tela cheia automático.
- **Timer Regressivo**: Visualização clara do tempo restante.
- **Navegação Flexível**: Pule blocos, pause ou reinicie a qualquer momento.
- **Aviso Suave**: Nos últimos 5s, o timer muda sutilmente de cor (sem vermelho).
- **Controles Modernos**: Interface com ícones **Lucide React** intuitivos.
- **Atalhos de Teclado**:
  - `Espaço`: Pausar/Continuar
  - `←` / `→`: Navegar entre blocos
  - `R`: Reiniciar o bloco atual
  - `Esc`: Sair do treino

---

## 🛠️ Tecnologias

Projeto construído com as melhores práticas de 2026:

| Tecnologia                                        | Função                                                    |
| :------------------------------------------------ | :-------------------------------------------------------- |
| **[Next.js 16](https://nextjs.org/)**             | Framework React com App Router e Turbopack.               |
| **[TypeScript](https://www.typescriptlang.org/)** | Tipagem estática para código robusto.                     |
| **[Tailwind CSS v4](https://tailwindcss.com/)**   | Estilização moderna com variáveis CSS nativas (`@theme`). |
| **[Lucide React](https://lucide.dev/)**           | Ícones vetoriais modernos e leves.                        |
| **Web Audio API**                                 | Geração de som (beep) sem arquivos externos.              |
| **LocalStorage**                                  | Banco de dados local (privacidade total).                 |

---

## 📁 Estrutura do Projeto

```
turbo-letra/
├── app/
│   ├── layout.tsx          # Configuração global (Fontes Fredoka/Geist)
│   ├── globals.css         # Tema CSS Variable (Serene Blue Palette)
│   ├── icon.tsx            # Favicon gerado dinamicamente (SVG Pencil)
│   ├── opengraph-image.tsx # Imagem social gerada via código
│   ├── page.tsx            # Home (Editor + Settings)
│   └── run/                # Tela de Treino (Fullscreen)
├── components/             # Componentes modulares (BlockEditor, RunControls...)
└── lib/                    # Lógica pura (storage, timer, audio)
```

---

## 🚀 Como Rodar

### Pré-requisitos

- Node.js 18+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/turbo-letra.git

# Instale as dependências
cd turbo-letra
npm install

# Rode em desenvolvimento
npm run dev
```

Acesse **http://localhost:3000** no seu navegador.

---

## 🎨 Identidade Visual "Serene Blue"

O projeto utiliza uma paleta de cores focada em **calma e concentração**:

- **Fundo Claro**: `#F4F8FF` (Azul Gelo)
- **Fundo Escuro**: `#0B1220` (Deep Navy - evitamos preto puro `#000`)
- **Acento**: `#4A90E2` (Azul Sereno)
- **Superfícies**: `#FFFFFF` (Claro) e `#121B2D` (Escuro)

Tipografia: **Fredoka** (Títulos arredondados) + **Geist Sans** (Leitura técnica).

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).
