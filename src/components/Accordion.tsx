import styled from "@emotion/styled";
import React from "react";
import { getTheme, Icon, IconButton, Text } from "@fluentui/react";
import { AnimatePresence, motion } from "framer-motion";

const Paper = styled.div`
  max-width: 100%;
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
  gap: ${(props) => props.theme.spacing.s1};
  align-items: center;
  justify-content: space-between;
  padding-left: ${(props) => props.theme.spacing.m};
  padding-right: ${(props) => props.theme.spacing.m};
`;

const Content = styled(motion.div)`
  padding: ${(props) => props.theme.spacing.m};
  overflow: hidden;
`;

export interface IAccordion {
  title: string;
  open?: boolean;
  children?: React.ReactNode;
}

const Accordion: React.FC<IAccordion> = (props) => {
  const { title, children } = props;
  const [open, setOpen] = React.useState(!!props.open);
  const theme = getTheme();

  return (
    <Paper>
      <Header onClick={() => setOpen(!open)}>
        <Text variant="large" style={{ fontWeight: "bold" }} block nowrap>
          {title}
        </Text>
        <Icon
          style={{
            transform: open ? "rotate(0deg)" : "rotate(180deg)",
            transition: "all 0.2s ease",
          }}
          iconName={"ChevronUp"}
        />
      </Header>
      <AnimatePresence>
        {open && (
          <Content
            initial={{ height: 0, padding: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, padding: theme.spacing.m }}
            exit={{ height: 0, padding: 0, opacity: 0 }}
          >
            {children}
          </Content>
        )}
      </AnimatePresence>
    </Paper>
  );
};

export default Accordion;
