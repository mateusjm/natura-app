import useHttp from "@/services/useHttp";
import type { Client } from "@/types/client";

const clientService = {
  create: async (client: Client): Promise<Client> => {
    try {
      const res = await useHttp.post("/client", client);
      return res.data;
    } catch (error) {
      console.log("Erro ao criar cliente", error);
      throw error;
    }
  },

  getAll: async (): Promise<Client[]> => {
    try {
      const res = await useHttp.get("/client");
      console.log(res);
      return res.data;
    } catch (error) {
      console.log("Erro ao obter clientes", error);
      throw error;
    }
  },

  getById: async (id: number): Promise<Client> => {
    try {
      const res = await useHttp.get(`/client/${id}`);
      return res.data;
    } catch (error) {
      console.log("Erro ao obter cliente por ID", error);
      throw error;
    }
  },

  update: async (id: number, client: Client): Promise<Client> => {
    try {
      const res = await useHttp.patch(`/client/${id}`, client);
      return res.data;
    } catch (error) {
      console.log("Erro ao editar cliente", error);
      throw error;
    }
  },

  remove: async (id: number): Promise<void> => {
    try {
      await useHttp.delete(`/client/${id}`);
    } catch (error) {
      console.log("Erro ao remover cliente", error);
      throw error;
    }
  },
};

export default clientService;
