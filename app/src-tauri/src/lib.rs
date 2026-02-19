use tauri::Manager;

#[tauri::command]
fn resize_window(window: tauri::WebviewWindow, width: f64, height: f64) -> Result<(), String> {
    println!(
        "Resize command called with width: {}, height: {}",
        width, height
    );
    window
        .set_size(tauri::Size::Logical(tauri::LogicalSize { width, height }))
        .map_err(|e| e.to_string())?;
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![resize_window])
        .setup(|app| {
            let window = app
                .get_webview_window("main")
                .expect("main window not found");

            window.set_always_on_top(true)?;
            window.set_decorations(false)?;
            window.set_fullscreen(false)?;
            window.set_resizable(false)?;
            window.set_skip_taskbar(true)?;
            window.set_ignore_cursor_events(false)?;
            window.center()?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
