import { useEffect, useState } from "react";
import TeamAPI from "../api/team.api";

import TeamVideoCard from "../components/team/TeamVideoCard";
import TeamMemberCard from "../components/team/TeamMemberCard";
import AddMemberCard from "../components/team/AddMemberCard";

export default function TeamPage() {
  const [loading, setLoading] = useState(true);

  const [video, setVideo] = useState("");

  const [members, setMembers] = useState([]);

  const [newMembers, setNewMembers] = useState([
    {
      photo: "",
      name: "",
      role: "",
    },
  ]);

  // ============================
  // FETCH TEAM
  // ============================

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      setLoading(true);

      const { data } = await TeamAPI.getTeam();

      setVideo(data.video || "");
      setMembers(data.members || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load team.");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // VIDEO
  // ============================

  const saveVideo = async () => {
    if (!video.trim()) {
      return alert("Video URL is required.");
    }

    try {
      await TeamAPI.updateVideo(video);

      alert("Video updated successfully.");

      fetchTeam();
    } catch (err) {
      console.error(err);
      alert("Failed to update video.");
    }
  };

  const deleteVideo = async () => {
    if (!window.confirm("Delete team video?")) return;

    try {
      await TeamAPI.deleteVideo();

      setVideo("");

      alert("Video removed.");

      fetchTeam();
    } catch (err) {
      console.error(err);
      alert("Failed to delete video.");
    }
  };

  // ============================
  // ADD MEMBER
  // ============================

  const saveAllMembers = async () => {
  try {
    for (const member of newMembers) {
      if (!member.photo || !member.name || !member.role) {
        return alert("Please fill all member details.");
      }

      await TeamAPI.addMember(member);
    }

    alert("Members Added Successfully");

    setNewMembers([
      {
        photo: "",
        name: "",
        role: "",
      },
    ]);

    fetchTeam();
  } catch (err) {
    console.error(err);
    alert("Failed to add members.");
  }
};

  // ============================
  // UPDATE MEMBER
  // ============================

  const updateMemberField = (memberId, field, value) => {
    setMembers((prev) =>
      prev.map((member) =>
        member._id === memberId
          ? {
              ...member,
              [field]: value,
            }
          : member,
      ),
    );
  };

  const updateMember = async (member) => {
    try {
      await TeamAPI.updateMember(member._id, {
        photo: member.photo,
        name: member.name,
        role: member.role,
      });

      alert("Member updated.");

      fetchTeam();
    } catch (err) {
      console.error(err);
      alert("Failed to update member.");
    }
  };

  // ============================
  // DELETE MEMBER
  // ============================

  const deleteMember = async (memberId) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      await TeamAPI.deleteMember(memberId);

      alert("Member deleted.");

      fetchTeam();
    } catch (err) {
      console.error(err);
      alert("Failed to delete member.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24 text-lg font-semibold">
        Loading Team...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold">Team Management</h1>

      {/* VIDEO */}

      <TeamVideoCard
        video={video}
        setVideo={setVideo}
        onSave={saveVideo}
        onDelete={deleteVideo}
      />

      {/* EXISTING MEMBERS */}

      <div className="space-y-6">
        {members.map((member) => (
          <TeamMemberCard
            key={member._id}
            member={member}
            onChange={updateMemberField}
            onSave={updateMember}
            onDelete={deleteMember}
          />
        ))}
      </div>

      {/* ADD MEMBER */}

      <AddMemberCard
        members={newMembers}
        setMembers={setNewMembers}
        onSaveAll={saveAllMembers}
      />
    </div>
  );
}
