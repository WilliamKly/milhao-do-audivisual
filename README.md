# Show do Saber

Crie um jogo web de perguntas e respostas com estética de **game show brasileiro clássico**, inspirado na atmosfera visual e na dinâmica de programas como "Show do Milhão", mas criando uma identidade visual própria e sem copiar logotipos, personagens, imagens ou outros assets proprietários.

O jogo será utilizado em uma apresentação/aula sobre **patrimônio audiovisual**, então precisa parecer um jogo de perguntas profissional e divertido, e não um formulário comum.

## OBJETIVO

Criar uma experiência em que o jogador responde 10 perguntas, avançando por uma sequência de prêmios:

R$ 1.000
R$ 2.000
R$ 3.000
R$ 4.000
R$ 5.000
R$ 10.000
R$ 20.000
R$ 50.000
R$ 100.000
R$ 1.000.000

O jogador deve conseguir responder clicando em uma das quatro alternativas.

Depois de responder:

* bloquear as alternativas;
* mostrar visualmente a alternativa escolhida;
* tocar um som de suspense durante um pequeno intervalo;
* revelar se a resposta está correta ou errada;
* tocar um som diferente para acerto e erro;
* destacar a resposta correta;
* permitir avançar para a próxima pergunta.

Na última pergunta, caso acerte, mostrar uma tela especial de vitória.

---

# ESTILO VISUAL

Quero uma estética de **programa de perguntas e respostas/game show**, com aparência nostálgica e televisiva.

A referência de sensação é:

* programas brasileiros de perguntas e respostas;
* televisão dos anos 2000;
* palco de game show;
* azul escuro;
* azul elétrico;
* dourado/amarelo;
* iluminação dramática;
* brilhos;
* gradientes;
* elementos circulares;
* painéis iluminados;
* sensação de estar participando de um programa de TV.

IMPORTANTE:

Não copie literalmente o logo, layout, imagens ou identidade visual do "Show do Milhão".

Crie uma identidade própria que tenha a mesma sensação de um game show clássico.

---

# TELA PRINCIPAL

A tela deve ocupar 100% da viewport.

No topo:

* título do jogo;
* indicação do prêmio atual;
* progresso da pergunta.

No centro:

* painel grande contendo a pergunta;
* visual de painel iluminado;
* bordas e detalhes dourados/azuis;
* bastante contraste.

Abaixo da pergunta:

4 alternativas grandes:

A) ...
B) ...
C) ...
D) ...

Organizadas em duas colunas no desktop e uma coluna no celular.

Cada alternativa deve parecer um botão de programa de perguntas.

Ao passar o mouse:

* brilho;
* leve aumento;
* mudança de iluminação.

No celular:

* área de toque grande;
* nenhum hover deve ser necessário.

---

# ESCADA DE PRÊMIOS

Mostrar uma escada de prêmios em algum ponto da interface.

Valores:

R$ 1.000
R$ 2.000
R$ 3.000
R$ 4.000
R$ 5.000
R$ 10.000
R$ 20.000
R$ 50.000
R$ 100.000
R$ 1.000.000

A pergunta atual deve ficar claramente destacada.

Conforme o jogador avança, a escada deve acompanhar o progresso.

No desktop pode ficar em uma lateral.

No celular, adaptar para:

* barra horizontal;
* lista compacta;
* ou painel recolhível.

Não deixar a escada ocupar espaço demais no celular.

---

# ANIMAÇÕES

Quero uma experiência visual bastante dinâmica.

Adicionar animações suaves para:

* entrada da pergunta;
* entrada das alternativas;
* seleção de alternativa;
* suspense;
* resposta correta;
* resposta errada;
* mudança de pergunta;
* progressão na escada de prêmios;
* vitória final.

Quando uma alternativa for selecionada:

* ela deve ficar visualmente destacada;
* as outras podem escurecer;
* iniciar uma pequena animação de suspense.

Quando a resposta for revelada:

CORRETA:

* alternativa fica verde;
* brilho;
* animação de sucesso;
* partículas/confetes discretos;
* som de acerto.

ERRADA:

* alternativa fica vermelha;
* animação curta de erro;
* resposta correta fica destacada em verde;
* som de erro.

---

# ÁUDIO

O áudio é MUITO importante para a experiência.

Crie uma camada de áudio para o jogo.

Quero sons para:

1. Entrada da pergunta
2. Seleção da alternativa
3. Suspense antes de revelar a resposta
4. Resposta correta
5. Resposta errada
6. Passagem para próxima pergunta
7. Vitória final

Não utilize músicas ou efeitos protegidos por direitos autorais copiados diretamente do programa original.

Se não houver arquivos de áudio fornecidos, utilize Web Audio API ou sons/efeitos gerados de forma simples para criar:

* suspense;
* tensão;
* acerto;
* erro;
* vitória.

Também quero um botão discreto para ativar/desativar o som.

IMPORTANTE:

Em celulares, o áudio deve ser iniciado somente após uma interação do usuário, respeitando as políticas dos navegadores.

---

# TELA DE ABERTURA

Antes da primeira pergunta, mostrar uma tela de abertura.

Algo como:

"DESAFIO DO PATRIMÔNIO AUDIOVISUAL"

Subtítulo:

"Você está pronto para chegar ao milhão?"

Mostrar:

**COMEÇAR**

Ao clicar em começar:

* iniciar a experiência;
* habilitar o áudio;
* entrar na primeira pergunta.

---

# TELA DE VITÓRIA

Se o jogador acertar a pergunta de R$ 1.000.000:

mostrar uma tela especial.

Texto grande:

"PARABÉNS!"

"VOCÊ CHEGOU AO MILHÃO!"

Mostrar:

**R$ 1.000.000**

Adicionar:

* animação de confetes;
* brilho;
* efeitos de luz;
* som de vitória;
* botão "JOGAR NOVAMENTE".

---

# CASO O JOGADOR ERRE

Se o jogador errar:

mostrar claramente:

"RESPOSTA ERRADA"

Mostrar a alternativa correta.

Mostrar o valor alcançado ou indicar que o jogo terminou.

Adicionar botão:

**JOGAR NOVAMENTE**

Não permitir continuar para a próxima pergunta depois de um erro.

---

# RESPONSIVIDADE

O jogo precisa funcionar principalmente em celulares.

Desktop:

* layout mais amplo;
* escada de prêmios lateral;
* painel central grande.

Celular:

* pergunta ocupando boa parte da tela;
* alternativas em uma coluna;
* escada de prêmios compacta;
* botões grandes;
* texto legível;
* nada pode sair da tela;
* não exigir zoom.

Utilizar:

* viewport correta;
* `100dvh`;
* layouts responsivos;
* áreas de toque grandes.

Testar mentalmente pelo menos:

* iPhone;
* Android;
* tablet;
* desktop.

---

# EXPERIÊNCIA DO USUÁRIO

O jogador deve entender imediatamente:

1. Qual é a pergunta?
2. Quanto vale?
3. Quais são as alternativas?
4. Qual alternativa ele selecionou?
5. Se acertou ou errou?
6. Quanto falta para chegar ao milhão?

Não adicionar menus ou funcionalidades desnecessárias.

---

# DADOS DAS PERGUNTAS

Utilize exatamente estas 10 perguntas:

### R$ 1.000

**1. O que melhor define patrimônio audiovisual?**

A) Apenas prédios históricos filmados

B) Filmes, fotografias, vídeos e registros.

C) Apenas obras cinematográficas premiadas

D) Somente documentos produzidos pelo governo

Resposta correta: **B**

---

### R$ 2.000

**2. No início, o audiovisual estava principalmente relacionado a qual função?**

A) Entretenimento

B) Publicidade

C) Educação e ensino

D) Turismo

Resposta correta: **C**

---

### R$ 3.000

**3. O que é uma fonte cinematográfica?**

A) Um registro produzido em formato de filme

B) Uma gravação feita exclusivamente pelo celular

C) Um documento escrito

D) Uma fotografia impressa

Resposta correta: **A**

---

### R$ 4.000

**4. Uma gravação em VHS de uma festa junina realizada no Nordeste nos anos 1990 pode ser considerada:**

A) Fonte cinematográfica

B) Fonte videográfica

C) Arquivo digital

D) Documento arquitetônico

Resposta correta: **B**

---

### R$ 5.000

**5. Uma fotografia antiga de uma rua de uma cidade nordestina pode ser utilizada por um arquiteto para:**

A) Descobrir apenas o nome dos moradores

B) Analisar transformações da arquitetura e da paisagem urbana

C) Determinar o valor comercial dos imóveis

D) Substituir completamente os levantamentos arquitetônicos

Resposta correta: **B**

---

### R$ 10.000

**6. O audiovisual pode registrar não apenas acontecimentos, mas também:**

A) Modos de vida e costumes

B) Memórias e experiências

C) Transformações das cidades e da sociedade

D) Todas as alternativas

Resposta correta: **D**

---

### R$ 20.000

**7. Qual instituição possui uma importante coleção dedicada à preservação do cinema pernambucano?**

A) Cinemateca Pernambucana

B) Museu do Futebol

C) Instituto Butantan

D) Museu Nacional de Belas Artes

Resposta correta: **A**

---

### R$ 50.000

**8. Além dos filmes e vídeos, quais materiais também podem fazer parte do patrimônio audiovisual?**

A) Roteiros

B) Fotografias

C) Cartazes e anotações

D) Todas as alternativas

Resposta correta: **D**

---

### R$ 100.000

**9. Imagine que um documentário registre uma pequena cidade do sertão nordestino. Ele mostra as casas, as ruas, a praça, a feira, as festas e os moradores. Qual é a principal importância desse registro?**

A) Mostrar apenas uma paisagem bonita

B) Preservar informações sobre a memória, cultura, arquitetura e modo de vida daquela comunidade

C) Servir apenas como entretenimento

D) Registrar somente os edifícios históricos

Resposta correta: **B**

---

### R$ 1.000.000

**10. O patrimônio audiovisual pode desempenhar um papel fundamental na preservação da identidade cultural nordestina porque:**

A) Registra somente obras arquitetônicas consideradas monumentos oficiais.

B) Permite preservar imagens e sons, mas não possui relação com memória, identidade ou patrimônio cultural.

C) Registra e transmite memórias, manifestações culturais, arquitetura, paisagens e modos de vida, permitindo que diferentes gerações conheçam e ressignifiquem esse patrimônio.

D) Substitui completamente a necessidade de preservar fisicamente edifícios e manifestações culturais.

Resposta correta: **C**

---

# ARQUITETURA DO CÓDIGO

Mantenha os dados das perguntas separados da interface.

Por exemplo:

questions = [
{
question: "...",
answers: ["...", "...", "...", "..."],
correctAnswer: 1,
prize: "R$ 1.000"
}
]

Não coloque a lógica das perguntas diretamente espalhada pelos componentes.

Preciso conseguir alterar/adicionar perguntas facilmente depois.

---

# TECNOLOGIA

Use uma stack web moderna adequada ao Lovable.

Pode usar React + TypeScript se for o padrão do Lovable.

Não precisa criar backend.

Não precisa de banco de dados.

Tudo pode funcionar localmente no navegador.

O jogo deve ser um SPA simples.

---

# IMPORTANTE SOBRE O RESULTADO

Não quero que você entregue uma interface genérica de quiz.

Quero que, ao abrir, a pessoa tenha imediatamente a sensação:

**"Isso parece um programa de perguntas e respostas de televisão."**

O foco deve ser:

* espetáculo;
* suspense;
* iluminação;
* sons;
* progressão dos prêmios;
* feedback visual;
* sensação de competição.

Mas mantendo uma identidade visual própria, sem copiar literalmente elementos protegidos do programa original.

Depois de implementar, revise toda a experiência e corrija problemas de responsividade, overflow, animações e estados de jogo.

Não adicione login, cadastro, banco de dados, painel administrativo ou qualquer outra funcionalidade que não foi solicitada.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a4a59444-2933-4148-b3ec-fff2d27ed0ec).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
