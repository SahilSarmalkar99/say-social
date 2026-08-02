import Team from "../models/team.model.js";

/**
 * GET TEAM
 */
export const getTeam = async (req, res) => {
  try {
    let team = await Team.findOne();

    if (!team) {
      team = await Team.create({
        video: "",
        members: [],
      });
    }

    res.status(200).json(team);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * ============================
 * VIDEO APIs
 * ============================
 */

/**
 * Add / Replace Video
 */
export const updateVideo = async (req, res) => {
  try {
    const { video } = req.body;

    if (!video) {
      return res.status(400).json({
        success: false,
        message: "Video URL is required",
      });
    }

    let team = await Team.findOne();

    if (!team) {
      team = await Team.create({
        video,
        members: [],
      });
    } else {
      team.video = video;
      await team.save();
    }

    res.json({
      success: true,
      message: "Video Updated",
      data: team,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Remove Video
 */
export const deleteVideo = async (req, res) => {
  try {
    const team = await Team.findOne();

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    team.video = "";
    await team.save();

    res.json({
      success: true,
      message: "Video Removed",
      data: team,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * ============================
 * MEMBER APIs
 * ============================
 */

/**
 * Add Member
 */
export const addMember = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { photo, name, role } = req.body;

    console.log({ photo, name, role });

    let team = await Team.findOne();
    console.log("Team:", team);

    if (!team) {
      team = await Team.create({
        video: "",
        members: [],
      });
    }

    team.members.push({
      photo,
      name,
      role,
    });

    console.log("Before Save");

    await team.save();

    console.log("Saved Successfully");

    res.status(201).json({
      success: true,
      data: team,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  }
};

/**
 * Update Member
 */
export const updateMember = async (req, res) => {
  try {
    const { memberId } = req.params;
    const { photo, name, role } = req.body;

    const team = await Team.findOne();

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    const member = team.members.id(memberId);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    if (photo !== undefined) member.photo = photo;
    if (name !== undefined) member.name = name;
    if (role !== undefined) member.role = role;

    await team.save();

    res.json({
      success: true,
      message: "Member Updated",
      data: team,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Delete Member
 */
export const deleteMember = async (req, res) => {
  try {
    const { memberId } = req.params;

    const team = await Team.findOne();

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    team.members.pull(memberId);

    await team.save();

    res.json({
      success: true,
      message: "Member Deleted",
      data: team,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};