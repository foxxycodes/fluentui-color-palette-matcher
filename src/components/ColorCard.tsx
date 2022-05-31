import styled from "@emotion/styled";
import React from "react";
import { Icon, Text } from "@fluentui/react";
import useCopyToClipboard from "../hooks/useCopyToClipboard";

const Card = styled.button`
  cursor: pointer;
  outline: none;
  border: thin solid ${(props) => props.theme.semanticColors.bodyDivider};
  display: flex;
  border-radius: ${(props) => props.theme.effects.roundedCorner4};
  background-color: ${(props) => props.theme.palette.white};
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
  height: 100%;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  background-color: ${(props) => props.bgColor};
  border-radius: ${(props) => props.theme.effects.roundedCorner4};
  border-right: thin solid ${(props) => props.theme.semanticColors.bodyDivider};
`;

const TextWrapper = styled.div`
  flex-grow: 1;
  text-align: left;
  overflow: hidden;
  margin-top: ${(props) => props.theme.spacing.s1};
  height: 100%;
  padding-left: ${(props) => props.theme.spacing.s1};
`;

const isValidColor = (color: string) => {
  const s = new Option().style;
  s.color = color;
  return s.color !== "";
};

export interface IColorCard {
  bgColor: string;
  propertyName: string;
  propertyPath: string;
}

const ColorCard: React.FC<IColorCard> = (props) => {
  const { bgColor, propertyName, propertyPath } = props;
  const [, copy] = useCopyToClipboard();
  const [isValid, setIsValid] = React.useState(isValidColor(bgColor));

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
              fontSize: "50px",
              color: "red",
            }}
          />
        )}
      </Color>
      <TextWrapper>
        <Text variant="small" block nowrap style={{ fontWeight: "bold" }}>
          {propertyName}
        </Text>
        <Text block nowrap>
          {bgColor}
        </Text>
      </TextWrapper>
    </Card>
  );
};

export default ColorCard;
