import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Password from "./pages/Password";
import { ConfigProvider, theme } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import zhCN from "antd/locale/zh_CN";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
      locale={zhCN}
    >
      <Settings />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/password" element={<Password />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
