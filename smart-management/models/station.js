const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
    codeStation: {
      type: String,
      // unique: true
    }, //trabalhar com o erro depois em cach error
    // devicecode: String,
    id_m: {
      type: String,
    },
    idesp: String,
    dataesp: {
      type: String,
      default: "Desligado"
    },
    nameEmployed: String,
    toleranceTime: String,
    status: String,
    officeHours: String,
    inputHour: String,
    outputHour: String,
    weekday: {
      monday: {
        type: Boolean,
        default: 0
      },
      tuesday: {
        type: Boolean,
        default: 0
      },
      wednesday: {
        type: Boolean,
        default: 0
      },
      thursday: {
        type: Boolean,
        default: 0
      },
      friday: {
        type: Boolean,
        default: 0
      },
      saturday: {
        type: Boolean,
        default: 0
      },
      sunday: {
        type: Boolean,
        default: 0
      }
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Manager'
    }
}, {timestamps: true, static: false});

const StationModel = mongoose.model('Station', StationSchema);

class Station {
   /**
    * Get all Stations from database
    * @returns {Array} Array of Stations
    */
   static getAll() {
     return new Promise((resolve, reject) => {
       StationModel.find({}).exec().then((results) => {
         resolve(results);
       }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
    * Get a Station by it's id
    * @param {string} id - Station Id
    * @returns {Object} - Station Document Data
    */
    static getById(id) {
      return new Promise((resolve, reject) => {
        StationModel.findById(id).exec().then((result) => {
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
      });
    }

       /**
    * Get a Station by it's manager
    * @param {string} id - Station manager
    * @returns {Object} - Station Document Data
    */
   static getByManager(id) {
    return new Promise((resolve, reject) => {
      StationModel.find({ manager: id }).exec().then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  }

      /**
    * Get a Station by idesp
    * @param {string} id - idesp
    * @returns {Object} - Station Document Data
    */
    static getByIdesp(id) {
    return new Promise((resolve, reject) => {
     StationModel.find({ idesp: id }).exec().then((result) => {
       resolve(result);
     }).catch((err) => {
       reject(err);
     });
    });
    }

      /**
    * Get a Station by id_m
    * @param {string} id - id_m
    * @returns {Object} - Station Document Data
    */
    static getByIdm(id) {
    return new Promise((resolve, reject) => {
     StationModel.find({ id_m: id }).exec().then((result) => {
       resolve(result);
     }).catch((err) => {
       reject(err);
     });
    });
    }
   /**
    * Create a new Station
    * @param {Object} Station - Station Document Data
    * @returns {string} - New Station Id
    */
   static create(Station) {
     return new Promise((resolve, reject) => {
       StationModel.create(Station).then((result) => {
         resolve(result._id);
         console.log(result);
       }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
    * Update a Station
    * @param {string} id - Station Id
    * @param {Object} Station - Station Document Data
    * @returns {null}
    */
   static update(id, Station) {
     return new Promise((resolve, reject) => {
       StationModel.findByIdAndUpdate(id, Station).then(() => {
         resolve();
       }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
   * Delete a Station
   * @param {string} id - Station Id
   * @returns {null}
   */
   static delete(id) {
    return new Promise((resolve, reject) => {
      StationModel.findOneAndDelete({_id: id}).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
    });
   }
}

 module.exports = Station;
