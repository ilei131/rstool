import { useState } from "react";
import { Layout, Button, Input } from "antd";
import './login.less';

export const LoginPage = () => {

    const [typeView, setTypeView] = useState(0);

    return (
      <Layout
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70vh', // Full height of the viewport
          width: '70vw', // Full width of the viewport
        }}
      >
<div className="login-container">
                <div className="login-box">
                    <div className="login-text">
                        <span className={ typeView === 0 ? 'active' : '' } onClick={ () => setTypeView(0) }>登录</span>
                        <b>·</b>
                        <span className={ typeView === 1 ? 'active' : '' } onClick={ () => setTypeView(1) }>注册</span>
                    </div>

                { typeView === 0 ? 
                    <div className="right-content">
                        <div className="input-box">
                            <Input
                                type="text"
                                className="input"
                                placeholder="请输入登录邮箱/手机号"
                            />
                            <Input
                                type="password"
                                className="input"
                                maxLength={ 20 }
                                placeholder="请输入登录密码"
                            />
                        </div>
                        <Button className="loginBtn" type="primary" >立即登录</Button>
                    </div>
                    :
                    <div className="right_content">
                        <div className="input-box">
                            <Input
                                type="text"
                                className="input"
                                placeholder="请输入注册邮箱/手机号"
                            />
                            <Input
                                type="password"
                                className="input"
                                maxLength={ 20 }
                                placeholder="请输入密码"
                            />
                            <Input
                                type="password"
                                className="input"
                                maxLength={ 20 }
                                placeholder="请再次确认密码"
                            />
                        </div>
                        <Button className="loginBtn" type="primary" >立即注册</Button>
                    </div>
                }
                
                </div>

            </div>
       </Layout>
    );
  };
  
  export default LoginPage;
  