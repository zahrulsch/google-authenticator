use sea_orm::{Database, DatabaseConnection};
use std::sync::Arc;

use crate::error::OhMyError;
pub type Result<T> = std::result::Result<T, OhMyError>;

#[derive(Debug)]
pub struct OhMyState {
    pub db: Arc<DatabaseConnection>,
}

impl OhMyState {
    pub async fn new(db_uri: &str) -> Result<Self> {
        let db = Database::connect(db_uri).await?;
        Ok(OhMyState { db: Arc::new(db) })
    }
}

pub type State<'a> = tauri::State<'a, OhMyState>;
