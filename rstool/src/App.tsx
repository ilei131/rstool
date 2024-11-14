import "./App.css";
import {
  CrownOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
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
      title="功能菜单"
      fixSiderbar
      route={{
        path: "/",
        routes: [
          {
            path: "/",
            name: "主页",
            icon: <CrownOutlined />,
            // access: "canAdmin",
            // component: <Home />,
          }
        ],
      }}
      location={{
        pathname: location.pathname,
      }}
      waterMarkProps={{
        content: "Assistor",
      }}
      // avatarProps={{
      //   icon: <UserOutlined />,
      //   size: "small",
      //   title: "User",
      // }}
      actionsRender={() => [
        <ReloadOutlined name="test" key="ReloadOutlined" onClick={flush} />,
        <InfoCircleOutlined key="InfoCircleOutlined" onClick={openSettings} />,
        <QuestionCircleOutlined
          key="QuestionCircleOutlined"
          onClick={openDocsFolder}
        />,
        // <MergeCellsOutlined key="MergeCellsOutlined" />,
        // <SettingOutlined onClick={openSettings} />,
      ]}
      // menuFooterRender={(props: any) => {
      //   if (props?.collapsed) return undefined;
      //   return (
      //     <p
      //       style={{
      //         textAlign: "center",
      //         color: "rgba(0,0,0,0.6)",
      //         paddingBlockStart: 12,
      //       }}
      //     >
      //       Power by Ant Design
      //     </p>
      //   );
      // }}
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
