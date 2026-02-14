---

## PDR — “Treino de Escrita por Blocos” (SPA)

### 1) Objetivo

Criar uma aplicação minimalista para ajudar uma criança a **praticar escrita mais rápida**, copiando textos em **blocos** com **tempo definido**. Ao iniciar, a app entra em **tela cheia**, mostra o texto atual e um **temporizador regressivo**. Ao acabar o tempo, troca automaticamente para o próximo bloco com nova contagem.

### 2) Público-alvo

* Criança (11 anos), autista, com dificuldade de acompanhar escrita do quadro.
* Responsável (pai/mãe) que prepara os textos e controla tempo/dificuldade.

### 3) Problema a resolver

* Copiar conteúdo do quadro exige velocidade e constância.
* A criança fica para trás e o caderno fica incompleto.
* Treino precisa ser **simples, previsível e sem distrações**.

---

## 4) Escopo do MVP (essencial)

### 4.1 Funcionalidades principais

1. **Editor de blocos de texto**

   * Campo para colar/editar **vários blocos** (um por linha dupla `\n\n` ou botão “Adicionar bloco”).
   * Lista de blocos com:

     * índice (1/10),
     * preview curto,
     * reordenar (↑/↓),
     * remover.

2. **Configuração de tempo**

   * Selecionar tempo por bloco:

     * modo simples: **um tempo fixo** para todos os blocos (ex.: 45s)
     * (opcional no MVP): tempo por bloco (campo ao lado do bloco)

3. **Modo Execução (tela cheia)**

   * Botão **Play** inicia.
   * App entra em **Fullscreen**.
   * Exibe:

     * texto do bloco atual (grande),
     * timer regressivo,
     * progresso (Bloco X de Y).
   * Quando o timer chega a 0:

     * toca um **beep** curto (configurável),
     * avança para o próximo bloco automaticamente,
     * reinicia contagem.
   * Ao fim do último bloco:

     * tela final simples: “Concluído ✅” + botão “Recomeçar”.

4. **Controles durante execução**

   * **Pausar/Continuar**
   * **Próximo / Anterior**
   * **Reiniciar bloco**
   * **Sair** (volta para edição; sai de fullscreen)

5. **Persistência local (sem login)**

   * Salvar automaticamente no **localStorage**:

     * blocos,
     * tempo,
     * preferências visuais básicas.

---

## 5) Sugestões de funcionalidades (para ajudar no caso dela)

### 5.1 Acessibilidade e conforto visual (recomendado)

* **Tamanho da fonte** (ex.: 24 / 32 / 40 / 48)
* **Espaçamento entre linhas** (1.2 / 1.5 / 1.8)
* **Fonte legível** (ex.: system font; opcional: Atkinson Hyperlegible)
* **Modo alto contraste** (claro/escuro)
* Opção “**Mostrar só 1 parágrafo por vez**” (se o bloco for grande)

### 5.2 Redução de ansiedade / previsibilidade (muito útil)

* “**Pré-visualização do próximo**” (1 linha pequena) ON/OFF
  *Para algumas crianças ajuda; para outras distrai — deixe opcional.*
* Aviso visual nos últimos **5 segundos** (borda pulsando leve)
* Áudio:

  * beep no fim,
  * beep suave nos últimos 3 segundos (opcional)

### 5.3 Treino progressivo (nice-to-have)

* **Modo Escada (Progressão)**:

  * começa com 60s por bloco e reduz 5s a cada 2 blocos, até um mínimo.
* **Metas rápidas**:

  * “Hoje: 8 blocos”
  * “Tempo: 45s”
* **Histórico simples** (apenas local):

  * data, total de blocos, tempo configurado.

### 5.4 Conteúdo escolar (para ficar prático)

* Botão “**Importar**” (colar texto inteiro e auto-quebrar em blocos por parágrafo)
* Botão “**Exportar**” (gera JSON simples para backup)

---

## 6) Regras e comportamentos (detalhamento)

### 6.1 Definição de “bloco”

* Um bloco é um trecho de texto.
* No modo colar texto:

  * separar por **duas quebras de linha** (`\n\n`) → vira blocos
* No modo lista:

  * cada item é um bloco.

### 6.2 Execução e troca

* Estado inicial: bloco 1, timer = tempo configurado.
* Ao “Play”:

  * entrar em fullscreen (se permitido),
  * começar contagem imediatamente.
* Ao atingir 0:

  * tocar beep (se ativo),
  * avançar para próximo bloco,
  * reiniciar timer.
* No último bloco:

  * ao zerar, ir para tela “Concluído”.

### 6.3 Controles

* Pausa congela timer.
* Próximo:

  * muda o bloco e reseta timer.
* Anterior:

  * volta e reseta timer.
* Reiniciar bloco:

  * reseta timer sem mudar bloco.
* Sair:

  * interrompe sessão e retorna ao editor.

### 6.4 Teclas de atalho (opcional, mas fácil e útil)

* Espaço: pausar/continuar
* → próximo
* ← anterior
* R: reiniciar bloco
* Esc: sair (e tentar sair do fullscreen)

---

## 7) Requisitos não-funcionais

* **Sem login**, tudo local.
* **Rápido e leve**, carregamento instantâneo.
* **Funciona offline** (opcional: PWA depois).
* **Mobile e Desktop**, mas foco em desktop/tablet (escola/casa).
* UX “calma”: sem animações fortes, sem excesso de botões.

---

## 8) Telas e UI

### 8.1 Tela “Configurar”

* Título: Treino de Escrita
* Área de blocos:

  * aba “Colar texto” e aba “Lista de blocos”
* Configurações:

  * tempo por bloco (slider + input)
  * fonte (tamanho, espaçamento)
  * tema (claro/escuro)
  * beep (on/off)
* Botão grande: **Iniciar (Play)**

### 8.2 Tela “Execução” (fullscreen)

* Centro: texto grande do bloco
* Topo:

  * “Bloco 3/10”
* Lado ou rodapé:

  * timer grande “00:45”
* Rodapé com controles grandes:

  * ⏸ Pausar / ▶ Continuar
  * ◀ Anterior | Próximo ▶
  * 🔁 Reiniciar
  * ✖ Sair

### 8.3 Tela “Concluído”

* “Concluído ✅”
* Botões:

  * Recomeçar
  * Voltar para editar

---

## 9) Critérios de aceite (MVP)

* [ ] Consigo inserir vários blocos de texto.
* [ ] Consigo escolher um tempo (em segundos/minutos).
* [ ] Ao iniciar, entra em tela cheia e inicia o timer.
* [ ] Ao zerar, troca automaticamente para o próximo bloco e reinicia o timer.
* [ ] Ao finalizar o último bloco, exibe “Concluído”.
* [ ] Posso pausar/continuar, avançar/voltar e sair.
* [ ] Configurações e blocos persistem ao recarregar a página.

---

## 10) Stack sugerida

Escolha recomendada: **Next.js (App Router) + React + TypeScript + Tailwind**
Motivo: simples de subir na Vercel, componente e estado tranquilos, UI rápida.

---
