const { City } = require("../models/index");
const { Op } = require("sequelize");

class CityRepository {
  async createCity({ name }) {
    try {
      const city = await City.create({ name });
      return city;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw { error };
    }
  }
  async deleteCity(cityId) {
    try {
      await City.destroy({ where: { id: cityId } });
      return true;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw { error };
    }
  }
  async updateCity(cityId, data) {
    try {
      // The below approach will also works but will not return updated object
      //if we are using Pg then returning : true can be used, else not
      // const city = await City.update(data, { where: { id: cityId } });

      // For getting updated data in MySQL we need to use below approach
      const city = await City.findByPk(cityId);
      city.name = data.name;
      await city.save();
      return city;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw { error };
    }
  }

  async getCity(cityId) {
    try {
      const city = await City.findByPk(cityId);
      return city;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw { error };
    }
  }
  async getAllCities(filter) {
    //filter can also be empty
    try { 
      if (filter.name) {
        const cities = await City.findAll({
          where: {
            name: {
              [Op.startsWith]: filter.name,
            },
          },
        });
        return cities;
      }
      const cities = await City.findAll();
      return cities;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw { error };
    }
  }
}
module.exports = CityRepository;
