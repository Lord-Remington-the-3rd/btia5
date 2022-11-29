/*********************************************************************************
* BTI325 – Assignment 5
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Valy Osman 
* Student ID: 142480201 
* Date: 11/29/2022
*
* link
* https://glamorous-crab-sunbonnet.cyclic.app/
********************************************************************************/ 

const Sequelize = require('sequelize');
let sequelize = new Sequelize('shocckjc', 'shocckjc', 'SRyUlZhvNsqTH9U9WBlD9fkUZ8wvLYhf', {
 host: 'peanut.db.elephantsql.com',
 dialect: 'postgres',
 port: 5432,
 dialectOptions: {
 ssl: true
},
query:{raw: true} 
});

sequelize.authenticate().then(()=> console.log('Connection succeeded.'))
.catch((err)=>console.log("Unable to connect to DB.", err));

let Employee = sequelize.define('Employee', {
    employeeNum: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    maritalStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNum: Sequelize.INTEGER,
    status: Sequelize.STRING,
    department: Sequelize.INTEGER,
    hireDate: Sequelize.STRING,
  });
  
  var Department = sequelize.define('Department', {
    departmentId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    departmentName: Sequelize.STRING,
  });

const initialize = () => {
    return new Promise((res, rej) => {
        sequelize.sync()
        .then(() => res("initialize success!"))
        .catch(() => rej("initialize error"));

    });
}

const getAllEmployees = () => {
    return new Promise((res, rej) => {
        Employee.findAll()
        .then((data) => res(data))
        .catch(() => rej("no results"));
      
    });
}

const getEmployeesByStatus = (statusPassed) => {
    return new Promise((res, rej) => {
        Employee.findAll({where:{status: statusPassed}})
        .then((data) => res(data))
        .catch(() => rej("no results"));
    });
}

const getEmployeeByNum = (num) => {
    return new Promise((res, rej) => {
        Employee.findAll({where:{employeeNum: num}})
        .then((data) => res(data[0]))
        .catch(() => rej("no results"));
    });
}

const getDepartments = () => {
    return new Promise((res, rej) => {
        Department.findAll()
        .then((data) => res(data))
        .catch(() => rej("no results"));
    });
}

const addEmployee = (employeeData) => {
    return new Promise((res, rej) => {
        employeeData.isManager = (employeeData.isManager) ? true : false;

        for (let i in employeeData){
            if (employeeData[i] === ''){
                employeeData[i] = null;
            }
        }
        Employee.create(employeeData)
        .then((data) => res(data))
        .catch(() => rej("no results"));
    });
}

const updateEmployee = (employeeData) => {
    return new Promise((res, rej) => {
        employeeData.isManager = (employeeData.isManager) ? true : false;

        for (let i in employeeData){
            if (employeeData[i] === ''){
                employeeData[i] = null;
            }
        }
        Employee.update(employeeData, {
            where: { employeeNum: employeeData.employeeNum },
          })
        .then((data) => res(data))
        .catch(() => rej("no results"));
    });
}

const addDepartment = (departmentData) => {
    return new Promise((res, rej) => {

        for (let i in departmentData){
            if (departmentData[i] === ''){
                departmentData[i] = null;
            }
        }
        Department.create(departmentData)
        .then((data) => res(data))
        .catch(() => rej("no results"));
    });
}

const updateDepartment = (departmentData) => {
    return new Promise((res, rej) => {
        for (let i in departmentData){
            if (departmentData[i] === ''){
                departmentData[i] = null;
            }
        }
        Department.update(departmentData, {
            where: { departmentId: departmentData.departmentId },
          })
        .then((data) => res(data))
        .catch(() => rej("no results"));
    });
}

const getDepartmentById = (id) => {
    return new Promise((res, rej) => {
      Department.findAll({
        where: {
          departmentId: id,
        },
      })
        .then((data) => res(data))
        .catch(() => rej("no results"))
    });
  };

const getManagers = () => {
    return new Promise((res, rej) => {
        Employee.findAll({
            where: {
              employeeManagerNum: manager,
            },
          })
            .then((data) => {
              res(data);
            })
            .catch((err) => {
              rej("no results");
            });
        });
    }

const getEmployeesByDepartment = (departmentPassed) => {
    return new Promise((res, rej) => {
        res(Employee.findAll({where:{department: departmentPassed}}));
    });
}

const getEmployeesByManager = (managerPassed) => {
    return new Promise((res, rej) => {
        res(Employee.findAll({where:{employeeManagerNum: managerPassed}}));
    });
}

const deleteEmployeeByNum = (num) => {
    return new Promise((res, rej) => {
      Employee.destroy({
        where: {
          employeeNum: num,
        },
      })
        .then(() => res())
    });
  };


exports.initialize = initialize;
exports.getAllEmployees = getAllEmployees;   
exports.getEmployeesByStatus = getEmployeesByStatus; 
exports.getEmployeesByDepartment = getEmployeesByDepartment;  
exports.getEmployeesByManager = getEmployeesByManager;
exports.getEmployeeByNum = getEmployeeByNum;
exports.getDepartments = getDepartments;
exports.addEmployee = addEmployee;
exports.updateEmployee = updateEmployee;
exports.addDepartment = addDepartment;
exports.updateDepartment = updateDepartment;
exports.getDepartmentById = getDepartmentById;
exports.getManagers = getManagers;
exports.getEmployeesByDepartment = getEmployeesByDepartment;
exports.getEmployeesByManager = getEmployeesByManager;
exports.deleteEmployeeByNum = deleteEmployeeByNum;