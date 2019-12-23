const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  mid: {
    type: String,
  },
  uid: {
    type: String
  },
  id_t: {
    type: String
  },
  email: {
    type: String,
  },
  type: {
    type: String,
  },
}, {timestamps: true, static: false});

const UserModel = mongoose.model('User', UserSchema);

class User {
   /**
    * Get all Users from database
    * @returns {Array} Array of Users
    */
   static getAll() {
     return new Promise((resolve, reject) => {
       UserModel.find({}).exec().then((results) => {
         resolve(results);
       }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
    * Get a User by it's id
    * @param {string} id - User Id
    * @returns {Object} - User Document Data
    */
   static getById(id) {
     return new Promise((resolve, reject) => {
       UserModel.findById(id).exec().then((result) => {
         resolve(result);
       }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
    * Create a new User
    * @param {Object} User - User Document Data
    * @returns {string} - New User Id
    */
   static create(User) {
     return new Promise((resolve, reject) => {
       UserModel.create(User).then((result) => {
         resolve(result);
         console.log(result);
       }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
    * Update a User
    * @param {string} id - User Id
    * @param {Object} User - User Document Data
    * @returns {null}
    */
   static update(id, User) {
     return new Promise((resolve, reject) => {
       UserModel.findByIdAndUpdate(id, User).then(() => {
         resolve();
       }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
   * Delete a User
   * @param {string} id - User Id
   * @returns {null}
   */
   static delete(id) {
    return new Promise((resolve, reject) => {
      UserModel.findOneAndDelete({_id: id}).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
    });
   }

   /**
    * Get a User by it's email
    * @param {string} id - User Email
    * @returns {Object} - User Document Data
    */
   static getByEmail(id) {
     return new Promise((resolve, reject) => {
       UserModel.findOne({ email: id }).exec().then((result) => {
         resolve(result);
       }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
    * Get a User by it's codId
    * @param {string} id - User CodId
    * @returns {Object} - User Document Data
    */
   static getByCodUser(id) {
     return new Promise((resolve, reject) => {
       UserModel.findOne({ codUser: id }).exec().then((result) => {
         resolve(result);
       }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
    * Add Device
    * @param {string} id - User Id
    * @param {string} transaction - Device Id
    * @returns {null}
    */
   static addDevice(id, device) {
     return new Promise((resolve, reject) => {
       UserModel.findByIdAndUpdate(id, { $push: { devices: device } }).catch((err) => {
         reject(err);
       });
     });
   }

   /**
    * Remove Device
    * @param {string} id - User Id
    * @param {string} device - Device Id
    * @returns {null}
    */
    static removeDevice(id, device) {
      return new Promise((resolve, reject) => {
        UserModel.findByIdAndUpdate(id, { $pull: { devices: device } }).catch((err) => {
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
        UserModel.findOne({ uid: id }).exec().then((result) => {
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
      });
    }
}


 module.exports = User;
