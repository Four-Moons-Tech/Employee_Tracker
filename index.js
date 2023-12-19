const inquirer = require('inquirer');

inquirer
    .prompt([
        { /* Pass your questions in here */
            name: 'WantToDo',
            type: 'input',
            message: 'What would you like to do?',
            choices:
                [   "View ALL Employees",
                    "Add Employee",
                    "Update Employee",
                    "Add Role",
                    "View All Departments",
                    "Add Department",
                    "Quit"
                ]
        },
       

    ])
    .then((answer) => {

        const WantToDo = answer;


        // if (characters.length > 3) {
        //     console.log('Please enter up to 3 characters')
        // }
        // let logoShape;

        // if (shapeChoices == "Triangle") {
        //     logoShape = new Triangle()
        // } else if (shapeChoices == "Circle") {
        //     logoShape = new Circle()
        // } else if (shapeChoices == "Square") {
        //     logoShape = new Square()
        // }
        // logoShape.setText(characters)
        // logoShape.setShapeColor(shapeColor)
        // logoShape.setTextColor(characterColor)


        // return generateSVG(logoShape.render(), shapeChoices)




    })



