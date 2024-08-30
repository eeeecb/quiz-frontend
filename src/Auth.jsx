import React, { useState, useEffect } from "react";
import { User, Lock, UserPlus, BookOpen } from "lucide-react";

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (!isLogin) {
      setNome("");
      setMatricula("");
      setSenha("");
    }
  }, [isLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users"));

    if (isLogin) {
      const user = users.find(
        (u) => u.matricula === matricula && u.senha === senha
      );
      if (user) {
        onLogin(user);
      } else {
        setError("Matrícula ou senha inválida");
      }
    } else {
      if (users.some((u) => u.matricula === matricula)) {
        setError("Matrícula já existe");
      } else {
        const newUser = { nome, matricula, senha };
        localStorage.setItem("users", JSON.stringify([...users, newUser]));
        setIsLogin(true);
        setError("Cadastro realizado com sucesso. Por favor, faça login.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          {isLogin ? "Login" : "Cadastro"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-gray-700"
              >
                Nome
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="pl-10 block w-full text-lg rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-12"
                />
              </div>
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="matricula"
              className="block text-sm font-medium text-gray-700"
            >
              Matrícula
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BookOpen className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="matricula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                required
                className="pl-10 block w-full text-lg rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-12"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="senha"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="pl-10 block w-full text-lg rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-12"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-lg"
          >
            {isLogin ? "Entrar" : "Cadastrar"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-blue-600 hover:text-blue-800"
          >
            {isLogin ? "Cadastre-se" : "Faça login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
