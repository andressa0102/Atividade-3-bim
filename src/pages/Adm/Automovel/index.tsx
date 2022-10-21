import { useCallback, useEffect, useState } from "react";
import { ButtonComponent } from "components";
import * as S from "./styles";
import { apiAutomovel } from "services/data";
import { IAutomovelData } from "interfaces/message.interface";
import { LoadingComponent } from "components";
import { FcAddDatabase } from "react-icons/fc";
import { BsPencilSquare, BsTrash2 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

const AdmAutomovel = () => {
  const [messages, setAutomovels] = useState<IAutomovelData[]>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    const response = await apiAutomovel.index();
    setAutomovels(response.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = useCallback(
    async (id: number) => {
      confirmAlert({
        title: "Atenção",
        message: "Tem certeza que deseja apagar o item selecionado?",
        buttons: [
          {
            label: "SIM",
            onClick: async () => {
              setIsLoading(true);
              await apiAutomovel.destroy(id);
              toast.success("Mensagem removida com sucesso!");
              fetchData();
            },
          },
          {
            label: "Não",
            onClick: () => console.log("não"),
          },
        ],
      });
    },
    [fetchData]
  );

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <S.Main>
            <div>
              <ButtonComponent
                bgColor="add"
                type="button"
                onClick={() => navigate("/adm/message/0")}
              >
                <FcAddDatabase />
              </ButtonComponent>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Título</th>
                  <th>Mensagem</th>
                  <th>Editar</th>
                  <th>Remover</th>
                </tr>
              </thead>
              <tbody>
                {messages &&
                  messages.map((item) => (
                    <tr key={item.id}>
                      <td>{item.user?.name}</td>
                      <td>{item.title}</td>
                      <td>{item.message}</td>
                      <td>
                        <ButtonComponent
                          type="button"
                          bgColor="edit"
                          onClick={() => navigate(`/adm/message/${item.id}`)}
                        >
                          <BsPencilSquare />
                        </ButtonComponent>
                      </td>
                      <td>
                        <ButtonComponent
                          type="button"
                          bgColor="remove"
                          onClick={() => item.id && handleDelete(item.id)}
                        >
                          <BsTrash2 />
                        </ButtonComponent>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </S.Main>
        </>
      )}
    </>
  );
};

export default AdmAutomovel;