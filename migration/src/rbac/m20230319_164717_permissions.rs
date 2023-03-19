use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Permissions::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Permissions::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Permissions::Name).string().unique_key().not_null())
                    .col(ColumnDef::new(Permissions::Description).string().not_null())
                    .col(ColumnDef::new(Permissions::CreatedAt).date_time())
                    .col(ColumnDef::new(Permissions::UpdatedAt).date_time())
                    .col(ColumnDef::new(Permissions::DeletedAt).date_time())
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Permissions::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
pub(crate) enum Permissions {
    Table,
    Id,
    Name,
    Description,
    CreatedAt,
    UpdatedAt,
    DeletedAt
}
