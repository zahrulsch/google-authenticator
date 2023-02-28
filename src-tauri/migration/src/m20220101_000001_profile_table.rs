use sea_orm_migration::{
    prelude::*,
    sea_orm::{ConnectionTrait, Statement},
};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let query = r#"
            CREATE TABLE IF NOT EXISTS profile (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name text not null,
                auth_code text not null,
                description text,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        "#;
        let statement = Statement::from_string(manager.get_database_backend(), query.into());

        manager
            .get_connection()
            .execute(statement)
            .await
            .map(|_| ())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let query = r#"DROP TABLE profile"#;
        let statement = Statement::from_string(manager.get_database_backend(), query.into());

        manager
            .get_connection()
            .execute(statement)
            .await
            .map(|_| ())
    }
}
