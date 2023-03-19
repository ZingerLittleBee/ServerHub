use std::env;
use actix_web::{get, App, HttpRequest, HttpResponse, HttpServer, middleware, web, Error, Responder};
use listenfd::ListenFd;
use sea_orm::{Database, DatabaseConnection, SqlxSqliteConnector};
use migration::{Migrator, MigratorTrait};

#[derive(Debug, Clone)]
struct AppState {
    conn: DatabaseConnection,
}

#[get("/")]
async fn list(req: HttpRequest, data: web::Data<AppState>) -> impl Responder {
    "123"
}

#[get("/new")]
async fn new(data: web::Data<AppState>) -> Result<HttpResponse, Error> {
    Ok(HttpResponse::from(HttpResponse::NotFound()))
}


#[actix_web::main]
async fn start() -> std::io::Result<()> {
    env::set_var("RUST_LOG", "debug");
    tracing_subscriber::fmt::init();

    // get env vars
    dotenvy::dotenv().ok();
    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL is not set in .env file");
    let host = env::var("HOST").expect("HOST is not set in .env file");
    let port = env::var("PORT").expect("PORT is not set in .env file");
    let server_url = format!("{host}:{port}");

    let conn = Database::connect(&db_url).await.unwrap();
    Migrator::up(&conn, None).await.unwrap();

    let state = AppState { conn };

    // create server and try to serve over socket if possible
    let mut listenfd = ListenFd::from_env();
    let mut server = HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(state.clone()))
            .wrap(middleware::Logger::default()) // enable logger
            .configure(init)
    });

    server = match listenfd.take_tcp_listener(0)? {
        Some(listener) => server.listen(listener)?,
        None => server.bind(&server_url)?,
    };

    println!("Starting server at {server_url}");
    server.run().await?;

    Ok(())
}

fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(list);
    cfg.service(new);
}

pub fn main() {
    let result = start();

    if let Some(err) = result.err() {
        println!("Error: {err}");
    }
}
