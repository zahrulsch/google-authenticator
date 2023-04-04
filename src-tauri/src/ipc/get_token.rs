use crate::{error::MyError, prelude::*};
use entity::profile;
use google_authenticator::GoogleAuthenticator;
use sea_orm::EntityTrait;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Token {
    pub id: i64,
    pub name: String,
    pub token: String,
}

#[tauri::command]
pub async fn get_token(state: State<'_>, id: i64) -> Result<Token> {
    let db = state.db.clone();
    let Some(profile) = profile::Entity::find_by_id(id).one(&*db).await? else {
        return Err(MyError::to_oh_my_error("Profile tidak ditemukan"))
    };

    let mut auth_code = profile.auth_code;
    auth_code.retain(|c| !c.is_whitespace());

    let ga = GoogleAuthenticator::new();
    let token = ga.get_code(&auth_code, 0)?;

    Ok(Token {
        id: profile.id,
        name: profile.name,
        token
    })
}
