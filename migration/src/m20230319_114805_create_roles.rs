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
                    .table(Roles::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Roles::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Roles::Title).string().not_null())
                    .col(ColumnDef::new(Roles::Description).string())
                    .col(ColumnDef::new(Roles::CreatedAt).date_time())
                    .col(ColumnDef::new(Roles::UpdatedAt).date_time())
                    .col(ColumnDef::new(Roles::DeletedAt).date_time())
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Roles::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden, EnumIter)]
pub(crate) enum Roles {
    Table,
    Id,
    Title,
    Description,
    CreatedAt,
    UpdatedAt,
    DeletedAt
}
