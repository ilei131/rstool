import React, { useState, useEffect} from "react";
import { Space, Button, Typography, Modal } from "antd";
import { emit, listen } from "@tauri-apps/api/event";
import { getVersion, getName, getTauriVersion } from "@tauri-apps/api/app";
import { type, arch, platform, version } from "@tauri-apps/plugin-os";

const { Text, Link } = Typography;

const App: React.FC = () => {
  // store
  const [openSettings, setOpenSettings] = useState(false);
  const [appInfo] = useState<any>({});

  const handleOk = () => {
    setOpenSettings(false);
  };

  const handleCancel = () => {
    setOpenSettings(false);
  };

  async function getAppInfo() {
    appInfo.appName = await getName();
    appInfo.appVersion = await getVersion();
    appInfo.tauriVersion = await getTauriVersion();
    appInfo.platform = await platform();
    appInfo.os = await type();
    appInfo.osVersion = await version();
    appInfo.arch = await arch();

    // console.log(appInfo);
  }

  function updateApp() {
    emit("update-app");
  }

  useEffect(() => {
    getAppInfo();

    listen("open-settings", () => {
      //setIsCheckingUpdate(false);
      setOpenSettings(true);
    });
  }, []);

  return (
    <>
      <Modal
        title="设置"
        open={openSettings}
        onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
        centered
      >
        <Space direction="vertical">
          <Space>
            <Text strong>平台信息:</Text>
            <Text strong>
              {appInfo.platform} tauri{appInfo.tauriVersion}
            </Text>
          </Space>

          <Space>
            <Text strong>软件版本:</Text>
            <Text strong>
              {appInfo.appName} v{appInfo.appVersion}
            </Text>
            <Button
              size="small"
              type="primary"
              onClick={updateApp}
              loading={false}
            >
              检查更新
            </Button>
          </Space>

          <Space>
            <Text strong>系统信息:</Text>
            <Text strong>
              {appInfo.os} {appInfo.arch} {appInfo.osVersion}
            </Text>
          </Space>

          <Space>
            <Text strong>项目详情:</Text>
            <Link
              href="https://github.com/ilei131/rstool"
              target="_blank"
            >
              https://github.com/ilei131/rstool
            </Link>
          </Space>
        </Space>
      </Modal>
    </>
  );
};

export default App;
