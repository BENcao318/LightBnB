const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');
const { query } = require('express');

const pool = new Pool({
  user: "labber",
  password: "123",
  host: "localhost",
  database: "lightbnb"
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  const queryString = `
    SELECT * FROM users
    WHERE email = '${email}';
  `;
  const start = Date.now();

  return {
    queryString,
  };
}

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const queryString = `
    SELECT * FROM users
    WHERE id = '${id}';
  `
  const start = Date.now();

  return {
    queryString,
  }
}

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const queryString = `
    INSERT INTO users (name, email, password)
    VALUES ('${user.name}', '${user.email}', '${user.password}')
    RETURNING *;
  `
  const start = Date.now();

  return {
    queryString,
  }
}

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const queryString = `
    SELECT *
    FROM properties
    JOIN reservations ON reservations.property_id = properties.id
    WHERE reservations.guest_id = $1
    ORDER BY start_date
    LIMIT $2;
  `
  const start = Date.now();

  return {
    queryString,
  }
}

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  const queryParams = [];
  const start = Date.now();

  let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
  `;

  if(options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if(options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND owner_id = $${queryParams.length}`;
  };

  if(options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(`${100 * options.minimum_price_per_night}`);
    queryParams.push(`${100 * options.maximum_price_per_night}`);
    queryString += `AND properties.cost_per_night BETWEEN $${queryParams.length - 1} AND $${queryParams.length} `;
  };

  queryParams.push(limit);
  if(options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `
      GROUP BY properties.id
      HAVING avg(property_reviews.rating) >= $${queryParams.length}
      ORDER BY cost_per_night
      LIMIT $${queryParams.length - 1};
    `;
  } else {
    queryString += `
      GROUP BY properties.id
      ORDER BY cost_per_night
      LIMIT $${queryParams.length};
    `;
  }

  return {
    queryString,
    queryParams,
  };
}

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const start = Date.now();
  const queryString = `
    INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
  `

  const queryParams = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms];

  return {
    queryString,
    queryParams
  }
}

module.exports = {
  query: (queryString, queryParams) => {
    const start = Date.now();
    return pool
      .query(queryString, queryParams)
      .then(result => {
        const duration = Date.now() - start;
        console.log('executed query', { queryString, duration, rows: result.rowCount });
        return result.rows;
      })
      .catch(err => {
        console.log(err.message);
      });
  },
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty
}