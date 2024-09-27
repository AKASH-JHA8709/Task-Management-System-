// Fetch tasks for the logged-in user
window.onload = async function() {
    const token = localStorage.getItem('token');
    const tasksList = document.getElementById('tasks-list');

    try {
        const response = await fetch('http://localhost:8000/api/tasks', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            const tasks = await response.json();
            tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.textContent = `${task.title} - ${task.priority} (Due: ${task.due_date})`;
                tasksList.appendChild(taskItem);
            });
        } else {
            tasksList.textContent = "Failed to load tasks!";
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
};

// Create a new task
const taskForm = document.getElementById("task-form");

taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const priority = document.getElementById("priority").value;
    const due_date = document.getElementById("due_date").value;
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('http://localhost:8000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, description, priority, due_date })
        });

        if (response.ok) {
            alert("Task created successfully!");
            window.location.href = "dashboard.html";  // Redirect back to the dashboard
        } else {
            alert("Failed to create task.");
        }
    } catch (error) {
        console.error("Error creating task:", error);
    }
});
