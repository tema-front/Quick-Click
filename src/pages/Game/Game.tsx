import { FC, useCallback, useEffect, useState } from "react";
import {
  FieldElement,
  GameField,
  GameFieldWrapper,
  GameWrapper,
} from "./Game.styles";
import { ProgressHeartBar } from "components/ProgressHeartBar";
import {
  ICurrentFieldElement,
  IFieldElement,
  IGameProps,
  fieldElements,
} from "./Game.types";
import failSound from "assets/sounds/failSound.mp3";

export const Game: FC<IGameProps> = ({ totalHearts, totalMinutes, onFinishGame }) => {
  const [heartCount, setHeartCount] = useState<number>(0);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);

  const [currentFieldElement, setCurrentFieldElement] = useState<ICurrentFieldElement | null>(null);

  const maxInterval: number = 750;
  const minInterval: number = 500;

  const [time, setTime] = useState<number>(totalMinutes * 60);

  let timeInterval: any = null;
  let elementAppearanceTimeout: any = null;
  let elementDisappearanceTimeout: any = null;

  useEffect(() => {
    if (!isGameStarted) setCurrentFieldElement(getRandomElement());
  }, []);

  useEffect(() => {
    if (isGameStarted) {
      startTimeouts();

      timeInterval = setInterval(() => {
        setTime((prev) => {
          const result = prev - 1;

          if (result === 0) clearInterval(timeInterval);

          return result;
        });
      }, 1000);
    }
  }, [isGameStarted]);

  useEffect(() => {
    if ((heartCount === 0 || !time) && isGameStarted && !isGameFinished) {
      onFinishGame(false);
      return
    }

    if (heartCount === totalHearts && time) onFinishGame(true)
  }, [heartCount, time]);

  const startTimeouts = () => {
    clearElementTimeouts();
    startAppearanceTimeout();
  };

  const clearElementTimeouts = () => {
    clearTimeout(elementAppearanceTimeout);
    clearTimeout(elementDisappearanceTimeout);
  };

  const startAppearanceTimeout = () => {
    elementAppearanceTimeout = setTimeout(() => {
      setCurrentFieldElement(getRandomElement());
      startDisappearanceTimeout();
    }, Math.floor(Math.random() * (800 - 300 + 1)) + 300);
  };

  const startDisappearanceTimeout = () => {
    elementDisappearanceTimeout = setTimeout(() => {
      setCurrentFieldElement(null);
      startAppearanceTimeout();
    }, Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval);
  };

  const onElementClick = (
    event: React.MouseEvent<HTMLDivElement>,
    element: IFieldElement
  ) => {
    event.stopPropagation();
    const { points, sound } = element;
    playAudio(sound);

    let currentCount = heartCount;

    currentCount = currentCount + points;

    if (currentCount < 0) currentCount = 0;

    setHeartCount((prev) => {
      const result = prev + points;
      return result < 0 ? 0 : result;
    });

    setCurrentFieldElement(null);

    if (!isGameStarted) setIsGameStarted(true);
  };

  const getRandomElement = (): ICurrentFieldElement => {
    let randomElement: IFieldElement =
      fieldElements[Math.floor(Math.random() * fieldElements.length)];

    if (!isGameStarted) randomElement = fieldElements[0];

    const randomVerticalPos = Math.floor(Math.random() * 101);
    const randomHorizontalPos = Math.floor(Math.random() * 101);
    const randomRotation = Math.floor(Math.random() * (15 - -15 + 1)) - 15;
    const randomScale = Math.random() * (1.3 - 0.7) + 0.7;

    let styledRandomElement = {
      ...randomElement,
      styles: {
        top: `${randomVerticalPos}%`,
        left: `${randomHorizontalPos}%`,
        rotation: `${randomRotation}deg`,
        scale: randomScale,
      },
    };

    // счётчик побед
    return styledRandomElement;
  };

  const onFieldClick = () => {
    if (isGameStarted && !isGameFinished) {
      playAudio(failSound);
      setCurrentFieldElement(null);
    }
  };

  const playAudio = (file: any) => {
    const audio = new Audio(file);
    audio.play()
  };

  return (
    <GameWrapper>
      <ProgressHeartBar heartCount={heartCount} totalHearts={totalHearts} time={time} />
      <GameFieldWrapper>
        <GameField onClick={onFieldClick}>
          {currentFieldElement && (
            <FieldElement
              elementStyles={currentFieldElement.styles}
              onMouseDown={(e) => onElementClick(e, currentFieldElement)}
            >
              {currentFieldElement.icon}
            </FieldElement>
          )}
        </GameField>
      </GameFieldWrapper>
    </GameWrapper>
  );
};
