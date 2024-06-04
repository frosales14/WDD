
const Utility = {};

Utility.buildErrorPage = async function (status) {
  if (status == 500) {
    return {
      status: 500,
      message: "Sorry, something went wrong on our end. Please try again later.",
      image: "/images/site/error.png",
    };
  } else if (status == 404) {
    return {
      status: 404,
      message: "The page you are looking for could not be found.",
      image: "/images/site/error.png",
    };
  } else {
    return {
      status: 406,
      message: "Not Acceptable.",
      image: "/images/site/error.png",
    };
  }
};


Utility.corsHeaders = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  next();
};

module.exports = Utility;