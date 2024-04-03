import { Button, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { HomeDescription, HomeTitle, HomeWrapper, Smile } from "./Home.styles";
import { Game } from "pages/Game";
import { IGameStatus, congratulatoryText } from "./Home.types";

export const Home: FC = () => {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [gameStatus, setIsGameStatus] = useState<IGameStatus>({ finished: false, success: false });
  const titleText = isGameStarted && gameStatus.finished && !gameStatus.success ? 'Вы проиграли' : 'Добро пожаловать'
  const btnText = isGameStarted && gameStatus.finished && !gameStatus.success ? 'Попробовать снова' : 'Начать игру'

  const birthDate = new Date("2002-04-03");
  const currentDate = new Date();
  const millisecondsInADay = 1000 * 60 * 60 * 24;

  const diffMilliseconds = Number(currentDate) - Number(birthDate) - millisecondsInADay;
  const totalHearts = new Date(diffMilliseconds).getFullYear() - 1970;

  const onHomeClick = () => {
    setIsGameStarted(false)
    setIsGameStatus({ finished: false, success: false });
  }

  const onStartGame = () => {
    setIsGameStarted(true)
    setIsGameStatus({ finished: false, success: false });
  };

  const onFinishGame = (success: boolean) => {
    setIsGameStatus({ finished: true, success });
  };

  if (isGameStarted && !gameStatus.finished) {
    return <Game totalHearts={totalHearts} onFinishGame={onFinishGame} />
  }

  if (isGameStarted && gameStatus.finished && gameStatus.success) {
    return (
      <HomeWrapper spacing={3}>
        <HomeTitle>Вы победили!</HomeTitle>

        <HomeDescription>{congratulatoryText}</HomeDescription> <Smile>=)</Smile>

        <Button variant="contained" color="error" onClick={onHomeClick}>
          Назад
        </Button>
      </HomeWrapper>
    )
  }

  return (
    <HomeWrapper spacing={3}>
      <HomeTitle>{titleText}</HomeTitle>

      <HomeDescription>Чтобы получить поздравление, нужно набрать {totalHearts} сердечка за 1 минуту</HomeDescription>

      <Button variant="contained" color="error" onClick={onStartGame}>
        {btnText}
      </Button>
    </HomeWrapper>
  );
};
