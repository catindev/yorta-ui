import { useState, useRef, useEffect } from "react";

import Footer from "Blocks/Footer/Footer";
import Container from "Blocks/Container/Container";
import Logo from "Blocks/Logo/Logo";
import Content from "Blocks/Content/Content";
import Page from "Blocks/Page/Page";
import Preloader from "Blocks/Preloader/Preloader";
import Form from "Blocks/Form/Form";

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
          {/* <Preloader text="Pending status..." size="medium" /> */}
          <Page
            title="Оплачивай заказы не выходя из дома"
            subtitle="Введи данные по своему заказу и заплати банковской картой или QR-кодом">
            <Form onSubmit={handleSubmit} disabled={fetching} error={error} />
          </Page>
        </Content>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
