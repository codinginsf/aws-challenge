const getSkills = (data) => {
  const skillList = {};
  for (let personObj of data) {
    const {name, skills} = personObj;
    skills.forEach(skill => {
      if (skillList[skill]) {
        skillList[skill].push(name)
      } else {
        skillList[skill] = [name];
      }
    })
  }

  return skillList;
}

const sample = [{
  id: 0,
  name: "John",
  skills: ["javascript", "html", "css", "c#"]
},
{
  id: 1,
  name: "Brian",
  skills: ["javascript", "java", "c", "c#", "c++", "html"]
},
{
  id: 2,
  name: "Michael",
  skills: ["c", "c++", "go", "rust"]
}
];

console.log(getSkills(sample))