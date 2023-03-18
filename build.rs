use std::fs;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let proto_dir = "proto";

    let mut protos = Vec::new();
    for entry in fs::read_dir(proto_dir)? {
        let entry = entry?;
        if entry.path().extension().map_or(false, |ext| ext == "proto") {
            protos.push(entry.path());
        }
    }

    tonic_build::configure()
        .build_server(true)
        .build_client(true)
        .compile(&protos, &[proto_dir])?;

    Ok(())
}
