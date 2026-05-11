#!/usr/bin/env pwsh

# Set Node.js path
$env:PATH = "C:\Program Files\nodejs;$env:PATH"

# Change to project directory
Set-Location -Path "D:\report"

# Install dependencies
& npm install

# Start development server
& npm run dev
