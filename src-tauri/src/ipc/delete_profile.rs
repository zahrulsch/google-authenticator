use crate::prelude::*;
use entity::profile;
use sea_orm::EntityTrait;

#[tauri::command]
pub async fn delete_profile(state: State<'_>, id: i64) -> Result<String> {
    let db = state.db.clone();
    profile::Entity::delete_by_id(id).exec(&*db).await?;

    Ok("Record berhasil dihapus".into())
}
