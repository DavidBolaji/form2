const jwt = require("jsonwebtoken");
const { pool } = require("../db/mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class Auth {
  static async findAuth(id, token, cb) {
    const sql = `SELECT * FROM auth WHERE id = ?`;

    pool.query(sql, [id], (err, result) => {
      if (err) return cb("error");
      const tokenExist = result[0].token.filter((t) => t.token === token);
      if (tokenExist.length > 0) {
        return cb(null, result[0]);
      }
      return cb("error");
    });
  }

  static async removeToken(id, token, cb) {
    const sql = `SELECT * FROM auth WHERE id = ?`;

    pool.query(sql, [id], (err, result) => {
      if (err) return cb("error");
      const tokenList = result[0].token.filter((t) => t.token !== token);
      this.replaceToken(id, tokenList);
    });
  }

  static async signin(email, password, cb) {
    const sql = `SELECT * FROM auth WHERE email = ?`;

    pool.query(sql, [email], async (err, result) => {
      if (err) return cb("error", null);
      if (result.length < 1) {
        return cb("error", null);
      }
      const passwordMatch = await bcrypt.compare(password, result[0].password);

      if (!passwordMatch) return cb("error", null);

      const token = jwt.sign(
        { id: JSON.stringify(result[0].id) },
        process.env.JWT_SECRET
      );

      await this.storeToken(result[0].id, token);

      cb("success", { ...result[0], token });
    });
  }

  static async hashPassword(password, cb) {
    bcrypt.hash(password, saltRounds, (_, hash) => {
      cb(hash);
    });
  }

  async signout() {}

  static async save(email, password, cb) {
    const sql = `INSERT INTO auth(email, password) VALUES(?, ?)`;

    pool.query(sql, [email, password], (err) => {
      if (err) return cb("error");
      cb("success");
    });
  }

  static async signup(email, password, cb) {
    const sql = `SELECT * FROM auth WHERE email = ?`;

    pool.query(sql, [email], async (err, result) => {
      if (err) return cb("error");

      if (result.length > 0) {
        console.log("error");
        return cb("error");
      }
      this.hashPassword(password, (pass) => {
        this.save(email, pass, (res) => {
          if (res === "error") return cb("error");
          cb("success");
        });
      });
    });
  }

  static async storeToken(id, token) {
    const sql = `SELECT * FROM auth WHERE id = ?`;

    pool.query(sql, [id], (err, result) => {
      if (err) return;
      const sql2 = `UPDATE auth SET token = ? WHERE id = ?`;
      const newToken = JSON.stringify([{ token }]);

      if (result[0].token === null) {
        pool.query(sql2, [newToken, id]);
      } else {
        let tokenList = result[0].token;
        tokenList.push({ token });
        tokenList = JSON.stringify(tokenList);
        pool.query(sql2, [tokenList, id]);
      }
    });
  }

  static async replaceToken(id, token) {
    const sql2 = `UPDATE auth SET token = ? WHERE id = ?`;
    let tokenList = token;
    tokenList = JSON.stringify(tokenList);
    pool.query(sql2, [tokenList, id]);
  }
}

module.exports = Auth;
