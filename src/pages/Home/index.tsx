import React from "react";
import carrousel from "assets/img/Group1.png";
import imagem from "assets/img/image5.png";
import * as S from "./styles";
import { CardComponent } from "components";
import dados from "services/dados";

const Home = () => {
  return (
    <S.Home>
      <picture>
        <img src={carrousel} alt="Imagens principais" />
      </picture>
      <aside>
        <img src={imagem} alt="Imagens principais" />
      </aside>
    </S.Home>
  );
};

export default Home;
