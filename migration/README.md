# Running Migrator CLI

- Generate a new migration file
    ```sh
    cargo run -- migrate generate MIGRATION_NAME
    # or
    sea-orm-cli migrate generate MIGRATION_NAME
    ```
- Apply all pending migrations
    ```sh
    cargo run
    ```
    ```sh
    cargo run -- up
    ```
- Apply first 10 pending migrations
    ```sh
    cargo run -- up -n 10
    ```
- Rollback last applied migrations
    ```sh
    cargo run -- down
    ```
- Rollback last 10 applied migrations
    ```sh
    cargo run -- down -n 10
    ```
- Drop all tables from the database, then reapply all migrations
    ```sh
    cargo run -- fresh
    ```
- Rollback all applied migrations, then reapply all migrations
    ```sh
    cargo run -- refresh
    ```
- Rollback all applied migrations
    ```sh
    cargo run -- reset
    ```
- Check the status of all migrations
    ```sh
    cargo run -- status
    ```

- Generating Entity Files
    ```sh
    sea-orm-cli generate entity -o entity/src
    ```
  
  [Read More Generating Entity Files](https://www.sea-ql.org/SeaORM/docs/generate-entity/sea-orm-cli/)
