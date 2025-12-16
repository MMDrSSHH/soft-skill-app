export class Comment {
  id = 0;
  rate = "";
  username = "";
  createdAt = new Date();
  isApproved = false;
  body = "";

  constructor({ username, body, rate }) {
    this.username = username;
    this.body = body;
    this.rate = rate;
  }
}
