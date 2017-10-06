import {types, onSnapshot} from 'mobx-state-tree';


let people = [
    {
        person_id: "1",
        firstName: "Elizabeth",
        lastName: "Nash",
        age: 23,
        followers: 93
    },
    {
        person_id: "2",
        firstName: "Graham",
        lastName: "Allen",
        age: 22,
        followers: 21
    },
    {
        person_id: "3",
        firstName: "Michael",
        lastName: "Cera",
        age: 27,
        followers: 29
    },

]




const Person = types.model('Person', {
        person_id: types.identifier(),
        firstName: types.string,
        lastName: types.string,
        age: types.number,
        followers: types.number,
        get fullName() {
            return `${this.firstName} ${this.lastName}`
        }
    }, {
        setField(fieldName, val) {
            console.log('fieldName', fieldName, val, typeof val)
            this[fieldName] = val
        },
        addFollower() {this.followers++}
    }
)

const PeopleStoreModel = types.model('PeopleStoreModel',
{
    people: types.array(Person),
    selectedPerson: types.reference(Person, 'people'),
    newPerson: Person,
    get numOfPeople() {
        return this.people.length
    },
    get lastNames() {
        return this.people.map((person) => person.lastName)
    },
},
{
    selectPerson({person_id}) {
      console.log('Selected:', person_id)
      this.selectedPerson = person_id
    },
    initialize() {
        console.log('Initialized')
        this.people = people.map((person) => Person.create(person))
    },
    findById(id) {
        return this.people.find((person) => {
            console.log(person.name, person.person_id, id)
            return person.person_id === id
        })
    },
    submitUser() {
        this.addPerson(this.newPerson)
    },
    addPerson(person) {
        this.people.push({
            id: Math.random(),
            followers: 0,
            ...person
        })
    },
    clearNewUser() {
        this.newPerson = {
            person_id: "0",
            firstName: "",
            lastName: "",
            age: 0,
            followers: 0
        }
    },
    afterCreate() {
        this.initialize()
    }
})

export default PeopleStoreModel.create({
    people: [],
    selectedPerson: "0",
    newPerson: {
        person_id: "0",
        firstName: "",
        lastName: "",
        age: 0,
        followers: 0
    }
})













//const NewPersonStore = types.model('NewPerson', {
//        firstName: types.string,
//        lastName: types.string,
//        age: types.number,
//        followers: types.number
//}, {
//    setField(fieldName, val) {
//        this[fieldName] = val
//    },
//})
//
//const newPersonStoreInstance = NewPersonStore.create({
//        firstName: "",
//        lastName: "",
//        age: 0,
//        followers: 0
//})



//export const GlobalStore = types.model("GlobalStore", {
//    PeopleStore: types.optional(PeopleStore, {people: []}),
//})
//
//const globalStoreInstance = GlobalStore.create({PeopleStore: peopleStoreInstance})


//export default {NewPersonStore: newPersonStoreInstance, PeopleStore: peopleStoreInstance}