// const Report = require('../models/Report');

// exports.createReport = async (req, res) => {

//   try {

//     const report = new Report({
//       complaintId: req.params.id,
//       workDescription: req.body.workDescription,
//       materialUsed: req.body.materialUsed,
//       completionDate: req.body.completionDate,
//       progress: req.body.progress,
//       finalRemark: req.body.finalRemark,
//       photo: req.file.path
//     });

//     await report.save();

//     res.json({ message: "Report saved" });

//   } catch (err) {

//     res.status(500).json({ error: err.message });

//   }

// };
const Report = require('../models/Report');

exports.createReport = async (req, res) => {

  try {

    const complaintId = req.params.id;

    // 🔍 check existing report
    let report = await Report.findOne({ complaintId });

    if (report) {
      // ✅ UPDATE
      report.workDescription = req.body.workDescription;
      report.materialUsed = req.body.materialUsed;
      report.completionDate = req.body.completionDate;
      report.progress = req.body.progress;
      report.finalRemark = req.body.finalRemark;

      if (req.file) {
        report.photo = req.file.path;
      }

      await report.save();

      return res.json({ message: "Report updated" });
    }

    // ✅ CREATE नया
    report = new Report({
      complaintId,
      workDescription: req.body.workDescription,
      materialUsed: req.body.materialUsed,
      completionDate: req.body.completionDate,
      progress: req.body.progress,
      finalRemark: req.body.finalRemark,
      photo: req.file?.path
    });

    await report.save();

    res.json({ message: "Report created" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};

exports.getReportByComplaint = async (req, res) => {
  try {

    const report = await Report.findOne({
      complaintId: req.params.id
    });

    if (!report) {
      return res.status(404).json({ message: "No report found" });
    }

    res.json(report);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};