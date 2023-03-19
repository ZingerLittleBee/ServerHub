use sea_orm_migration::prelude::*;
use crate::rbac::m20220101_000001_users::Users;
use crate::rbac::m20230319_114805_roles::Roles;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(UserRoles::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(UserRoles::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(UserRoles::UserId).uuid().not_null())
                    .foreign_key(ForeignKey::create()
                        .name("fk-user_roles-user_id")
                        .from(UserRoles::Table, UserRoles::UserId)
                        .to(Users::Table, Users::Id)
                        .on_delete(ForeignKeyAction::Cascade)
                        .on_update(ForeignKeyAction::Cascade)
                    )
                    .col(ColumnDef::new(UserRoles::RoleId).string().not_null())
                    .foreign_key(ForeignKey::create()
                        .name("fk-user_roles-role_id")
                        .from(UserRoles::Table, UserRoles::RoleId)
                        .to(Roles::Table, Roles::Id)
                        .on_delete(ForeignKeyAction::Cascade)
                        .on_update(ForeignKeyAction::Cascade)
                    )
                    .col(ColumnDef::new(Roles::CreatedAt).date_time())
                    .col(ColumnDef::new(Roles::UpdatedAt).date_time())
                    .col(ColumnDef::new(Roles::DeletedAt).date_time())
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(UserRoles::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
enum UserRoles {
    Table,
    Id,
    UserId,
    RoleId,
    CreatedAt,
    UpdatedAt,
    DeletedAt
}
