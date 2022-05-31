import styled from "@emotion/styled";
import React from "react";
import { Icon, IconButton, Text } from "@fluentui/react";

const Paper = styled.div`
  width: 100%;
  height: auto;
  border-radius: ${(props) => props.theme.effects.roundedCorner6};
  box-shadow: ${(props) => props.theme.effects.elevation4};
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  cursor: pointer;
  height: 55px;
  border-bottom: thin solid ${(props) => props.theme.semanticColors.bodyDivider};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: ${(props) => props.theme.spacing.m};
  padding-right: ${(props) => props.theme.spacing.m};
`;

const Content = styled.div<{ open: boolean }>`
  padding: ${(props) => (props.open ? props.theme.spacing.m : 0)};
  height: auto;
  overflow: hidden;
  transition: height 0.2s ease;
  height: ${(props) => (props.open ? "auto" : "0px")};
`;

export interface IAccordion {
  title: string;
  open?: boolean;
  children?: React.ReactNode;
}

const Accordion: React.FC<IAccordion> = (props) => {
  const { title, children } = props;
  const [open, setOpen] = React.useState(!!props.open);

  return (
    <Paper>
      <Header onClick={() => setOpen(!open)}>
        <Text variant="large" style={{ fontWeight: "bold" }} block nowrap>
          {title}
        </Text>
        <Icon
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "all 0.2s ease",
          }}
          iconName={"ChevronUp"}
        />
      </Header>
      <Content open={open}>{children}</Content>
    </Paper>
  );
};

export default Accordion;
