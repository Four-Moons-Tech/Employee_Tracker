INSERT INTO employee(id,first_name,last_name,title,department_id,salary,mamager)
VALUES(1, John, Doe, Sales Lead, Sales, 100000, null),
      (2,Mike,Chan,Saleperson,Sales,80000,John Doe),
      (3,Ashley,Rodroguez,Lead Engineer,Engineering, 150000,null),
      (4,Kevin,Tupik,Software Engineer,Engineering,120000, Ashley Rodroguez),
      (5,Kunal,Singh,Account Manager,Finance,160000,null),
      (6,Malia, Brown,Accountant,Finance,125000,Kunal Singh),
      (7,Sarah,Lourd,Legal Team Lead, Legal, 250000, null),
      (8,Tom, Allen, Lawyer, Legal,190000, Sarah Lourd);

INSERT INTO department(id,name)
VALUES (1, Sales),
       (2, Engineering),
       (3, Finance),
       (4, Legal);

INSERT INTO role(id,title,salary,department_id)\
VALUES (1, Sales Lead,100000, Sales ),
       (2, Saleperson, 80000, Sales),
       (3, Lead Engineer,150000, Engineering),
       (4, Software Engineer, 120000, Engineering),
       (5, Account Manager, 160000, Finance), 
       (6, Accountant,125000, Finance),
       (7, Legal Team Lead, 250000, Legal),
       (8, Lawyer, 190000, Legal);
