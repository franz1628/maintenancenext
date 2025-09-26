const ENV = {
  API_URL: process.env.API_URL_BACKEND ?? "http://localhost:3000",
  NODE_ENV: process.env.NODE_ENV ?? "development",
  URL_UPLOADS: process.env.URL_UPLOADS ?? "http://localhost:3000/uploads",
};

export default ENV;