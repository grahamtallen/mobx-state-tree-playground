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




const Person = types.model('Person', {
        firstName: types.string,
        lastName: types.string,
        age: types.number,
        followers: types.number,
        isLoading: false,
        get fullName() {
            return `${this.firstName} ${this.lastName}`
        }
    }, {
        setFirstName(name) {this.firstName = name},
        addFollower() {this.followers++}
    }
)

const PeopleStore = types.model({
    people: types.array(Person),
    hydrated: types.boolean,
    get numOfPeople() {
        return this.people.length
    },
    get lastNames() {
        return this.people.map((person) => person.lastName)
    }
})

const peopleStoreInstance = PeopleStore.create({
    people: people.map((person) => Person.create(person)),
    hydrated: true
})

const NewPersonStore = types.model({
    newPerson: types.map(Person),
}, {
    clearNewPerson() {
        this.newPerson = Person.create({
            firstName: "",
            lastName: "",
            age: 0,
            followers: 0
        })
    }
})

const newPersonStoreInstance = NewPersonStore.create({
    newPerson: Person.create({
        firstName: "",
        lastName: "",
        age: 0,
        followers: 0
    })
})



export const GlobalStore = types.model("GlobalStore", {
    PeopleStore: types.optional(peopleStoreInstance, {
        people: [],
    }),
    NewPersonStore: types.optional(newPersonStoreInstance, {
        newPerson: {},
    }),
    get hydrated() {
        return this.PeopleStore.hydrated
    }
})

const globalStoreInstance = GlobalStore.create({})



export default globalStoreInstance