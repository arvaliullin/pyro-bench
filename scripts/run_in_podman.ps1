Remove-Item -Recurse -ErrorAction SilentlyContinue $PWD\out
New-Item -ItemType Directory -Force -Path "$PWD\out" | Out-Null


podman compose up --build
