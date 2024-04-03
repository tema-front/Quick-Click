import {
  Favorite as HeartIcon,
  HeartBrokenRounded as BrokenHearIcon,
  // FavoriteTwoTone as HeartIcon,
  // HeartBrokenTwoTone as BrokenHearIcon,
} from "@mui/icons-material";
import { BombIcon } from "assets/icons/BombIcon";
import brokenHeartSound from "assets/sounds/brokenHeartSound.mp3";
import bombSound from "assets/sounds/bombSound.mp3";
import heartSound from "assets/sounds/heartSound.mp3";

export interface IGameProps {
  totalHearts: number
  totalMinutes: number
  onFinishGame: (success: boolean) => void
}

export interface IFieldElement {
  id: string;
  icon: JSX.Element;
  duration: number;
  points: number;
  sound: any;
}

export interface ICurrentFieldElement extends IFieldElement {
  styles: ICurrentFieldElementStyles;
}

export interface ICurrentFieldElementStyles {
  top: string;
  left: string;
  rotation: string;
  scale: number;
}

export const fieldElements: IFieldElement[] = [
  {
    id: "heart",
    icon: <HeartIcon fontSize="large" color="error" />,
    duration: 300,
    points: 1,
    sound: heartSound,
  },
  {
    id: "broken_heart",
    icon: <BrokenHearIcon fontSize="large" color="error" />,
    duration: 300,
    points: -1,
    sound: brokenHeartSound,
  },
  {
    id: "bomb",
    icon: <BombIcon fontSize="large" color="error" />,
    duration: 300,
    points: -3,
    sound: bombSound,
  },
];
