import styled from "@emotion/styled";
import React from "react";
import { getTheme, Icon, Text } from "@fluentui/react";
import useCopyToClipboard from "../hooks/useCopyToClipboard";

const percentageGradient: { [key: string]: string } = {
  100: "#57bb8a",
  95: "#63b682",
  90: "#73b87e",
  85: "#84bb7b",
  80: "#94bd77",
  75: "#a4c073",
  70: "#b0be6e",
  65: "#c4c56d",
  60: "#d4c86a",
  55: "#e2c965",
  50: "#f5ce62",
  45: "#f3c563",
  40: "#e9b861",
  35: "#e6ad61",
  30: "#ecac67",
  25: "#e9a268",
  20: "#e79a69",
  15: "#e5926b",
  10: "#e2886c",
  5: "#e0816d",
  0: "#dd776e",
};

const Card = styled.button`
  cursor: pointer;
  outline: none;
  border: thin solid lightgray;
  display: flex;
  border-radius: ${(props) => props.theme.effects.roundedCorner4};
  background-color: white;
  color: ${(props) => props.theme.palette.black};
  width: 200px;
  height: 50px;
  padding: 0px;
  transition: all 0.2s ease;
  &:hover,
  &:active,
  &:focus {
    box-shadow: ${(props) => props.theme.effects.elevation16};
  }
`;

const Color = styled.div<{ bgColor: string }>`
  min-width: 50px;
  max-width: 50px;
  height: 100%;
  display: grid;
  place-items: center;
  background-color: ${(props) => props.bgColor};
  border-radius: ${(props) => props.theme.effects.roundedCorner4};
  border-right: thin solid ${(props) => props.theme.semanticColors.bodyDivider};
`;

const TextWrapper = styled.div`
  flex-grow: 1;
  text-align: left;
  overflow: hidden;
  margin-top: ${(props) => props.theme.spacing.s1};
  padding-left: ${(props) => props.theme.spacing.s1};
  background-color: white;
`;

const Accuracy = styled.div<{ percent: number }>`
  // vertical text
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  border-left: thin solid ${(props) => props.theme.semanticColors.bodyDivider};
  // background based on accuracy
  background-color: ${(props) => percentageGradient[props.percent]};
  border-top-right-radius: ${(props) => props.theme.effects.roundedCorner4};
  border-bottom-right-radius: ${(props) => props.theme.effects.roundedCorner4};
`;

const isValidColor = (color: string) => {
  const s = new Option().style;
  s.color = color;
  return s.color !== "";
};

// calculate accuracy from diff, max is 0 and min is 441.6729559300637
const getAccuracy = (diff: number) => {
  const min = 442;
  return Math.round(100 - (100 * diff) / min);
};

export interface IColorCard {
  bgColor: string;
  propertyName: string;
  propertyPath: string;
  diff?: number;
}

const ColorCard: React.FC<IColorCard> = (props) => {
  const { bgColor, propertyName, propertyPath, diff } = props;
  const [, copy] = useCopyToClipboard();
  const [isValid, setIsValid] = React.useState(isValidColor(bgColor));
  const [percentage, setPercentage] = React.useState(
    (diff !== undefined && getAccuracy(diff)) || undefined
  );
  const theme = getTheme();

  React.useEffect(() => {
    diff && setPercentage(getAccuracy(diff));
  }, [diff]);

  React.useEffect(() => {
    setIsValid(isValidColor(bgColor));
  }, [bgColor]);

  return (
    <Card
      title={isValid ? propertyPath : "incorrect css color-value"}
      onClick={() => copy(propertyPath)}
    >
      <Color bgColor={(isValid && bgColor) || "white"}>
        {!isValid && (
          <Icon
            iconName="StatusCircleErrorX"
            style={{
              fontSize: "48px",
              color: "red",
            }}
          />
        )}
      </Color>
      <TextWrapper>
        <Text
          variant="small"
          block
          nowrap
          style={{ fontWeight: "bold", color: theme.palette.black }}
        >
          {propertyName}
        </Text>
        <Text block nowrap style={{ color: theme.palette.black }}>
          {bgColor}
        </Text>
      </TextWrapper>
      {percentage !== undefined && (
        <Accuracy percent={Math.round(percentage / 5) * 5}>
          <Text variant="smallPlus">{percentage} %</Text>
        </Accuracy>
      )}
    </Card>
  );
};

export default ColorCard;
