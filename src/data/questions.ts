export type Question = {
  question: string;
  answers: [string, string, string, string];
  correctAnswer: number; // 0 = A
  prize: string;
};

export const PRIZES = [
  "R$ 1.000",
  "R$ 2.000",
  "R$ 3.000",
  "R$ 4.000",
  "R$ 5.000",
  "R$ 10.000",
  "R$ 20.000",
  "R$ 50.000",
  "R$ 100.000",
  "R$ 1.000.000",
] as const;

export const questions: Question[] = [
  {
    question: "O que melhor define patrimônio audiovisual?",
    answers: [
      "Apenas prédios históricos filmados",
      "Filmes, fotografias, vídeos e registros.",
      "Apenas obras cinematográficas premiadas",
      "Somente documentos produzidos pelo governo",
    ],
    correctAnswer: 1,
    prize: PRIZES[0],
  },
  {
    question:
      "No início, o audiovisual estava principalmente relacionado a qual função?",
    answers: ["Entretenimento", "Publicidade", "Educação e ensino", "Turismo"],
    correctAnswer: 2,
    prize: PRIZES[1],
  },
  {
    question: "O que é uma fonte cinematográfica?",
    answers: [
      "Um registro produzido em formato de filme",
      "Uma gravação feita exclusivamente pelo celular",
      "Um documento escrito",
      "Uma fotografia impressa",
    ],
    correctAnswer: 0,
    prize: PRIZES[2],
  },
  {
    question:
      "Uma gravação em VHS de uma festa junina realizada no Nordeste nos anos 1990 pode ser considerada:",
    answers: [
      "Fonte cinematográfica",
      "Fonte videográfica",
      "Arquivo digital",
      "Documento arquitetônico",
    ],
    correctAnswer: 1,
    prize: PRIZES[3],
  },
  {
    question:
      "Uma fotografia antiga de uma rua de uma cidade nordestina pode ser utilizada por um arquiteto para:",
    answers: [
      "Descobrir apenas o nome dos moradores",
      "Analisar transformações da arquitetura e da paisagem urbana",
      "Determinar o valor comercial dos imóveis",
      "Substituir completamente os levantamentos arquitetônicos",
    ],
    correctAnswer: 1,
    prize: PRIZES[4],
  },
  {
    question:
      "O audiovisual pode registrar não apenas acontecimentos, mas também:",
    answers: [
      "Modos de vida e costumes",
      "Memórias e experiências",
      "Transformações das cidades e da sociedade",
      "Todas as alternativas",
    ],
    correctAnswer: 3,
    prize: PRIZES[5],
  },
  {
    question:
      "Qual instituição possui uma importante coleção dedicada à preservação do cinema pernambucano?",
    answers: [
      "Cinemateca Pernambucana",
      "Museu do Futebol",
      "Instituto Butantan",
      "Museu Nacional de Belas Artes",
    ],
    correctAnswer: 0,
    prize: PRIZES[6],
  },
  {
    question:
      "Além dos filmes e vídeos, quais materiais também podem fazer parte do patrimônio audiovisual?",
    answers: [
      "Roteiros",
      "Fotografias",
      "Cartazes e anotações",
      "Todas as alternativas",
    ],
    correctAnswer: 3,
    prize: PRIZES[7],
  },
  {
    question:
      "Imagine que um documentário registre uma pequena cidade do sertão nordestino. Ele mostra as casas, as ruas, a praça, a feira, as festas e os moradores. Qual é a principal importância desse registro?",
    answers: [
      "Mostrar apenas uma paisagem bonita",
      "Preservar informações sobre a memória, cultura, arquitetura e modo de vida daquela comunidade",
      "Servir apenas como entretenimento",
      "Registrar somente os edifícios históricos",
    ],
    correctAnswer: 1,
    prize: PRIZES[8],
  },
  {
    question:
      "O patrimônio audiovisual pode desempenhar um papel fundamental na preservação da identidade cultural nordestina porque:",
    answers: [
      "Registra somente obras arquitetônicas consideradas monumentos oficiais.",
      "Permite preservar imagens e sons, mas não possui relação com memória, identidade ou patrimônio cultural.",
      "Registra e transmite memórias, manifestações culturais, arquitetura, paisagens e modos de vida, permitindo que diferentes gerações conheçam e ressignifiquem esse patrimônio.",
      "Substitui completamente a necessidade de preservar fisicamente edifícios e manifestações culturais.",
    ],
    correctAnswer: 2,
    prize: PRIZES[9],
  },
];

export const LETTERS = ["A", "B", "C", "D"] as const;
