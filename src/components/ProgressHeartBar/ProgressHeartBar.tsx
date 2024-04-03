import { FC, useMemo } from "react";
import {
  FavoriteBorderRounded as EmptyHeartIcon,
  Favorite as HeartIcon,
} from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { IProgressHeartBarProps } from "./ProgressHeartBar.types";
import { ProgressTitle } from "./ProgressHeartBar.styles";

export const ProgressHeartBar: FC<IProgressHeartBarProps> = ({
  heartCount,
  totalHearts,
  time,
}) => {
  const heartListByCount = useMemo(() => {
    const heartList = [];

    for (let i = 0; i < totalHearts; i++) {
      if (i < heartCount)
        heartList.push(<HeartIcon fontSize="medium" color="error" />);
      else heartList.push(<EmptyHeartIcon fontSize="medium" color="error" />);
    }

    return heartList;
  }, [heartCount]);

  return (
    <Stack alignItems={"center"} spacing={1}>
      <Stack direction={"row"} justifyContent={"space-between"} spacing={3}>
        <ProgressTitle style={{ width: "64px" }}>{time}s</ProgressTitle>
        <ProgressTitle style={{ width: "105px" }}>
          {heartCount} / {totalHearts}
        </ProgressTitle>
      </Stack>

      <Stack
        direction={"row"}
        justifyContent={"center"}
        spacing={0.5}
        flexWrap={"wrap"}
      >
        {heartListByCount.map((heart) => heart)}
      </Stack>
    </Stack>
  );
};
