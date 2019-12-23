const mongoose = require('mongoose');

const SectorSchema = new mongoose.Schema({
    codSector: String,
    name: String,
    manager: String,
    idManager: String,
}, {timestamps: true, static: false});

const SectorModel = mongoose.model('Sector', SectorSchema);

class Sector {
   /**
    * Get all Sectors from database
    * @returns {Array} Array of Sectors
    */
   static getAll() {
     return new Promise((resolve, reject) => {
       SectorModel.find({}).exec().then((results) => {
         resolve(results);
       }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
    * Get a Sector by it's id
    * @param {string} id - Sector Id
    * @returns {Object} - Sector Document Data
    */
    static getById(id) {
      return new Promise((resolve, reject) => {
        SectorModel.findById(id).exec().then((result) => {
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
      });
    }

   /**
    * Create a new Sector
    * @param {Object} Sector - Sector Document Data
    * @returns {string} - New Sector Id
    */
   static create(Sector) {
     return new Promise((resolve, reject) => {
       SectorModel.create(Sector).then((result) => {
         resolve(result);
         console.log(result);
       }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
    * Update a Sector
    * @param {string} id - Sector Id
    * @param {Object} Sector - Sector Document Data
    * @returns {null}
    */
   static update(id, Sector) {
     return new Promise((resolve, reject) => {
       SectorModel.findByIdAndUpdate(id, Sector).then(() => {
         resolve();
       }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
   * Delete a Sector
   * @param {string} id - Sector Id
   * @returns {null}
   */
   static delete(id) {
    return new Promise((resolve, reject) => {
      SectorModel.findOneAndDelete({_id: id}).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
    });
   }

   /**
    * Get a Sector by it's email
    * @param {string} id - Sector Email
    * @returns {Object} - Sector Document Data
    */
   static getByEmail(id) {
     return new Promise((resolve, reject) => {
       SectorModel.findOne({ email: id }).exec().then((result) => {
         resolve(result);
       }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
    * Get a Client by it's codId
    * @param {string} id - Client CodId
    * @returns {Object} - Client Document Data
    */
   static getByCodSector(id) {
     return new Promise((resolve, reject) => {
       SectorModel.findOne({ codSector: id }).exec().then((result) => {
         resolve(result);
       }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
    * Add station
    * @param {string} id - Sector Id
    * @param {string} station - station Id
    * @returns {null}
    */
   static addStation(id, station) {
     return new Promise((resolve, reject) => {
       SectorModel.findByIdAndUpdate(id, { $push: { stations: station } }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
    * Remove station
    * @param {string} id - Sector Id
    * @param {string} station - station Id
    * @returns {null}
    */
    static removeStation(id, station) {
      return new Promise((resolve, reject) => {
        SectorModel.findByIdAndUpdate(id, { $pull: { stations: station } }).catch((err) => {
          reject(err);
        });
      });
    }

    /**
     * Get a User by it's uid
     * @param {string} id - User Uid
     * @returns {Object} - User Document Data
     */
    static getByUid(id) {
      return new Promise((resolve, reject) => {
        SectorModel.findOne({ uid: id }).exec().then((result) => {
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
      });
    }
}

 module.exports = Sector;
