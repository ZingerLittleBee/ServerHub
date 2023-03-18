use sea_orm_migration::prelude::*;
use sea_orm::EnumIter;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(User::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(User::Id)
                            .uuid()
                            .not_null()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(User::Username).string()
                        .unique_key()
                        .not_null())
                    .col(ColumnDef::new(User::Password).string().not_null())
                    .col(ColumnDef::new(User::Email).string())
                    .col(ColumnDef::new(User::Avatar).string())
                    .col(ColumnDef::new(User::CreatedAt).date_time())
                    .col(ColumnDef::new(User::UpdatedAt).date_time())
                    .col(ColumnDef::new(User::DeletedAt).date_time())
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(User::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden, EnumIter)]
enum User {
    Table,
    Id,
    Email,
    Username,
    Password,
    Avatar,
    CreatedAt,
    UpdatedAt,
    DeletedAt
}
