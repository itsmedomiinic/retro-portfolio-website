function toggleWindow(id) {
    const win = document.getElementById(id);
    if (win.style.display === 'none' || !win.style.display) {
      win.style.display = 'block';
    } else {
      win.style.display = 'none';
    }
}
  
function closeWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'none';

    // Also remove from taskbar if present
    const taskIcon = document.getElementById('task-' + id);
    if (taskIcon) taskIcon.remove();
}
  
function minimizeWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'none';

    // Add to taskbar if not already there
    if (!document.getElementById('task-' + id)) {
        const taskIcon = document.createElement('button');
        taskIcon.id = 'task-' + id;
        taskIcon.className = 'taskbar-icon';
        taskIcon.innerText = id.replace('Window', '');
        taskIcon.onclick = () => {
        toggleWindow(id);
        };
        document.getElementById('taskbarIcons').appendChild(taskIcon);
    }
}
  
function toggleStartMenu() {
    const menu = document.getElementById('startMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}
  
function bringToFront(win) {
    const windows = document.querySelectorAll('.window');
    windows.forEach(w => w.style.zIndex = 10);
    win.style.zIndex = 100;
}