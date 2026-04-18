function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidLatitude(value) {
  return Number.isFinite(value) && value >= -90 && value <= 90;
}

function isValidLongitude(value) {
  return Number.isFinite(value) && value >= -180 && value <= 180;
}

function validateAddSchoolPayload(body = {}) {
  const errors = [];
  const values = {
    name: typeof body.name === "string" ? body.name.trim() : body.name,
    address: typeof body.address === "string" ? body.address.trim() : body.address,
    latitude: Number(body.latitude),
    longitude: Number(body.longitude)
  };

  if (!isNonEmptyString(values.name)) {
    errors.push("name is required and must be a non-empty string.");
  }

  if (!isNonEmptyString(values.address)) {
    errors.push("address is required and must be a non-empty string.");
  }

  if (!isValidLatitude(values.latitude)) {
    errors.push("latitude must be a valid number between -90 and 90.");
  }

  if (!isValidLongitude(values.longitude)) {
    errors.push("longitude must be a valid number between -180 and 180.");
  }

  return {
    isValid: errors.length === 0,
    errors,
    values
  };
}

function validateListSchoolsQuery(query = {}) {
  const errors = [];
  const values = {
    latitude: Number(query.latitude),
    longitude: Number(query.longitude)
  };

  if (!isValidLatitude(values.latitude)) {
    errors.push("latitude query parameter must be a valid number between -90 and 90.");
  }

  if (!isValidLongitude(values.longitude)) {
    errors.push("longitude query parameter must be a valid number between -180 and 180.");
  }

  return {
    isValid: errors.length === 0,
    errors,
    values
  };
}

module.exports = {
  validateAddSchoolPayload,
  validateListSchoolsQuery
};
