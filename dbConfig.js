export const config = {
  server: "127.0.0.1", //update me,
  authentication: {
    type: "default",
    options: {
      userName: "sa", //update me
      password: "Av3$truz", //update me
    },
  },
  options: {
    // If you are on Microsoft Azure, you need encryption:
    encrypt: false,
    database: "test", //update me
    rowCollectionOnRequestCompletion: true,
  },
};
