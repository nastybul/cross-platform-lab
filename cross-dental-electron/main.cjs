
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

function getAppointmentsFilePath() {
    return path.join(app.getPath("userData"), "appointments.json");
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        title: "Dental Clinic Desktop",
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    win.loadFile(path.join(__dirname, "dist", "index.html"));
}

ipcMain.handle("appointments:load", () => {
    const filePath = getAppointmentsFilePath();
    if (!fs.existsSync(filePath)) {
        return [];
    }
    try {
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (error) {
        console.error("Не вдалося прочитатиappointments.json:", error);
        return [];
    }
});

ipcMain.handle("appointments:save", (event, appointments) => {
    fs.writeFileSync(getAppointmentsFilePath(), JSON.stringify(appointments, null, 2), "utf-8");
    return true;
});

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});