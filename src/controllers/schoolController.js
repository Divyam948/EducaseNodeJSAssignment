const { pool } = require("../config/db");
const { calculateDistanceInKm } = require("../utils/distance");
const {
  validateAddSchoolPayload,
  validateListSchoolsQuery
} = require("../validators/schoolValidator");

async function addSchool(req, res, next) {
  try {
    const { isValid, errors, values } = validateAddSchoolPayload(req.body);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors
      });
    }

    const query = `
      INSERT INTO schools (name, address, latitude, longitude)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await pool.execute(query, [
      values.name,
      values.address,
      values.latitude,
      values.longitude
    ]);

    return res.status(201).json({
      success: true,
      message: "School added successfully.",
      data: {
        id: result.insertId,
        ...values
      }
    });
  } catch (error) {
    return next(error);
  }
}

async function listSchools(req, res, next) {
  try {
    const { isValid, errors, values } = validateListSchoolsQuery(req.query);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors
      });
    }

    const [schools] = await pool.execute(
      "SELECT id, name, address, latitude, longitude FROM schools"
    );

    const sortedSchools = schools
      .map((school) => {
        const distanceInKm = calculateDistanceInKm(
          values.latitude,
          values.longitude,
          school.latitude,
          school.longitude
        );

        return {
          ...school,
          rawDistanceInKm: distanceInKm
        };
      })
      .sort((firstSchool, secondSchool) => {
        return firstSchool.rawDistanceInKm - secondSchool.rawDistanceInKm;
      })
      .map(({ rawDistanceInKm, ...school }) => {
        return {
          ...school,
          distanceInKm: Number(rawDistanceInKm.toFixed(2))
        };
      });

    return res.status(200).json({
      success: true,
      message: "Schools fetched successfully.",
      userLocation: values,
      count: sortedSchools.length,
      data: sortedSchools
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  addSchool,
  listSchools
};
