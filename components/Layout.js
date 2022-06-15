import { Container } from "@mui/system";
import React from "react";
import Header from "./Header";
const Layout = ({ children }) => {
  return (
    <>
      <Container>
        <Header />
        {children}
      </Container>
    </>
  );
};

export default Layout;
