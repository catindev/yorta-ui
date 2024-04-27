import { useState, useRef, useEffect } from "react";

import Footer from "Blocks/Footer/Footer";
import Container from "Blocks/Container/Container";
import Logo from "Blocks/Logo/Logo";
import Content from "Blocks/Content/Content";

import CheckOrder from "Pages/CheckOrder/CheckOrder";
import PaymentMethods from "Pages/PaymentMethods/PaymentMethods";


import { check } from "Api";

function App() {
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);

  //TODO: унести логику в форму
  const handleSubmit = async ({ account, order, amount }) => {
    setError(false);
    setFetching(true);
    console.log("formdata", { account, order, amount });

    try {
      const response = await check({ account, order_id: order, amount });
      console.log(response)
      if (response.message && response.payment_methods) {
        // localStorage.setItem('appToken', response.token);
        // window.location.href = "/profile";
      } else setError(1);
    } catch (error) {
      console.log("error", error);
      setError(error.response.data.message);
    } finally {
      setFetching(false);
    }
  }

  return (
    <div>
      <Container>
        <Logo />
        <Content>
          <CheckOrder/>
          {/* <PaymentMethods/> */}
        </Content>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
