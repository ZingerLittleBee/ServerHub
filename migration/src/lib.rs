pub use sea_orm_migration::prelude::*;

mod m20220101_000001_create_users;
mod m20230319_114805_create_roles;
mod m20230319_115123_create_user_roles;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20220101_000001_create_users::Migration),
            Box::new(m20230319_114805_create_roles::Migration),
            Box::new(m20230319_115123_create_user_roles::Migration),
        ]
    }
}
