import styled from "@emotion/styled";
import React from "react";
import { Text } from "@fluentui/react";
import useCopyToClipboard from "../hooks/useCopyToClipboard";

const Card = styled.button`
  cursor: pointer;
  outline: none;
  border: thin solid ${(props) => props.theme.semanticColors.bodyDivider};
  display: flex;
  border-radius: ${(props) => props.theme.effects.roundedCorner4};
  background-color: ${(props) => props.theme.palette.white};
  min-width: 200px;
  max-width: 200px;
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
  background-color: ${(props) => props.bgColor};
  border-radius: ${(props) => props.theme.effects.roundedCorner4};
  border-right: thin solid ${(props) => props.theme.semanticColors.bodyDivider};
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  padding-left: ${(props) => props.theme.spacing.m};
`;

export interface IColorCard {
  bgColor: string;
  propertyName: string;
  propertyPath: string;
}

const ColorCard: React.FC<IColorCard> = (props) => {
  const { bgColor, propertyName, propertyPath } = props;
  const [, copy] = useCopyToClipboard();

  return (
    <Card title={propertyPath} onClick={() => copy(propertyPath)}>
      <Color bgColor={bgColor} />
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
