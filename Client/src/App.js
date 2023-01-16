import React from "react";
import "./App.css";
import "antd/dist/reset.css";
import { Routes, Route } from "react-router-dom";
import AppHeader from "./components/common/header";
import AppFooter from "./components/common/footer";
import AppHome from "./views/home";
import { ToastContainer, toast } from 'react-toast'
import { Layout } from "antd";
import AppAbout from "./components/home/about";
import { Provider } from "react-redux";
import store from "./store";
import AppOrphanage from "./components/home/AppOrphanage";
import AppDashboard from "./components/home/AppDashboard";
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Provider store={store}>
      <Layout className="mainLayout">
        <Header>
          <AppHeader />
        </Header>
        <Content>
          <Routes>
            <Route path="/" exact element={<AppHome />} />
            <Route path="/about" exact element={<AppAbout />} />
            <Route path="/add-orphange" exact element={<AppOrphanage />} />
            <Route path="/orphange/:id" exact element={<AppDashboard/>} />
            {/* /orphange/:id */}
          </Routes>
          {/* <AppHome/> */}
        </Content>
        <ToastContainer delay={3000} />
        <Footer>
          <AppFooter />
        </Footer>
      </Layout>
    </Provider>
  );
}

export default App;
