import { FormEvent, useEffect, useState } from "react";
import * as S from "./styles";
import { LoadingComponent, ButtonComponent } from "components";
import { FcDatabase, FcUndo } from "react-icons/fc";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiAutomovel} from "services/data";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { IAutomovelForm } from "interfaces/automovel.interface";
import { IErrorResponse } from "interfaces/user.interface";

const AutomovelStore = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IAutomovelForm>({
    nome: '',
    automovel: '',
  })
  const { id } = useParams<{ id: string }>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      if (Number(id) > 0) {
        await apiAutomovel.update(Number(id), formData);
        toast.success("Automovel alterada com sucesso!");
      } else {
        await apiAutomovel.store(formData);
        toast.success("Automovel cadastrada com sucesso!");
      }
      navigate('/adm/automovel')
    } catch (error) {
      const err = error as AxiosError<IErrorResponse>
      let automovels = err.response?.data.message
      if (err.response?.data.errors) {
        automovels = err.response?.data.errors?.map((i) => i.message)
          .reduce((total, cur) => `${total} ${cur}`)
      }
      toast.error(automovels)
    }
  }

  async function handleChange(e: IAutomovelForm) {
    setFormData((state: IAutomovelForm) => ({ ...state, ...e }))
  }

  useEffect(() => {
    if (Number(id) > 0) {
      const fetchData = async (id: number) => {
        try {
          const response = await apiAutomovel.show(id);
          setFormData({
            ...response.data,
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchData(Number(id));
    }
    setIsLoading(false);
  }, [id]);

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <S.Main>
            <form method="POST" onSubmit={handleSubmit}>
              <Link to="/adm/automovel">
                <FcUndo /> Voltar
              </Link>
              <div>
                <label htmlFor="nome">Nome: </label>
                <input type="text" id="nome" placeholder="Escreva o nome do automóvel" required
                  onChange={(e) => handleChange({ nome: e.target.value })}
                  value={formData?.automovel}
                />
              </div>
              <div>
                <label htmlFor="ano">Ano: </label>
                <textarea id="ano" placeholder="Escreva o ano" required
                  onChange={(e) => handleChange({ automovel: e.target.value })}
                  value={formData?.automovel}
                />
              </div>
              <div>
                <label htmlFor="valor">Valor: </label>
                <textarea id="valor" placeholder="Escreva o valor" required
                  onChange={(e) => handleChange({ automovel: e.target.value })}
                  value={formData?.automovel}
                />
              </div>
              <ButtonComponent bgColor="add" type="submit">
                Enviar <FcDatabase />
              </ButtonComponent>
            </form>
          </S.Main>
        </>
      )}
    </>
  );
};

export default AutomovelStore;