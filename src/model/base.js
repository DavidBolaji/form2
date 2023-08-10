const { pool } = require("../db/mysql");

class User {
  constructor(staffId, sex, phoneNumber, penNumber, LGA, pfa, table) {
    this.staffId = staffId;
    this.sex = sex;
    this.phoneNumber = phoneNumber;
    this.penNumber = penNumber;
    this.LGA = LGA;
    this.pfa = pfa;
    this.table = table;
  }

  async save() {
    let sql = `INSERT INTO ${this.table}(
            staffId,
            sex,
            phoneNumber,
            penNumber,
            LGA,
            pfa
        )
        VALUES(
            '${this.staffId}',
            '${this.sex}',
            '${this.phoneNumber}',
            '${this.penNumber}',
            '${this.LGA}',
            '${this.pfa}'
        )
        `;

    pool.query(sql, (err, result, fields) => {
      if (err) return err;

      return result;
    });
    //   console.log(rows);
  }

  static async findAll(path, cb) {
    let sql = `SELECT * FROM ${path}`;

    pool.query(sql, (err, result) => {
      if (err) return err;
      cb(result);
    });
  }

  static async delete(path, id, cb) {
    let sql = `DELETE FROM ${path} WHERE id = ?`;

    pool.query(sql, [id], (err, result) => {
      if (err) return err;
      cb(result);
    });
  }

}

module.exports = User;
