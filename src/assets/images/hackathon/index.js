import check from "./bigCheck.jpg";
import chat from "./chatBotting.jpg";
import focus from "./focus.jpg";
import group from "./hackGroup.jpg";
import taLogo from "./TechAssistLogo.jpg";

export { check, chat, focus, group, taLogo };

const imgObjs = {
  focused: {
    id: "hack_focused_img",
    src: focus,
    alt: "Me and team Reinforce working together in our project room.",
    title: "Team Reinforce during development",
    caption:
      "Our team, Reinforce, collaborating intensely in our project room during the hackathon.",
    ariaLabel: "Me and team Reinforce working together in our project room.",
  },
  chatbotting: {
    id: "hack_chatbotting_img",
    src: chat,
    alt: "Me showing off to the team the voice translator finding key words from a phrase to use for search algorithm",
    title: "Demonstrating voice-to-text command parsing",
    caption:
      "Demonstrating the voice-to-text functionality that identified key search variables from spoken commands.",
    ariaLabel:
      "Me showing off to the team the voice translator finding key words from a phrase to use for search algorithm",
  },
  groupPhoto: {
    id: "hack_group_photo_img",
    src: group,
    alt: 'Group photo of team "Reinforce" at the Daimler Truck North America Hackathon in 2019',
    title: "Team Reinforce Group Photo",
    caption:
      'Our team "Reinforce" posing together at the Daimler Truck North America Hackathon in 2019.',
    ariaLabel:
      'Group photo of team "Reinforce" at the Daimler Truck North America Hackathon in 2019',
  },
  taLogo: {
    id: "hack_ta_logo_img",
    src: taLogo,
    alt: "Logo for the Tech Assist mobile application showing a microphone and sound waves.",
    title: "Tech Assist Logo",
    caption:
      "Logo for the Tech Assist mobile application featuring a microphone and sound waves, symbolizing voice command functionality.",
    ariaLabel: "Logo for the Tech Assist mobile application showing a microphone and sound waves.",
  },
};

export default imgObjs;
