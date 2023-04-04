#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod error;
mod ipc;
mod prelude;

use ipc::{add_profile, delete_profile, get_profiles, get_token};
use migration::{Migrator, MigratorTrait};
use prelude::*;

#[tokio::main]
async fn main() -> Result<()> {
    let mut db_uri = String::from("sqlite://data/database.db?mode=rw");

    if std::cfg!(dev) {
        db_uri = String::from("sqlite://data/database_dev.db?mode=rw");
    }

    let state = OhMyState::new(&db_uri).await?;

    Migrator::up(&*state.db, None).await?;

    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![
            add_profile,
            get_profiles,
            get_token,
            delete_profile
        ])
        .run(tauri::generate_context!())
        .expect("error while running application");

    Ok(())
}
