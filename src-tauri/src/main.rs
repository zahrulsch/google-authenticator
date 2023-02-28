#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod error;
mod ipc;
mod prelude;

use ipc::{add_profile, get_profiles};
use migration::{Migrator, MigratorTrait};
use prelude::*;

#[tokio::main]
async fn main() -> Result<()> {
    let db_uri = "sqlite://data/database.db";
    let state = OhMyState::new(db_uri).await?;

    Migrator::up(&*state.db, None).await?;

    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![add_profile, get_profiles])
        .run(tauri::generate_context!())
        .expect("error while running application");

    Ok(())
}
