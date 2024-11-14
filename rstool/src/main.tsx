import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Home from "./pages/Home";
import { ConfigProvider, theme } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import zhCN from "antd/locale/zh_CN";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
      locale={zhCN}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
