import { useEffect, useState } from "react";

import TeamHero from "../components/team/TeamHero";
import AboutStory from "../components/team/AboutStory";
import TeamSection from "../components/team/TeamMember";
import CommonFooter from "../components/CommonFooter";
import Navbar from "../components/Navbar";

import TeamAPI from "../api/team.api";

import useFadeUpCards from "../hooks/useFadeIn";

const Team = () => {
  const fadeIn = useFadeUpCards();

  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await TeamAPI.getAll();

        // res.data is a single object
        setTeam(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div ref={fadeIn}>
      <Navbar visible />

      <TeamHero />

      <AboutStory />

      <div className="text-center">
        <span
          className="
            inline-block
            px-4
            py-2
            border
            border-white/20
            rounded-full
            text-sm
            uppercase
            tracking-[0.2em]
            text-white
            fade-card
          "
        >
          Our Team
        </span>
      </div>

      <TeamSection team={team} />

      <CommonFooter />
    </div>
  );
};

export default Team;