// Your code here
function createEmployeeRecord(employee) {
    return {
        firstName: employee[0], 
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};

function createEmployeeRecords(employees) {
    const employeeRecords =  employees.map((employee) => createEmployeeRecord(employee));
    return employeeRecords;
};

function createTimeInEvent(employee, time) {
    const date = time.split(" ")[0];
    const hour = time.split(" ")[1];
    const event = {
        "type": "TimeIn",
        "hour": parseInt(hour),
        "date": date
    };
    employee.timeInEvents.push(event)
    return employee;
};

function createTimeOutEvent(employee, time) {
    const date = time.split(" ")[0];
    const hour = time.split(" ")[1];
    const event = {
        "type": "TimeOut",
        "hour": parseInt(hour),
        "date": date
    };
    employee.timeOutEvents.push(event)
    return employee;
};

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.filter((a) => a.date===date);
    const timeOut = employee.timeOutEvents.filter((a) => a.date===date);

    return (timeOut[0].hour - timeIn[0].hour)/100
};

function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const hourlyRate = employee.payPerHour;

    return hoursWorked * hourlyRate;
};

function allWagesFor(employee) {
    const timeIn = employee.timeInEvents
    const timeOut = employee.timeOutEvents
    const workDates = new Set();

    timeIn.forEach(a => {
        workDates.add(a.date);
    });

    let totalHours = 0;
    workDates.forEach(
        function(workDate) {
            totalHours += timeOut.find((element) => element.date === workDate).hour - timeIn.find((element) => element.date === workDate).hour
        });

    return employee.payPerHour * totalHours/100;
};

function calculatePayroll(employees) {
    let totalWages = 0;
    employees.forEach((employee) => totalWages += allWagesFor(employee));
    return totalWages;
}