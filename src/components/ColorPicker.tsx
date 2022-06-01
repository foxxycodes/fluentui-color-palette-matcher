import React from "react";
import { ColorPicker as FluentColorPicker, IColor } from "@fluentui/react";

export interface IColorPicker {
  color?: IColor | string;
  onColorChanged?: (color: IColor) => void;
}

const ColorPicker: React.FC<IColorPicker> = (props) => {
  const { color = "#fff", onColorChanged } = props;

  return (
    <FluentColorPicker
      color={color}
      onChange={(_, color) => onColorChanged?.(color)}
      alphaType={"none"}
      showPreview={true}
      styles={{
        panel: { padding: 12 },
        root: {
          maxWidth: 352,
          minWidth: 352,
        },
        colorRectangle: { height: 200 },
      }}
    />
  );
};

export default ColorPicker;
