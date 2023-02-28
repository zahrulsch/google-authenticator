use crate::{error::MyError, prelude::*};
use entity::profile;
use sea_orm::{EntityTrait, Set};

#[tauri::command]
pub async fn add_profile(state: State<'_>, name: String, auth_code: String) -> Result<String> {
    let db = state.db.clone();

    if name.is_empty() {
        return Err(MyError::to_oh_my_error("Nama profile tidak boleh kosong"));
    }

    if auth_code.is_empty() {
        return Err(MyError::to_oh_my_error(
            "Auth Code profile tidak boleh kosong",
        ));
    }

    let profile = profile::ActiveModel {
        auth_code: Set(auth_code),
        name: Set(name),
        ..Default::default()
    };

    profile::Entity::insert(profile).exec(&*db).await?;

    Ok("Sukses".into())
}
