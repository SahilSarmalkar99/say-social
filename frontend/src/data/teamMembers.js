import teamvideo from "../assets/team/team.mp4"

export const teams = [
  {
    id: 1,
    name: "Creative Team",
    video: teamvideo,

    members: [
      {
        id: 1,
        name: "Sahil",
        role: "Creative Director",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
        bio: "Leads branding and creative strategy."
      },
      {
        id: 2,
        name: "Rahul",
        role: "UI Designer",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
        bio: "Creates modern user experiences."
      },
      {
        id: 3,
        name: "Aryan",
        role: "Motion Designer",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
        bio: "Specializes in animations and visuals."
      }
    ]
  },

  // {
  //   id: 2,
  //   name: "Development Team",
  //   video: "/videos/dev-team.mp4",

  //   members: [
  //     {
  //       id: 1,
  //       name: "Aman",
  //       role: "Frontend Developer",
  //       image: "/team/aman.jpg",
  //       bio: "Builds beautiful web applications."
  //     }
  //   ]
  // }
];