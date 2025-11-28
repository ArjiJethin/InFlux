@echo off
echo Installing frontend dependencies...
cd frontend
call npm install
echo.
echo Frontend dependencies installed successfully!
echo.
echo To start the development server, run:
echo   cd frontend
echo   npm run dev
echo.
pause
