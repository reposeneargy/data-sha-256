const mongoose = require("mongoose");
const formSchema = new mongoose.Schema({
  phone: {
    type: Number,
    unique: true,
    required: ["true", "Phone number is required."],
    minlength: [10, "phone number must contain 10 digit."],
  },

  submitted_date: { type: Date, default: Date.now() },
});
const Coustmer = new mongoose.model("Coustmer", formSchema);
module.exports = Coustmer;
