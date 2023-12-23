const inquirer = require('inquirer');
const mysql = require('mysql2');
//const { employee, department } = require('./db/schema.sql')

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password

        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);
function startPrompt() {
    inquirer
        .prompt([
            { /* Pass your questions in here */
                name: 'whatDoYouWantToDo',
                type: 'list',
                message: 'What would you like to do?',
                choices:
                    ["View ALL Employees",
                        "Add Employee",
                        "Update Employee",
                        "Add Role",
                        "View All Departments",
                        "Add Department",
                        "View ALL Roles",
                        "Quit"
                    ]
            },

        ])
        .then((answer) => {
            switch (answer.whatDoYouWantToDo) {
                case 'Add Department':
                    inquirer.prompt([
                        {
                            name: "newDepartmentName",
                            type: "input",
                            message: "What is the name of the department?",
                        },
                    ])
                        .then((departmentName) => {
                            const { newDepartmentName } = departmentName
                            console.log(`You are about to add a new Department: ${newDepartmentName}`)

                        });
                    break;
                case 'Add Employee':
                    db.query(` SELECT * FROM role`, (err, roleData) => {
                        let roleArray = roleData.map(role => ({ name: role.title, value: role.id }))
                        db.query(` SELECT * FROM employee`, (err, employeeData) => {
                            let employeeArray = employeeData.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))

                            inquirer.prompt([
                                {
                                    name: "employeeFirstName",
                                    type: "input",
                                    message: "Enter employee first name.",
                                },
                                {
                                    name: "employeeLastName",
                                    type: "input",
                                    message: "Enter employee last name.",
                                },
                                {
                                    name: "employeeRole",
                                    type: "list",
                                    message: "Enter employee role.",
                                    choices: roleArray
                                },
                                {
                                    name: "managerID",
                                    type: "list",
                                    message: "Choose the employee manager.",
                                    choices: employeeArray
                                }
                            ])
                                .then((newEmployee) => {
                                    const { employeeFirstName, employeeLastName, employeeRole, employeeDepartment } = newEmployee
                                    console.log(`You are about to add a new employee: ${employeeFirstName, employeeLastName}`)
                                    db.query('INSERT INTO employee SET ?', {
                                        first_name: newEmployee.employeeFirstName,
                                        last_name: newEmployee.employeeLastName,
                                        role_id: newEmployee.employeeRole,
                                        manager_id: newEmployee.managerID,
                                    }, (err, results) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            console.log("New employee was added.")
                                        }

                                        startPrompt()
                                    }
                                    )
                                })
                        })
                    })
                    break;
                case 'Add Role':
                    inquirer.prompt([
                        {
                            name: "newRole",
                            type: "input",
                            message: "What is the name of the role?",
                        },
                    ])
                        .then((roleAnswer) => {
                            const { newRole } = roleAnswer
                            console.log(`You are about to add a new role: ${newRole}`)

                        });
                    break;
                case 'View ALL Employees':
                    db.query('SELECT employee.id,employee.first_name,employee.last_name,role.title,CONCAT(manager.first_name," ", manager.last_name ) AS Manager FROM employee JOIN role ON role.id=employee.role_id JOIN employee manager ON manager.id= employee.manager_id;', function (err, results) {
                        console.table(results);
                        startPrompt()
                    });
                    break;
                case 'View All Departments':
                    db.query('SELECT * FROM department', function (err, results) {
                        console.table(results);
                        startPrompt()
                    });
                    break;
                case 'Update Employee':
                    db.query(` SELECT * FROM role`, (err, roleData) => {
                        let roleArray = roleData.map(role => ({ name: role.title, value: role.id }))
                        db.query(` SELECT * FROM employee`, (err, employeeData) => {
                            let employeeArray = employeeData.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))
                            inquirer.prompt([
                                {
                                    name: 'employeeName',
                                    type: 'list',
                                    message: 'choose employee',
                                    choices: employeeArray
                                },
                                {
                                    name: 'newRoleName',
                                    type: 'list',
                                    message: 'choose new role',
                                    choice: roleArray
                                }

                            ])

                                .then(updateRoleAnswer => {
                                    const { employeeName, newRoleName } = updateRoleAnswer;
                                    db.query(` UPDATE employee SET role_id=? WHERE id=?`, [newRoleName, employeeName], (err, result) => {
                                        console.log('Employee was updated')
                                        startPrompt()
                                    })
                                })
                        })
                    });
                    break;
                default:
                    break;

            }
        })
}

startPrompt()










