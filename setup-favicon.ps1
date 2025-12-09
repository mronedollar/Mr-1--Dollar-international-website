# Download the favicon
$faviconUrl = "https://i.postimg.cc/wv5Z9cJj/favicon.jpg"
$outputPath = "public/favicon.ico"

# Create public directory if it doesn't exist
if (-not (Test-Path "public")) {
    New-Item -ItemType Directory -Path "public" | Out-Null
}

# Download the image
Invoke-WebRequest -Uri $faviconUrl -OutFile "public/favicon.jpg"

# Check if ImageMagick is installed
$magick = Get-Command magick -ErrorAction SilentlyContinue
if ($null -eq $magick) {
    Write-Host "ImageMagick is required to convert the favicon. Please install it first."
    Write-Host "You can download it from: https://imagemagick.org/script/download.php"
    exit 1
}

# Convert to ICO format
magick convert "public/favicon.jpg" -define icon:auto-resize=64,48,32,24,16 "public/favicon.ico"

Write-Host "Favicon has been created at: $outputPath"
Write-Host "Please restart your development server to see the changes."
