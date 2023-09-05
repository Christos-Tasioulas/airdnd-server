const { Sequelize } = require('sequelize');
const db = require('../model')
const jwt = require('jsonwebtoken');
const { Op, literal } = require('sequelize');
const User = db.users
const Listing = db.listings
const UserListingParams = db.userlistingsparams


// Request using POST method that adds a user to the database
const addUser = async (req, res) => {
  console.log(req.body);
  try {
    await User.create({
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      image: req.body.image,
      isAdmin: req.body.isAdmin,
      isLandlord: req.body.isLandlord,
      isTenant: req.body.isTenant,
      isApproved: req.body.isApproved
    });

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

const generateToken = async (req, res) => {
  // Validate User Here
  // Then generate JWT Token

  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  const expiresIn = '1h'; // Token will expire in 1 hour

  let data = {
    time: Date(),
    id: req.body.id,
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
    isLandlord: req.body.isLandlord,
    isTenant: req.body.isTenant
  }

  const token = jwt.sign(data, jwtSecretKey, { expiresIn });

  res.status(200).json({token: token});
}
  
// Request using GET method that retrieves all user information from the database
const getAllUsers = async (req,res) => {
  let users = await User.findAll()
  res.status(200).json({message: users})
}

// Request using GET method that retrieves all users that share the same username as given from the parameters of the request
const isUsernameTaken = async (req, res) => {
  const username = req.params.username;

  try {

    const users = await User.findAll({
      where: { username: username },
    });

    const message = users.length > 0 ? "Username already taken" : ""
    res.status(200).json({message: message});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve users by username" });
  }
};

// Request using GET method that retrieves the user with the id given from the parameters of the request
const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({
      where: { id: id },
    });
    res.status(200).json({message: user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve user by id" });
  }
};

// Request using GET method that retrieves the user with the id given from the parameters of the request
const getUserByUsername = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({
      where: { username: username },
    });
    res.status(200).json({message: user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve user by username" });
  }
};

const validateToken = async (req, res) => {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);
    const tokenWithoutBearer = token.replace("Bearer ", "");
    const verified = jwt.verify(tokenWithoutBearer, jwtSecretKey);

    if (verified) {
      return res.status(200).json({ message: "Token successfully verified" });
    } else {
      return res.status(401).json({ error: "Access denied: Invalid token" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Access denied: Invalid token" });
  }
};

const decodeToken = async (req, res) => {

  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;

  try {

    const token = req.header(tokenHeaderKey);
    const tokenWithoutBearer = token.replace("Bearer ", "");
    const decodedToken = jwt.decode(tokenWithoutBearer);

    if (decodedToken) {

      return res.status(200).json(
        {
          time: decodedToken.time,
          id: decodedToken.id,
          username: decodedToken.username,
          password: decodedToken.password,
          isAdmin: decodedToken.isAdmin,
          isLandlord: decodedToken.isLandlord,
          isTenant: decodedToken.isTenant 
        }
      )

    } else {
      return res.status(401).send(error)
    }
    
  } catch (error) {
    
    // Access Denied
    return res.status(401).send(error);

  }
}

function standardization(mean, std, value) {
  if(std !== 0) {
    return (value - mean) / std
  }
  else return value
}

function minMaxScale(min, max, value) {
  if(max !== min)
  {
    return (value - min) / (max - min);
  }
  else return value
}

function predictRating(userVector, itemVector, numLatentFactors) {
  let rating = 0;
  for (let k = 0; k < numLatentFactors; k++) {
    rating += userVector[k] * itemVector[k];
  }
  return rating;
}

function matrixFactorization(index, userItemMatrix) {
  const numUsers = userItemMatrix.length
  const numItems = userItemMatrix[0].length
  const numLatentFactors = 7; 
  const learningRate = 0.01; 
  const regularization = 0.05; 
  const maxIterations = 1000; 

  let UserFeatures = []
  let ItemFeatures = []

  for (let i = 0; i < numUsers; i++) {
      UserFeatures.push(new Array(numLatentFactors).fill(0));
  }
  for (let i = 0; i < numItems; i++) {
      ItemFeatures.push(new Array(numLatentFactors).fill(0));
  }

  for (let i = 0; i < numUsers; i++) {
      for (let j = 0; j < numLatentFactors; j++) {
          UserFeatures[i][j] = Math.random() * 0.15;
      }
  }
  for (let i = 0; i < numItems; i++) {
      for (let j = 0; j < numLatentFactors; j++) {
          ItemFeatures[i][j] = Math.random() * 0.15;
      }
  }

  // Stochastic Gradient Descent
  for (let iteration = 0; iteration < maxIterations; iteration++) {
    for (let i = 0; i < numUsers; i++) {
      for (let j = 0; j < numItems; j++) {
        if (userItemMatrix[i][j] !== 0) {
          const error = userItemMatrix[i][j] - predictRating(UserFeatures[i], ItemFeatures[j]);
          for (let k = 0; k < numLatentFactors; k++) {
            const UserFeaturesTemp = UserFeatures[i][k];
            UserFeatures[i][k] += learningRate * (2 * error * ItemFeatures[j][k] - 2 * regularization * UserFeatures[i][k]);
            ItemFeatures[j][k] += learningRate * (2 * error * UserFeaturesTemp - 2 * regularization * ItemFeatures[j][k]);
          }
        }
      }
    }
  }

  // Generate Recommendations
  const userRow = UserFeatures[index]
  const predictedRatings = [];
  for (let j = 0; j < numItems; j++) {
    predictedRatings.push(predictRating(userRow, ItemFeatures[j]));
  }

  // Sort and retrieve top recommendations
  const topRecommendations = predictedRatings
  .map((rating, itemIndex) => ({ itemIndex, rating }))
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 10); // Adjust the number of recommendations as needed

  return topRecommendations

}

const recommend = async (req, res) => {
  try {

    const id = req.params.id;
    const userId = parseInt(id, 10); // Convert the id to an integer

    const user = await User.findOne({
      where: {
        id: userId, // Use the converted userId for the query
      },
    });

    let index;

    if (user !== null) {
      console.log('User found');

      const users = await User.findAll({
        order: [['id', 'ASC']],
      });

      index = users.findIndex((entry) => entry.id === userId); // Use userId for comparison

      if (index === -1) res.status(404).json({ message: 'User Not Found.' });
    } else {
      res.status(404).json({ message: 'User Not Found.' });
    }

    const users = await User.findAll()

    const listings = await Listing.findAll()

    const userItemMatrix = Array.from({ length: users.length }, () =>
      Array(listings.length).fill(0)
    );
    
    const usersLength = userItemMatrix.length;
    const listingsLength = userItemMatrix[0].length;

    for(let i = 0; i < usersLength; i++) {
      for(let j = 0; j < listingsLength; j++) {
        
        const userlistingparams = await UserListingParams.findOne({
          where: {
            userId: users[i].id,
            listingId: listings[j].id
          }
        })

        const columns = await UserListingParams.rawAttributes
        for (var key in columns) {

          if (key === 'rating' || key === 'visitCount') {

            const meanResult = await UserListingParams.findOne({
              attributes: [
                [Sequelize.fn('AVG', Sequelize.col(key)), 'meanValue'],
              ],
            })

            const meanValue = meanResult.getDataValue('meanValue');
            // console.log("mean for " + key + " : " + meanValue)

            const stdResult = await UserListingParams.findOne({
              attributes: [
                [Sequelize.literal(`STDDEV_POP("${key}")`), 'standardDeviation'],
              ],
            })

            const standardDeviation = parseFloat(stdResult.getDataValue('standardDeviation'));
            // console.log("standard deviation for " + key + " : " + standardDeviation)

            const value = standardization(meanValue, standardDeviation, userlistingparams[key])
            
            userItemMatrix[i][j] += value

          }
          else if (
            key === "timesHasBooked" || 
            key === "timesHasSearchedCountry" || 
            key === "timeshasSearchedCity" ||
            key === "timesHasSearchedNeighborhood" ||
            key === "timeshasSearchedMaxGuests"
          ) {

            const maxResult = await UserListingParams.findOne({
              attributes: [
                [Sequelize.fn('MAX', Sequelize.col(key)), 'maxValue'],
              ],
            })

            const maxValue = maxResult.getDataValue('maxValue')
            // console.log("Max value for " + key + " : " + maxValue)
            
            const minResult = await UserListingParams.findOne({
              attributes: [
                [Sequelize.fn('MIN', Sequelize.col(key)), 'minValue'],
              ],
            })
            
            const minValue = minResult.getDataValue('minValue')

            const value = minMaxScale(minValue, maxValue, userlistingparams[key])

            userItemMatrix[i][j] += value
          
          }
        }
      }
    }

    const topRecommendations = matrixFactorization(index, userItemMatrix)

    let recommended_places = []

    const entries = await Listing.findAll({});
    
    for(let i=0; i<topRecommendations.length; i++) {
      recommended_places = [...recommended_places, entries[topRecommendations[i].itemIndex]]
    }

    recommended_places = recommended_places.sort(((a, b) => a.dailyPrice - b.dailyPrice))

    res.status(200).json({message: recommended_places})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'An error occurred while generating recommendations.'});
  }
}

// Request using PUT method that updates the isApproved field of the user given his id
const approveUser = async (req, res) => {
  try {
    await User.update(
      {isApproved: req.body.isApproved},
      {where: {id: req.body.id}}
    )
    res.status(200).json({message: "Successfully updated"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to approve user" });
  }
}

// Request using PUT method that updates all the fields of the user given his id
// ID NEVER CHANGES
const updateUser = async (req, res) => {
  try {
    const updatedData = {
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      image: req.body.image,
      isAdmin: req.body.isAdmin,
      isLandlord: req.body.isLandlord,
      isTenant: req.body.isTenant,
      isApproved: req.body.isApproved,
    };

    await User.update(updatedData, {
      where: { id: req.body.id },
    });

    res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user" });
  }
};


module.exports = {
  addUser,
  generateToken,
  getAllUsers,
  isUsernameTaken,
  getUserById,
  getUserByUsername,
  validateToken,
  decodeToken,
  recommend,
  approveUser,
  updateUser
}