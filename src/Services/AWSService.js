export default class AWSService {
    static myInstance = null;

    static getInstance() {
        if (AWSService.myInstance == null) {
            AWSService.myInstance = new AWSService();
        }
        return this.myInstance;
    }

    sendEmail(emailDetails, callback, callback1) {
        fetch("https://riogpp893l.execute-api.us-east-1.amazonaws.com/dev/send-email", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(emailDetails)
        })
            .then(response => {
                callback('Email Successfully Sent', 'Success')
                callback1()
            })
            .catch(err => {
                callback('Error sending email. Please try again later.', 'Error')
            });
    }

    getHouses(parameters, callBack) {
        fetch(`https://riogpp893l.execute-api.us-east-1.amazonaws.com/dev/gethomes?city=${parameters.city}&bedrooms=${parameters.bedrooms}&bathrooms=${parameters.bathrooms}&minPrice=${parameters.minPrice}&maxPrice=${parameters.maxPrice}&minSqFt=${parameters.minSqFt}`)
        .then(response => response.json())
        .then(callBack)
    }

    getHouseDetails(houseId, callBack) {
        fetch(`https://riogpp893l.execute-api.us-east-1.amazonaws.com/dev/getpropertydetail/${houseId}`)
        .then(response => response.json())
        .then(callBack)
    }
}