function Employee(id,name,salary){
    if (this.constructor.name !== "Employee")
        return new Employee(id,name,salary);
    this.id = id;
    this.name = name;
    this.salary = salary;
}

function createEmployee(id,name,salary){
    return {
        id : id,
        name : name,
        salary : salary
    };
}

function SalaryCalculator(basic,hra,da,tax){
    this.basic = basic;
    this.hra = hra;
    this.da = da;
    this.tax = tax;
    this.salary = 0;
    
}
SalaryCalculator.prototype.calculate = function(){
    var gross = this.basic + this.hra + this.da;
    this.salary = gross * ((100-this.tax)/100);
}











