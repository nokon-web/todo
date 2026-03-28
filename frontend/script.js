
const API = "http://localhost:5000/todos";
const API_student = "http://localhost:5000/students";
let editId = null;
async function fetchTodos() {
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(todo => {
    const li = document.createElement("li");
    li.textContent = todo.text;

    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => deleteTask(todo._id);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById("taskInput");

  await fetch(API, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ text: input.value })
  });
  input.value = "";
  fetchTodos();
}

async function deleteTask(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  fetchTodos();
}

fetchTodos();


// this is the code for students






async function fetchstudents() {
  const res = await fetch(API_student);
  const data = await res.json();

  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  data.forEach(s => {
       const row = `<tr><td>${s.name}</td> 
                        <td>${s.department}</td> 
                        <td>${s.level}</td>
                        <td><button onclick="editStudent('${s._id}', '${s.name}', '${s.department}', '${s.level}')">✏️</button><button Onclick = "deletestudent('${s._id}')">❌</button></td></tr>`
    
    tbody.innerHTML+=row;
  });
}

async function addstudent() {
  const name = document.getElementById("name");
  const department = document.getElementById("department");
  const level = document.getElementById("level");

  const studentData = {
    name: name.value,
    department: department.value,
    level: level.value
  };

  // ✅ If editing → UPDATE
  if (editId) {
    await fetch(`${API_student}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData)
    });

    editId = null; // reset
  } 
  // ✅ Otherwise → ADD
  else {
    await fetch(API_student, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData)
    });
  }

  // clear inputs
  name.value = "";
  department.value = "";
  level.value = "";

  fetchstudents();
}

async function deletestudent(id) {
  await fetch(`${API_student}/${id}`, { method: "DELETE" });
  fetchstudents();
}
async function editStudent(id, name, department, level) {
  document.getElementById("name").value = name;
  document.getElementById("department").value = department;
  document.getElementById("level").value = level;

  editId = id;
  fetchstudents();
}
fetchstudents();