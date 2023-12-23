SELECT *
FROM role 
JOIN department ON role.department= department_id;

FROM employee
JOIN department ON employee.department = department_id;

JOIN employee ON employee.manager_id=manager_id;

SELECT employee.id,employee.first_name,employee.last_name,role.title,CONCAT(manager.first_name," ", manager.last_name ) AS Manager FROM employee JOIN role ON role.id=employee.role_id JOIN employee manager ON manager.id= employee.manager_id;