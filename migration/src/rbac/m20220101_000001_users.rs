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
                    .table(Users::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Users::Id)
                            .uuid()
                            .not_null()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Users::Username).string()
                        .unique_key()
                        .not_null())
                    .col(ColumnDef::new(Users::Password).string().not_null())
                    .col(ColumnDef::new(Users::Email).string())
                    .col(ColumnDef::new(Users::Avatar).string())
                    .col(ColumnDef::new(Users::CreatedAt).date_time())
                    .col(ColumnDef::new(Users::UpdatedAt).date_time())
                    .col(ColumnDef::new(Users::DeletedAt).date_time())
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Users::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden, EnumIter)]
pub(crate) enum Users {
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
