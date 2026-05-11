@echo off
REM Set Node.js path
set PATH=C:\Program Files\nodejs;%PATH%

REM Change to project directory
cd /d D:\report

REM Install dependencies
npm install

REM Start development server
npm run dev
