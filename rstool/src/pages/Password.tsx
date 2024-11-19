import { Typography, Space } from "antd";
import CurrentTime from "../components/CurrentTime";

const { Title } = Typography;

function Password() {
  
    return (
      <>
        <Title>rstool</Title>
        <Space align="start" size="large">
          <Space direction="vertical" size="large">
          <CurrentTime />
          </Space>
        </Space>
      </>
    );
  }
  
  export default Password;