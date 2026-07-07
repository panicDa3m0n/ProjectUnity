$ErrorActionPreference = "Stop"

$BridgeRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $BridgeRoot

npm install
npm run build
