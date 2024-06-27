
New-Item -ItemType Directory -Force -Path "$PWD\out" | Out-Null
podman compose up --build
