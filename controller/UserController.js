const Form01 = require("../models/Form01");
const User = require("../models/User");
const Form = require("../models/form");
const ExcelJS = require("exceljs");
exports.testFunction = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Testing API Routes. Passed Ok.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in testing API Routes",
    });
  }
};
exports.submitFormPartner = async (req, res) => {
  try {
    const {} = req.body;

    res.status(200).json({
      success: true,
      message: "Form submitted successfully. please wait....",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in submitting form",
    });
  }
};
exports.submitFormDATNUM = async (req, res) => {
  try {
    const {} = req.body;

    res.status(200).json({
      success: true,
      message: "Form submitted successfully. please wait....",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in submitting form",
    });
  }
};
exports.userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(422).json({
        success: false,
        message: "User already exists.",
      });
    }
    user = await User.create({ name, email, password });

    //setting cookies in browser .
    const token = await user.generateAuthToken();
    console.log(token);

    const userId = await user._id.toString();
    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res
      .status(201)
      .cookie("userId", userId, options)
      .cookie("token", token, options)
      .json({
        success: true,
        token,
        message: "User created Successfully.",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ` ${error.message}`,
    });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    const isMatched = user.matchPassword(password);
    if (!isMatched) {
      return res.status(409).json({
        success: false,
        message: "Invalid credientials.",
      });
    }
    user.password = null;
    const token = await user.generateAuthToken();
    const userId = await user._id.toString();
    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res
      .status(200)
      .cookie("token", token, options)
      .cookie("userId", userId, options)
      .json({
        success: true,
        message: "Logged in successfully",
      });
  } catch (error) {
    return res.status(502).json({
      success: false,
      message: error.message,
    });
  }
};
exports.userLogout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .cookie("userId", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .cookie("Authorised", "false")
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ` ${error.message}`,
    });
  }
};
exports.downloadAllForms = async (req, res) => {
  try {
    let { type } = req.query;
    const partnerForms = await Form.find();
    const DiselForm = await Form01.find();
    if (partnerForms && DiselForm) {
      if (type === "partner") {
        // Create a new Excel workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("partnerForms");
        // Add headers to the worksheet
        worksheet.addRow([
          "First Name",
          "Last Name",
          "Cast",
          "Mobile",
          "State",
          "City",
          "Owner",
          "Submitted Date",
        ]);

        // Populate worksheet with data
        partnerForms.forEach((item) => {
          worksheet.addRow([
            item.firstName,
            item.lastName,
            item.cast,
            item.mobile,
            item.state,
            item.city,
            item.owner,
            item.submitted_date,
          ]);
        });
        // Set response headers for Excel download
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=Partner-Form-data.xlsx"
        );

        // Write the Excel file to the response
        await workbook.xlsx.write(res);

        // End the response
        res.end();
      } else if (type === "disel") {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("partnerForms");
        // Add headers to the worksheet
        worksheet.addRow([
          "First Name",
          "Last Name",
          "Company",
          "Mobile",
          "Email",
          "City",
          "State",
          "Monthly Uses",
          "Submitted Date",
        ]);

        // Populate worksheet with data
        DiselForm.forEach((item) => {
          worksheet.addRow([
            item.firstName,
            item.lastName,
            item.nameOfcompany,
            item.phone,
            item.email,
            item.city,
            item.state,
            item.monthly_uses,
            item.submitted_date,
          ]);
        });
        // Set response headers for Excel download
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=Disel-Form-data.xlsx"
        );

        // Write the Excel file to the response
        await workbook.xlsx.write(res);

        // End the response
        res.end();
      } else {
        return res.status(422).json({
          success: false,
          message: "Query not matched",
        });
      }
    } else {
      return res.status(404).json({
        success: true,
        message: "No  forms submitted yet.",
      });
    }
  } catch (error) {
    return res.status(502).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getpform = async (req, res) => {
  try {
    const partnerForms = await Form.find();
    res.status(200).json({
      success: true,
      data: partnerForms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ` ${error.message}`,
    });
  }
};
exports.getdform = async (req, res) => {
  try {
    const partnerForms = await Form01.find();
    res.status(200).json({
      success: true,
      data: partnerForms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ` ${error.message}`,
    });
  }
};
