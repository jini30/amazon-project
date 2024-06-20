class Car
{
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;
    
    constructor(brand, model)
    {
        this.#brand = brand;
        this.#model = model;
    }

    displayInfo()
    {
        console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h`);
    }

    go()
    {
        if(this.speed <= 195 && !this.isTrunkOpen)
        {
            this.speed += 5;
        }
    }

    brake()
    {
        if (this.speed >= 5)
        {
            this.speed -= 5;
        }
    }

    openTrunk()
    {
        if(this.speed === 0)
        {
            this.isTrunkOpen = true;
        }
    }

    closeTrunk()
    {
        this.isTrunkOpen = false;
    }
}

const car1 = new Car('Toyota', 'Corolla');
const car2 = new Car('Tesla', 'Model 3');

console.log(car1);
console.log(car2);

car1.displayInfo();
car2.displayInfo();

car1.go();
car1.go();
car1.go();
car2.brake();

car1.displayInfo();
car2.displayInfo();

car1.openTrunk();
car1.go();
car1.displayInfo();

class RaceCar extends Car
{
    acceleration = 0;
    
    constructor(brand, model, acceleration)
    {
        super(brand, model);
        this.acceleration = acceleration;
    }

    go()
    {
        if(this.speed <= 295)
        {
            this.speed += this.acceleration;
        }
    }

    openTrunk() {}
    closeTrunk() {}
}

const racecar = new RaceCar('McLaren', 'F1', 20);
racecar.go();
racecar.go();
racecar.displayInfo();