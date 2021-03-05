export default class Constants {
    static myInstance = null
  
    static getInstance() {
      if (Constants.myInstance == null) {
        Constants.myInstance = new Constants()
      }
      return this.myInstance
    }
  
    getHouseAddress(address) {
      if (address) {
        return [
          address.line,
          address.city + ", " + address.state_code + " " + address.postal_code,
        ]
      } else {
        return ["", ""]
      }
    }
  
    getBathroomCount(fullBath, halfBath) {
      if (halfBath) {
        return fullBath + halfBath / 2
      } else {
        return fullBath
      }
    }
  
    getHouseLocations(houses) {
      var coordArray = []
      if (houses) {
        houses.forEach((house) =>
          coordArray.push([house.address.lat, house.address.lon])
        )
        return coordArray
      } else {
        return []
      }
    }
  
    getHouseLocation(house) {
      if (house) {
        return [house.address.lat, house.address.lon]
      } else {
        return []
      }
    }
  
    getHousePrice(price) {
      if (price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
    }
  
    getHouseType(houseType) {
      if (houseType) {
        var nouns = houseType.split("_")
        var newArr = []
        for (var i = 0; i < nouns.length; i++) {
          newArr[i] = nouns[i].charAt(0).toUpperCase() + nouns[i].substr(1)
        }
        return newArr.join(" ")
      }
    }
  
    getListDate(listDate) {
      if (listDate) {
        var date = new Date(listDate)
        var todayDate = new Date()
        var diffTime = Math.abs(todayDate - date)
        var diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
      }
    }
  
    getFormattedDate(listDate) {
      if (listDate) {
        return new Date(listDate).toLocaleDateString("en-US")
      }
    }
  }