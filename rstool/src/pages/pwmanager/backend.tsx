import { invoke, InvokeArgs } from '@tauri-apps/api/core';

export type Credentials = { username: string, password: string };

async function call<T = undefined>(fn: string, args?: InvokeArgs): Promise<{ ok: true; value: T } | { ok: false; error: string }> {
  try {
    return { ok: true, value: await invoke<T>(fn, args) };
  } catch (e: any) {
    return { ok: false, error: e.error };
  }
}

export const login = (username: string, password: string) => call('login', { username, password });
export const logout = () => call('logout');
export const create_account = (username: string, password: string) => call('create_account', { username, password });
export const fetch_credentials = () => call<string[]>('fetch_credentials');