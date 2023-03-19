use sea_orm_migration::prelude::*;
use crate::rbac::m20230319_114805_roles::Roles;
use crate::rbac::m20230319_164717_permissions::Permissions;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(RolePermissions::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(RolePermissions::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(RolePermissions::RoleId).uuid().not_null())
                    .foreign_key(ForeignKey::create()
                        .name("fk-role_permissions-role_id")
                        .from(RolePermissions::Table, RolePermissions::RoleId)
                        .to(Roles::Table, Roles::Id)
                        .on_delete(ForeignKeyAction::Cascade)
                        .on_update(ForeignKeyAction::Cascade)
                    )
                    .col(ColumnDef::new(RolePermissions::PermissionId).string().not_null())
                    .foreign_key(ForeignKey::create()
                        .name("fk-role_permissions-permission_id")
                        .from(RolePermissions::Table, RolePermissions::PermissionId)
                        .to(Permissions::Table, Permissions::Id)
                        .on_delete(ForeignKeyAction::Cascade)
                        .on_update(ForeignKeyAction::Cascade)
                    )
                    .col(ColumnDef::new(RolePermissions::CreatedAt).date_time())
                    .col(ColumnDef::new(RolePermissions::UpdatedAt).date_time())
                    .col(ColumnDef::new(RolePermissions::DeletedAt).date_time())
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(RolePermissions::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
enum RolePermissions {
    Table,
    Id,
    RoleId,
    PermissionId,
    CreatedAt,
    UpdatedAt,
    DeletedAt
}
