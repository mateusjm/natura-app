export const authErrorMessages: Record<number, string> = {
  400: "Dados de login inválidos",
  401: "E-mail ou senha incorretos",
  403: "Acesso negado",
  404: "Usuário não encontrado",
  500: "Erro interno no servidor",
};

export const getAuthErrorMessage = (status?: number) =>
  status
    ? authErrorMessages[status] || "Erro desconhecido"
    : "Erro desconhecido";
