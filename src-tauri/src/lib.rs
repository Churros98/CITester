use serialport::{available_ports, SerialPort, SerialPortInfo};
use tauri::{Manager, State};
use tauri_plugin_sql::Migration;
use std::{sync::Mutex, time::Duration};

#[derive(Default)]
struct AppState {
  port: Option<Box<dyn SerialPort>>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        // Define your migrations here
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "CREATE TABLE chips (id INTEGER PRIMARY KEY, name TEXT, frames LONGTEXT);",
            kind: tauri_plugin_sql::MigrationKind::Up,
        }
    ];

    tauri::Builder::default()
        .setup(|app| {
            app.manage(Mutex::new(AppState {
                port: None
            }));
            Ok(())
        })
        .plugin(
            tauri_plugin_sql::Builder::new()
            .add_migrations("sqlite:citester.db", migrations)
            .build()
        )
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![is_serial_port_open, get_available_ports, open_port, close_port, send_data, read_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn is_serial_port_open(state: State<'_, Mutex<AppState>>) -> bool {
    let state = state.lock().unwrap();
    state.port.is_some()
}

#[tauri::command]
fn get_available_ports() -> Vec<SerialPortInfo> {
    let ports = available_ports().unwrap();
    ports
}

#[tauri::command]
fn open_port(state: State<'_, Mutex<AppState>>, port_name: &str) -> bool {
    let mut state = state.lock().unwrap();
    match serialport::new(port_name, 9600).open() {
        Ok(mut opened_port) => {
            let _ = opened_port.set_timeout(Duration::from_secs(1));
            let _ = opened_port.write_data_terminal_ready(true);
            let _ = opened_port.write_request_to_send(true);

            state.port = Some(opened_port);
            true
        }
        Err(_) => false
    }
}

#[tauri::command]
fn close_port(state: State<'_, Mutex<AppState>>) {
    let mut state = state.lock().unwrap();
    state.port = None;
}

#[tauri::command]
fn send_data(state: State<'_, Mutex<AppState>>, data: &str) -> Result<(), String> {
    let mut state = state.lock().unwrap();
    match state.port.as_mut() {
        Some(p) => {
            match p.write_all(data.as_bytes()) {
                Ok(_) => Ok(()),
                Err(e) => Err(e.to_string()),
            }
        }
        None => Err("Port not open".to_string()),
    }
}

#[tauri::command]
fn read_data(state: State<'_, Mutex<AppState>>, length: usize) -> Result<String, String> {
    let mut state = state.lock().unwrap();

    let mut data = vec![0; length];
    let mut counter = 0;

    match state.port.as_mut() {
        Some(p) =>{
            loop {
                let mut buffer = vec![0; length - counter];
                match p.read(&mut buffer) {
                    Ok(len) => {
                        data.extend_from_slice(&buffer[..len]);
                        counter += len;
                        if counter >= length {
                            return Ok(String::from_utf8_lossy(&data).to_string())
                        }
                    },
                    Err(e) => {
                        return Err(e.to_string());
                    },
                }
            }
        },
        None => Err("Port not open".to_string()),
    }
}

