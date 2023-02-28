use crate::prelude::*;
// use sea_orm::JsonValue;
use entity::profile;
use sea_orm::{ColumnTrait, EntityTrait, JsonValue, PaginatorTrait, QueryFilter, QueryOrder};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Profiles {
    pub pages: u64,
    pub count: u64,
    pub items: Vec<JsonValue>,
}

#[tauri::command]
pub async fn get_profiles(
    state: State<'_>,
    name: Option<String>,
    page: Option<u64>,
) -> Result<Profiles> {
    let db = state.db.clone();
    let page = page.unwrap_or(0);
    let mut profiles_pages = profile::Entity::find();

    if let Some(name) = name {
        if !name.is_empty() {
            profiles_pages = profiles_pages.filter(profile::Column::Name.like(&name));
        }
    }

    let end = profiles_pages
        .order_by_desc(profile::Column::CreatedAt)
        .into_json()
        .paginate(&*db, 10);

    let profiles = end.fetch_page(page).await?;
    let count = end.num_items().await?;
    let pages = end.num_pages().await?;

    let result = Profiles {
        count,
        pages,
        items: profiles,
    };

    Ok(result)
}
