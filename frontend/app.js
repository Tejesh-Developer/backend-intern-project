const API = "http://127.0.0.1:8000/api/v1";

function showTab(tab) {
    document.getElementById('login').style.display = tab === 'login' ? 'block' : 'none';
    document.getElementById('register').style.display = tab === 'register' ? 'block' : 'none';
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
}

async function registerUser() {
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const msg = document.getElementById('reg-msg');

    try {
        const res = await fetch(`${API}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const data = await res.json();
        if (res.ok) {
            msg.textContent = "✅ Registration successful! Please login.";
            msg.className = "msg success";
        } else {
            // Validation errors properly show cheyyadam
            if (data.detail && Array.isArray(data.detail)) {
                const errors = data.detail.map(e => e.msg).join(', ');
                msg.textContent = "❌ " + errors;
            } else {
                msg.textContent = "❌ " + (data.detail || "Registration failed!");
            }
            msg.className = "msg error";
        }
    } catch (err) {
        msg.textContent = "❌ Server error! Please try again.";
        msg.className = "msg error";
    }
}

async function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const msg = document.getElementById('login-msg');

    try {
        const res = await fetch(`${API}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.access_token);
            window.location.href = 'dashboard.html';
        } else {
            msg.textContent = data.detail || "Login failed!";
            msg.className = "msg error";
        }
    } catch (err) {
        msg.textContent = "Server error!";
        msg.className = "msg error";
    }
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}

async function loadDashboard() {
    const token = localStorage.getItem('token');
    if (!token) { window.location.href = 'index.html'; return; }

    const userRes = await fetch(`${API}/users/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!userRes.ok) { logout(); return; }
    const user = await userRes.json();
    document.getElementById('welcome-msg').textContent = `Welcome, ${user.username}!`;

    loadTasks();
}

async function loadTasks() {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API}/tasks/`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const tasks = await res.json();
    const container = document.getElementById('tasks-container');

    if (tasks.length === 0) {
        container.innerHTML = '<p style="color:#6b7280;">No tasks yet. Add one above!</p>';
        return;
    }

    container.innerHTML = tasks.map(task => `
        <div class="task-card ${task.completed ? 'completed' : ''}">
            <div>
                <h3>${task.title}</h3>
                <p>${task.description || ''}</p>
                <p style="font-size:11px;color:#9ca3af;">
                    ${task.completed ? '✅ Completed' : '⏳ Pending'}
                </p>
            </div>
            <div class="task-actions">
                ${!task.completed ? `<button class="complete-btn" onclick="completeTask(${task.id})">Done</button>` : ''}
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

async function createTask() {
    const token = localStorage.getItem('token');
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;
    const msg = document.getElementById('task-msg');

    if (!title) { msg.textContent = "Title required!"; msg.className = "msg error"; return; }

    const res = await fetch(`${API}/tasks/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, description })
    });

    if (res.ok) {
        document.getElementById('task-title').value = '';
        document.getElementById('task-desc').value = '';
        msg.textContent = "Task added!";
        msg.className = "msg success";
        loadTasks();
    }
}

async function completeTask(id) {
    const token = localStorage.getItem('token');
    await fetch(`${API}/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ completed: true })
    });
    loadTasks();
}

async function deleteTask(id) {
    const token = localStorage.getItem('token');
    await fetch(`${API}/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    loadTasks();
}

if (window.location.pathname.includes('dashboard')) {
    loadDashboard();
}