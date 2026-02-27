const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");

router.post("/", memberController.addMember);
router.get("/", memberController.getMembers);
router.put("/:id", memberController.updateMember);
router.delete("/:id", memberController.deleteMember);

module.exports = router;