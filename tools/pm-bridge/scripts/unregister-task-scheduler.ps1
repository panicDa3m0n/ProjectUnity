$ErrorActionPreference = "Stop"

$TaskName = "ProjectUnity PM Bridge"
$TaskPath = "\ProjectUnity\"

Unregister-ScheduledTask -TaskName $TaskName -TaskPath $TaskPath -Confirm:$false
Write-Host "Unregistered scheduled task: $TaskPath$TaskName"
