function toggleWindow(id) {
  const win = document.getElementById(id);
  const isVisible = win.style.display === 'block';

  if (!isVisible) {
    win.style.display = 'block';
    bringToFront(win);
    if (!document.getElementById('task-' + id)) {
      const taskIcon = document.createElement('button');
      taskIcon.id = 'task-' + id;
      taskIcon.className = 'taskbar-icon';
      taskIcon.innerText = id.replace('Window', '');
      taskIcon.onclick = () => toggleWindow(id);
      document.getElementById('taskbarIcons').appendChild(taskIcon);
    }
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

    // Get the title from the window's title bar
    const title = win.querySelector('.title-bar-text')?.innerText || id;
    taskIcon.innerText = title;

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

let highestZ = 1;

function makeDraggable(element) {
  const titleBar = element.querySelector('.title-bar');
  if (!titleBar) return; // skip if there's no title bar

  let offsetX = 0, offsetY = 0, isDragging = false;

  // Bring window to front on any click
  element.addEventListener('mousedown', () => {
    highestZ++;
    element.style.zIndex = highestZ;
  });

  titleBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    element.style.left = `${e.clientX - offsetX}px`;
    element.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = '';
  });
}

// Apply to all .window elements that have a title bar
document.querySelectorAll('.window').forEach(makeDraggable);