// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod pwmanager;
use pwmanager::{ APP_FOLDER, login, logout, create_account, logs, UserSession };
use std::fs;
use std::sync::Mutex;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    if !APP_FOLDER.exists() {
        fs::create_dir(&*APP_FOLDER).expect("failed to create app folder");
    }
    logs::initialize(&APP_FOLDER.join("logs")).expect("failed to initialize logger");
    logs::remove_old(&APP_FOLDER.join("logs")).expect("failed to remove old logs");
    tauri::Builder::default()
        .manage(Mutex::<Option<UserSession>>::default())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            login,
            logout,
            create_account,
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
