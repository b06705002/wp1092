const Query = {
  statsCount(parent, args, { db }, info) {
    try {
      const result = args.locationKeywords.map((keyword) => {
        let count = 0;
        for (let i=0; i<db.people.length; i++){
          if (db.people[i].location.description.includes(keyword)){
            if (!args.severity){
              count += 1;
            }
            else if (db.people[i].severity >= args.severity){
              count += 1;
            }
          }
        }
        return count 
      });
      return result
    } catch (error) {
      return null
    }
  },
};

export { Query as default };
