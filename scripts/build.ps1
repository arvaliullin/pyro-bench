
Copy-Item "$(go env GOROOT)\misc\wasm\wasm_exec.js" $PWD\src

# Build Go WebAssembly
$env:GOARCH = "wasm"
$env:GOOS = "js"
go build -o $PWD\public\lib_go.out.wasm $PWD\pkg\lib.go

# npm install
npm run start

# Remove-Item -Recurse -ErrorAction SilentlyContinue $PWD\out
# New-Item -ItemType Directory -Force -Path "$PWD\out" | Out-Null
