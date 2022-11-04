import { IAutomovelData } from "interfaces/automovel.interface";
import api from "services/api";

class AutomovelData {
  index() {
    return api.get<IAutomovelData[]>('/automovels')
  }
  store(data: IAutomovelData) {
    return api.post(`/automovels`, data)
  }
  show(id: number) {
    return api.get<IAutomovelData>(`/automovels/${id}`)
  }
  update(id: number, data: IAutomovelData) {
    return api.put(`/automovels/${id}`, data)
  }
  destroy(id: number) {
    return api.delete(`/automovels/${id}`)
  }
}

export default new AutomovelData()