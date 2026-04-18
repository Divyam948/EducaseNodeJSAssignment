function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function calculateDistanceInKm(startLatitude, startLongitude, endLatitude, endLongitude) {
  const earthRadiusInKm = 6371;
  const latitudeDifference = degreesToRadians(endLatitude - startLatitude);
  const longitudeDifference = degreesToRadians(endLongitude - startLongitude);
  const startLatitudeInRadians = degreesToRadians(startLatitude);
  const endLatitudeInRadians = degreesToRadians(endLatitude);

  // Haversine gives a reliable distance between two latitude/longitude points.
  const a =
    Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2) +
    Math.cos(startLatitudeInRadians) *
      Math.cos(endLatitudeInRadians) *
      Math.sin(longitudeDifference / 2) *
      Math.sin(longitudeDifference / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusInKm * c;
}

module.exports = {
  calculateDistanceInKm
};
