const mongoose = require("mongoose");
const formSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  cast: { type: String },
  mobile: {
    type: String,
  },

  state: { type: String },
  city: { type: String },
  owner: { type: String },
  submitted_date: { type: Date, default: Date.now() },
});
const Form = new mongoose.model("Form", formSchema);
module.exports = Form;
