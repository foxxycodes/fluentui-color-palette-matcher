import styled from "@emotion/styled";
import React from "react";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  height: 100vh;
  width: 100%;
`;

const SettingsPanel = styled.div`
  height: 100%;
  /* background-color: gray; */
  padding: ${(props) => props.theme.spacing.m};
  border-right: thin solid ${(props) => props.theme.semanticColors.bodyDivider};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  /* background-color: gray; */
  padding: ${(props) => props.theme.spacing.m};
`;

export interface ILayout {
  content?: React.ReactNode;
  settingsPanel?: React.ReactNode;
}

const Layout: React.FC<ILayout> = (props) => {
  const { settingsPanel, content } = props;

  return (
    <Wrapper>
      {settingsPanel && <SettingsPanel>{settingsPanel}</SettingsPanel>}
      {content && <Content>{content}</Content>}
    </Wrapper>
  );
};

export default Layout;
