const auth = require('../config/firebase').auth;

const isAuthenticated = async (req, res, next) => {
    if (req.headers.authorization.startsWith('Bearer ')) {
        const idToken = req.headers.authorization.split('Bearer ')[1];
        try {
          const decodedToken = await auth.verifyIdToken(idToken);
          req.user = decodedToken;
        } catch (err) {
          console.log(err);
        }
      }
    next();
}


module.exports = {isAuthenticated}
