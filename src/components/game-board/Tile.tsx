import React, { useEffect } from "react";
import styles from "../../sass/tileStyles.module.scss";
import { useSelector } from "react-redux";
import {
  calculateValues,
  decideColorFn,
  playPopupSound,
} from "../../services/helperFunctions";
import { RootState } from "@/store/rootReducer";

interface IProps {
  value: number | null;
  x: number;
  y: number;
}

export const Tile: React.FC<IProps> = ({ value, x, y }) => {
  const { tileWidth, newTileCoords, positionsArr, font_size, gap, screen } =
    useSelector((state: RootState) => state.game);
  const { isMuted } = useSelector((state: RootState) => state.modal);

  const isNewTile = () => {
    return newTileCoords.some((coord) => coord[0] === x && coord[1] === y);
  };

  const isMergedTile = () => {
    return positionsArr.some(
      (pos) =>
        pos.finalCoords.row === x &&
        pos.finalCoords.column === y &&
        pos.isMerged
    );
  };

  const fnValues = calculateValues(tileWidth, gap, font_size, screen);

  useEffect(() => {
    if (isNewTile()) playPopupSound(isMuted);
  }, []);

  return (
    <div
      className={`${styles.tile} ${isNewTile() ? styles.animate : ""} ${
        isMergedTile() ? styles.merge_animate : ""
      }`}
      style={{
        backgroundColor: `${decideColorFn(value)[0]}`,
        color: `${decideColorFn(value)[1]}`,
        height: `${fnValues[0]}rem`,
        width: `${fnValues[0]}rem`,
        fontSize: `${fnValues[2]}rem`,
      }}
    >
      {value}
    </div>
  );
};

export default Tile;
