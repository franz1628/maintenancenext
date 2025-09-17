const ENV = {
  API_URL: process.env.API_URL_BACKEND ?? "http://localhost:3000",
  NODE_ENV: process.env.NODE_ENV ?? "development",
};

export default ENV;