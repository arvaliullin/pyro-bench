# Вывод информации о системе
Write-Host "Информация о системе:"
Write-Host "Система: " (Get-WmiObject win32_operatingsystem).Caption
Write-Host "Версия: " (Get-WmiObject win32_operatingsystem).Version
Write-Host "Архитектура: " (Get-WmiObject win32_operatingsystem).OSArchitecture
Write-Host "Процессор: " (Get-WmiObject win32_processor).Name
Write-Host "Количество ядер процессора: " (Get-WmiObject win32_processor).NumberOfCores
