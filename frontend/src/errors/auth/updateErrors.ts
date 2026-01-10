export const updateUserErrorMessages: Record<number, string> = {
  400: "Dados inválidos para atualização",
  401: "Sessão expirada. Faça login novamente",
  403: "Acesso negado",
  404: "Usuário não encontrado",
  409: "E-mail já está em uso",
  500: "Erro interno no servidor",
};

export const getUpdateUserErrorMessage = (status?: number) =>
  status
    ? updateUserErrorMessages[status] ||
      "Erro desconhecido ao atualizar informações"
    : "Erro desconhecido ao atualizar informações";
