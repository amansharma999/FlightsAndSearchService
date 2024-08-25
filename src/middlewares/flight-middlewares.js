const { ClientErrorCodes } = require("../utils/error-codes");
const validateCreateFlight = (req, res, next) => {
  if (
    !req.body.flightNumber ||
    !req.body.airplaneId ||
    !req.body.departureAirportId ||
    !req.body.arrivalAirportId ||
    !req.body.departureTime ||
    !req.body.arrivalTime ||
    !req.body.price
  ) {
    //if any of the body params are missing, return a 400 status code, 400 meand bad request
    return res.status(ClientErrorCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "Invalid request body for creating a flight",
      err: "Missing required fields",
    });
  }
  next();
};
module.exports = { validateCreateFlight };
