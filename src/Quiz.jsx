import React, { useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";

const Quiz = ({ user }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Qual é a função principal do React?",
      options: [
        "Estilização de páginas web",
        "Criação de interfaces de usuário",
        "Gerenciamento de banco de dados",
        "Processamento de dados no servidor",
        "Manipulação de APIs",
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "O que significa DOM em JavaScript?",
      options: [
        "Document Object Model",
        "Data Object Management",
        "Digital Output Method",
        "Dynamic Object Manipulation",
        "Display Object Module",
      ],
      correctAnswer: 0,
    },
    {
      id: 3,
      question: "Qual é a principal diferença entre let e const em JavaScript?",
      options: [
        "let é usado para funções, const para variáveis",
        "const cria variáveis mutáveis, let cria variáveis imutáveis",
        "let permite reatribuição, const cria variáveis imutáveis",
        "Não há diferença, são sinônimos",
        "let cria variáveis de bloco, const cria variáveis globais",
      ],
      correctAnswer: 2,
    },
    {
      id: 4,
      question:
        "JSX é uma extensão de sintaxe para JavaScript que permite escrever HTML dentro do código JavaScript.",
      options: ["Certo", "Errado"],
      correctAnswer: 0,
    },
    {
      id: 5,
      question:
        "Componentes em React são partes independentes e reutilizáveis de uma interface de usuário.",
      options: ["Certo", "Errado"],
      correctAnswer: 0,
    },
  ];

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex,
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Questionário de Construção de Frontend
        </h1>
        <p className="text-lg mb-4">
          Bem-vindo(a), {user.nome} - {user.matricula}!
        </p>
        {questions.map((q) => (
          <div key={q.id} className="mb-6">
            <p className="font-medium text-lg mb-2">{q.question}</p>
            {q.options && (
              <div>
                {q.options.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={`q${q.id}-${index}`}
                      name={`q${q.id}`}
                      value={index}
                      onChange={() => handleAnswer(q.id, index)}
                      className="mr-2"
                    />
                    <label htmlFor={`q${q.id}-${index}`}>{option}</label>
                    {submitted &&
                      answers[q.id] !== undefined &&
                      index === answers[q.id] &&
                      (index === q.correctAnswer ? (
                        <CheckCircle className="ml-2 text-green-500" />
                      ) : (
                        <AlertCircle className="ml-2 text-red-500" />
                      ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-lg"
        >
          Enviar Respostas
        </button>
      </div>
    </div>
  );
};

export default Quiz;
