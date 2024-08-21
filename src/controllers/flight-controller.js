const { FlightService } = require("../services/index");

const flightService = new FlightService();

const create = async (req, res) => {
  try {
    const flight = await flightService.createFlight(req.body);

    res.status(201).json({
      data: flight,
      success: true,
      message: "Flight created successfully",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to create a flight",
      err: error,
    });
  }
};
const getAll = async (req, res) => {
  try {
    const response = await flightService.getAllFlightData(req.query);
    res.status(200).json({
      data: response,
      success: true,
      message: "Flights retrieved successfully",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch the  flights",
      err: error,
    });
  }
};

module.exports = {
  create,
  getAll,
};
