import { Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Page, PageContext } from './pwmanager/utils';
import Login from "./pwmanager/Login";
import React, { useState } from 'react';
import { NoticeType } from "antd/es/message/interface";

const backPages = { login: undefined};
const pageComponents = { login: Login, start: Login, add: Login };
function Password() {
  const [page, setPage] = useState('login' as Page);
  const [messageApi] = message.useMessage();

  const goToPage = (page: Page) => {
    setPage(page);
  };
  const showAlert = (c: string, t: NoticeType = 'error') => {
    messageApi.open({
      type: t,
      content: c,
    });
  };

    return (
      <>
        {page !== 'login' && <Button type="text" icon={ <ArrowLeftOutlined/>} />}
        <PageContext.Provider value={{ goToPage, showAlert }}>
          {React.createElement(pageComponents[page])}
        </PageContext.Provider>
      </>
    );
  }
  
  export default Password;