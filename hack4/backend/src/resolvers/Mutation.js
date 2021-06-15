const Mutation = {
    insertPeople(parent, args, { db }, info) {
        try {
            const existing = db.people.some((person) => person.ssn === args.data.ssn);
            if (!existing) {
                const person = {
                    ssn: args.data.ssn,
                    name: args.data.name,
                    severity: args.data.severity,
                    location: {
                        name: args.data.location.name,
                        description: args.data.location.description
                    }
                }
                db.people.push(person);
                return true
            }
            
            for (let i=0; i<db.people.length; i++) {
                if (db.people[i].ssn === args.data.ssn){
                    db.people[i].name = args.data.name
                    db.people[i].severity = args.data.severity
                    db.people[i].location.name = args.data.location.name
                    db.people[i].location.description = args.data.location.description
                }
            }

            return true
            
        } catch (error) {
            console.log(error)
            return false
        }
    },
};

export { Mutation as default };
