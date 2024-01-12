const jsonLink = "http://localhost:3000/student";

class studentClass {
  constructor(id, name, age, note) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.note = note;
  }

  async getFullData() {
    return await fetch(jsonLink).then(res => res.json());
  }

  async addStudent() {
    return await fetch(jsonLink, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.id,
        name: this.name,
        age: this.age,
        note: this.note,
      }),
    });
  }

  deleteStudentFromJson(idToRemove) {
    return fetch(jsonLink + "/" + idToRemove, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export { studentClass };
