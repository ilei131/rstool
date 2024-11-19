import "./App.css";
import {
  ToolOutlined ,
  InfoCircleOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
  KeyOutlined
} from "@ant-design/icons";

import { ProLayout } from "@ant-design/pro-components";
import { emit } from "@tauri-apps/api/event";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { openDocsFolder } from "./utils/fs";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  function flush() {
    navigate(0);
  }

  function goHome() {
    navigate("/");
  }

  function openSettings() {
    emit("open-settings");
  }
  
  return (
    <ProLayout
      title="rstool"
      logo="../src-tauri/icons/icon.png"
      fixSiderbar
      route={{
        path: "/",
        routes: [
          {
            path: "/",
            name: "主页",
            icon: <ToolOutlined  />,
          },
          {
            path: "/password",
            name: "密码",
            icon: <KeyOutlined  />,
          }
        ],
      }}
      location={{
        pathname: location.pathname,
      }}
      waterMarkProps={{
        content: "rstool",
      }}
      actionsRender={() => [
        <ReloadOutlined name="test" key="ReloadOutlined" onClick={flush} />,
        <InfoCircleOutlined key="InfoCircleOutlined" onClick={openSettings} />,
        <QuestionCircleOutlined
          key="QuestionCircleOutlined"
          onClick={openDocsFolder}
        />,
      ]}
      onMenuHeaderClick={(_: any) => goHome()}
      menuItemRender={(item: any, dom: any) => (
        <Link to={item.path}>{dom}</Link>
      )}
    >
      <Outlet />
    </ProLayout>
  );
}

export default App;
