use taos::sync::*;

#[macro_use]
extern crate dotenvy_macro;

fn main() -> anyhow::Result<()> {
    let connection = sea_orm::Database::connect(&database_url).await?;
    Migrator::up(&connection, None).await?;
}
