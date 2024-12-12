const NodeGeocoder = require('node-geocoder');
const { getDistance } = require('geolib');
const axios = require('axios');
const captainModel = require("../models/captain-model")

const geocoder = NodeGeocoder({
    provider: 'openstreetmap',
});

module.exports.getAddressCoordinate= async (address) => {
    const response = await axios.get('https://geocode.search.hereapi.com/v1/geocode', {
        params: {
            q: address,
            apiKey: process.env.HERE_API_KEY,
        },
    });
    return response.data.items[0].position
}

module.exports.getDistanceAndTime = async (pickup, destination) => {

    const url = `https://router.hereapi.com/v8/routes`;

        // Make the API request
    const response = await axios.get(url, {
        params: {
            transportMode: 'car', 
            origin: `${pickup.lat},${pickup.lng}`,     
            destination: `${destination.lat},${destination.lng}`,
            return: 'summary',  
            apiKey: process.env.HERE_API_KEY,
        },
    });
    return response.data.routes[0].sections[0].summary
}

module.exports.getAutoCompleteSuggestion = async (input, coord) => {
    const response = await axios.get('https://autosuggest.search.hereapi.com/v1/autosuggest', {
        params: {
            q: input, 
            at: `${coord.lat},${coord.lng}`,
            limit: 10, 
            apiKey: process.env.HERE_API_KEY 
        }
    });
    return response.data.items;
}

module.exports.getCaptainsInRadius = async (ltd, lng, radius) => {
    const captains = await captainModel.find({
        location : {
            $geoWithin : {
                $centerSphere : [[ltd, lng], radius/6371]
            }
        }
    })
    return captains
}







































// module.exports.getAddressCoordinate = async (address) => {
//     try {
//         const results = await geocoder.geocode(address);
//         if (results && results.length > 0) {
//             const { latitude, longitude } = results[0];
//             return { latitude, longitude };
//         } else {
//             throw new Error('Location not found.');
//         }
//     } catch (error) {
//         throw new Error(`Geocoding failed: ${error.message}`);
//     }
// }

// module.exports.getDistanceAndTime = async (pickup, destination) => {
//     try {
//         const [geo1] = await geocoder.geocode(pickup);
//         const [geo2] = await geocoder.geocode(destination);

//         if (!geo1 || !geo2) {
//             throw new Error('Unable to geocode one or both locations.');
//         }
        // const distance = getDistance(
        //     { latitude: geo1.latitude, longitude: geo1.longitude },
        //     { latitude: geo2.latitude, longitude: geo2.longitude }
        // );

        // const averageSpeed = 13.89;
        // const travelTime = distance / averageSpeed;

        // return {
        //     distance: `${(distance / 1000).toFixed(2)} km`,
        //     travelTime: `${(travelTime / 60).toFixed(2)} minutes`,
        // };
//     } catch (error) {
//         throw new Error(`Error: ${error.message}`);
//     }
// }

// module.exports.getAutoCompleteSuggestion = async(input) => {
//     if(!input){
//         throw new Error("Query is required");
//     }
//     try {
//         const suggestions = await geocoder.geocode(input);
//         return suggestions;
//     } catch (error) {
//         console.log("Error fetching location suggestions:", error);
//         throw new Error("Unable to fetch location suggestions.");
//     }
    
// }