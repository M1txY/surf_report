@echo off
echo 🏄‍♂️ Construction de Surf Report PWA...

echo.
echo 📦 Installation des dépendances...
call npm install

echo.
echo 🔨 Construction de l'application...
call npm run build

echo.
echo ✅ Construction terminée !
echo 📁 Les fichiers sont dans le dossier 'build'
echo 🌐 Pour tester : npm run preview

pause
