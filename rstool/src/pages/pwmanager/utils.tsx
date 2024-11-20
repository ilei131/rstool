import { createContext, useEffect } from 'react';
import { NoticeType } from 'antd/es/message/interface';

export type Page = 'login' | 'start' | 'add';

export type PageProps = { goToPage: (p: Page) => void, showAlert: (c: string, t?: NoticeType) => void };

export const PageContext = createContext<PageProps>({} as PageProps);

export function useAsyncEffect(effect: () => Promise<any>, deps: any[]) {
    useEffect(() => { effect().catch(console.error); }, deps)
}

export const validEmail = (val: any) =>  {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val);
}
  
export const validPhone = (val: any) => {
    return /^1[3456789]\d{9}$/.test(val);
}

export const validUserName = (name: any) => {
    return validEmail(name) || validPhone(name);
}

export const validPass = (val: any) => {
    return /^[a-zA-Z\d]{8,20}$/.test(val);
}