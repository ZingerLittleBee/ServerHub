pub use sea_orm_migration::prelude::*;

mod rbac;
use rbac::*;


pub struct Migrator;


#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20220101_000001_users::Migration),
            Box::new(m20230319_114805_roles::Migration),
            Box::new(m20230319_164717_permissions::Migration),
            Box::new(m20230319_165023_role_permissions::Migration),
            Box::new(m20230319_115123_user_roles::Migration),
        ]
    }
}
