export class BaseController {
  request;
  response;
  responseCallback = (results, err) => {
    this.response.set("Content-Type", "application/json");
    if (err) {
      this.response.status(400).send({ error: err });
    } else {
      this.response.json(results);
    }
  };
  constructor(req, res) {
    this.request = req;
    this.response = res;
  }
}
