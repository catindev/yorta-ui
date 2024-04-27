// import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Main blocks
import Footer from "Blocks/Footer/Footer";
import Container from "Blocks/Container/Container";
import Logo from "Blocks/Logo/Logo";
import Content from "Blocks/Content/Content";

// Pages
import CheckOrder from "Pages/CheckOrder/CheckOrder";
import PaymentMethods from "Pages/PaymentMethods/PaymentMethods";

import { PaymentProvider } from "./PaymentContext";

function App() {
  return (
    <Router>
      <PaymentProvider>
        <Container>
          <Logo />
          <Content>
            <Routes>
              <Route path="/" element={<CheckOrder />} />
              <Route path="/payment" element={<PaymentMethods />} />
            </Routes>
          </Content>
        </Container>
        <Footer />
      </PaymentProvider>
    </Router>
  );
}

export default App;

