$ErrorActionPreference = "Stop"

$BridgeRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $BridgeRoot

$envFile = Join-Path $BridgeRoot ".env"
if (Test-Path -LiteralPath $envFile) {
  Get-Content -LiteralPath $envFile | ForEach-Object {
    $line = $_.Trim()
    if ($line -and -not $line.StartsWith("#") -and $line.Contains("=")) {
      $parts = $line.Split("=", 2)
      [Environment]::SetEnvironmentVariable($parts[0], $parts[1], "Process")
    }
  }
}

if (-not $env:PM_BRIDGE_HOST) { $env:PM_BRIDGE_HOST = "127.0.0.1" }
if (-not $env:PM_BRIDGE_PORT) { $env:PM_BRIDGE_PORT = "4387" }

$dryRun = $env:PROJECTUNITY_DRY_RUN -match '^(?i:true|1|yes|on)$'
$tokenMissing = [string]::IsNullOrWhiteSpace($env:PM_BRIDGE_TOKEN) -or $env:PM_BRIDGE_TOKEN -eq "change-me"
if ($tokenMissing -and -not $dryRun) {
  Write-Error "PM_BRIDGE_TOKEN must be set to a real non-placeholder value before startup. Set it in the user environment or an uncommitted tools\\pm-bridge\\.env file. PROJECTUNITY_DRY_RUN=true is the only tokenless startup mode."
}

Write-Host "Starting ProjectUnity PM bridge at http://$($env:PM_BRIDGE_HOST):$($env:PM_BRIDGE_PORT)"
npm run start
