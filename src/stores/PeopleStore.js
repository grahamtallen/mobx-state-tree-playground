import {types} from 'mobx-state-tree';


let people = [
    {
        firstName: "Elizabeth",
        lastName: "Nash",
        age: 23,
        followers: 93
    },
    {
        firstName: "Graham",
        lastName: "Allen",
        age: 22,
        followers: 21
    },
    {
        firstName: "Michael",
        lastName: "Cera",
        age: 27,
        followers: 29
    },
]




const Person = types.model({
        firstName: types.string,
        lastName: types.string,
        age: types.number,
        followers: types.number,
        get fullName() {
            return `${this.firstName} ${this.lastName}`
        }
    }, {
        setFirstName(name) {this.firstName = name}
    }
)

const PeopleStore = types.model({
    people: types.array(Person)
})

//var PeopleStore = people.map((person) => {
//    return Person.create(person)
//})

const storeInstance = PeopleStore.create({
    people: people.map((person) => Person.create(person))
})

export default storeInstance