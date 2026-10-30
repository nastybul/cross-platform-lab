
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("dentalAPI", {
    loadAppointments: () => ipcRenderer.invoke("appointments:load"),
    saveAppointments: (appointments) => ipcRenderer.invoke("appointments:save", appointments),
});