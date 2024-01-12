import { studentClass } from "./student.js";

const tbody = document.querySelector(".student-list");
const refreshBtn = document.querySelector(".refresh");
const addBtn = document.querySelector(".add");
const student = new studentClass();
student.getFullData();
function displayStudent() {
  student.getFullData().then(data => {
    tbody.innerHTML = "";
    data.map(item => {
      let { id, name, age, note } = item;

      // Calculate the Age
      age = new Date().getFullYear() - new Date(age).getFullYear();

      // Condition if you pass exam
      let exam;
      if (note < 10) {
        exam = `<th class='fail'>${note}/20</th>`;
      } else {
        exam = `<th class='pass'>${note}/20</th>`;
      }

      tbody.innerHTML += `<tr>
      <th>${id}</th>
      <th>${name}</th>
      <th>${age} Year</th>
      ${exam}
    </tr>`;
    });
    deleteStudent();
  });
}
displayStudent();

// Refresh Button
refreshBtn.onclick = () => {
  displayStudent();
};

// Add Student

addBtn.addEventListener("click", () => {
  const [name, age, note] = document.querySelectorAll("#name,#age,#note");
  async function getIdFn() {
    const id = await student.getFullData().then(data => data.length + 1);
    const addStudent = new studentClass(id, name.value, age.value, note.value);
    addStudent.addStudent();
  }
  getIdFn();
});

function deleteStudent() {
  const trashBtn = document.querySelectorAll(".trash-btn");
  trashBtn.forEach(btn => {
    btn.addEventListener("click", () => {
      student.deleteStudentFromJson(btn.dataset.id);
      console.log(btn.dataset.id);
    });
  });
}
