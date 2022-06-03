import styled from "@emotion/styled";
import React from "react";
import { Text } from "@fluentui/react";

const FieldSet = styled.fieldset`
  overflow: hidden;
  border: 2px solid gray;
  border-radius: ${(props) => props.theme.effects.roundedCorner6};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export interface IGroup {
  title: string;
}

const Group: React.FC<IGroup> = (props) => {
  const { title, children } = props;

  return (
    <FieldSet>
      <legend>
        <Text style={{ fontWeight: "bold" }} variant="mediumPlus" block nowrap>
          {title}
        </Text>
      </legend>
      {children}
    </FieldSet>
  );
};

export default Group;
