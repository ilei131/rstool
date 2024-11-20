import { useState, useContext } from "react";
import { Layout, Button, Input, message } from "antd";
import './login.less';
import { create_account, login, logout } from './backend';
import { PageContext, useAsyncEffect, validUserName, validPass } from './utils';

export const LoginPage = () => {

    const [typeView, setTypeView] = useState(0);
    const { goToPage } = useContext(PageContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCopy, setPasswordCopy] = useState('');

    useAsyncEffect(logout, []);

    const onClickLogin = async () => {
        if (!validUserName(username)) {
          message.error('请输入正确的邮箱/手机号');
          return false;
        }
    
        if (!validPass(password)) {
          message.error('密码应为8到20位字母或数字！');
          return false;
        }
        const res = await login(username, password);
        if (!res.ok)  {
          message.error(res.error);
          return false;
        }
        goToPage('start');
      };

    const onClickSign = async () => {
      if (!validUserName(username)) {
        message.error("请输入正确的邮箱/手机号");
        return false;
      } else if (!validPass(password)) {
        message.error("密码应为8到20位字母或数字！");
        return false;
      } else if (!validPass(passwordCopy)){
        message.error("确认密码有误");
        return false;
      } else if (password !== passwordCopy){
        message.error("两次密码不一致");
        return false;
      }
      const res = await create_account(username, password);
      if (!res.ok)  {
        message.error(res.error);
        return false;
      }
      goToPage('start');
    };

    const handleTab = (type: number) => {
        setTypeView(type);
        clearInput();
      };

          // 清空输入框
    const clearInput = () => {
        setUsername('');
        setPassword('');
        setPasswordCopy('');
    }

    return (
        <Layout
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh', // Full height of the viewport
                width: '80vw', // Full width of the viewport
            }}
        >
            <div className="login-container">
                <div className="login-box">
                    <div className="login-text">
                        <span className={typeView === 0 ? 'active' : ''} onClick={() => handleTab(0)}>登录</span>
                        <b>·</b>
                        <span className={typeView === 1 ? 'active' : ''} onClick={() => handleTab(1)}>注册</span>
                    </div>

                    {typeView === 0 ?
                        <div className="right-content">
                            <div className="input-box">
                                <Input
                                    type="text"
                                    className="input"
                                    value={username}
                                    onChange={(e: any) => setUsername(e.target.value)}
                                    placeholder="请输入登录邮箱/手机号"
                                />
                                <Input
                                    type="password"
                                    className="input"
                                    maxLength={20}
                                    value={password}
                                    onChange={(e: any) => setPassword(e.target.value)}
                                    placeholder="请输入登录密码"
                                />
                            </div>
                            <Button className="loginBtn" type="primary" onClick={onClickLogin}>立即登录</Button>
                        </div>
                        :
                        <div className="right_content">
                            <div className="input-box">
                                <Input
                                    type="text"
                                    className="input"
                                    value={username}
                                    onChange={(e: any) => setUsername(e.target.value)}
                                    placeholder="请输入注册邮箱/手机号"
                                />
                                <Input
                                    value={password}
                                    onChange={(e: any) => setPassword(e.target.value)}
                                    type="password"
                                    className="input"
                                    maxLength={20}
                                    placeholder="请输入密码"
                                />
                                <Input
                                    value={passwordCopy}
                                    onChange={(e: any) => setPasswordCopy(e.target.value)}
                                    type="password"
                                    className="input"
                                    maxLength={20}
                                    placeholder="请再次确认密码"
                                />
                            </div>
                            <Button className="loginBtn" type="primary" onClick={onClickSign}>立即注册</Button>
                        </div>
                    }

                </div>

            </div>
        </Layout>
    );
};

export default LoginPage;
