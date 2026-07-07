$ErrorActionPreference = "Stop"

$BridgeRoot = Split-Path -Parent $PSScriptRoot
$StartScript = Join-Path $PSScriptRoot "start-bridge.ps1"
$TaskName = "ProjectUnity PM Bridge"
$TaskPath = "\ProjectUnity\"

# Before registering this task, store PM_BRIDGE_TOKEN safely in the user's
# environment or in an uncommitted tools\pm-bridge\.env file. The bridge refuses
# to start with a missing, empty, or "change-me" token unless
# PROJECTUNITY_DRY_RUN=true.

$Action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$StartScript`"" -WorkingDirectory $BridgeRoot
$Trigger = New-ScheduledTaskTrigger -AtLogOn
$Principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel LeastPrivilege

Register-ScheduledTask -TaskName $TaskName -TaskPath $TaskPath -Action $Action -Trigger $Trigger -Principal $Principal -Description "Starts the local ProjectUnity PM bridge at user logon." -Force
Write-Host "Registered scheduled task: $TaskPath$TaskName"
