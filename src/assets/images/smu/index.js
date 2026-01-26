import gifFreak from "./gifFreak.png";
import smuLogo from "./SMU_Logo75.png";
import smuCampus from "./SMU_Zoom_Campus.jpg";
import stockMeme from "./stock_memer.png";

export { gifFreak, smuLogo, smuCampus, stockMeme };

const imgObjs = {
  freak: {
    id: "smu_gif_freak_img",
    src: gifFreak,
    alt: "Basic website screenshot showing a grid of gif memes with a search bar at the top. and multiple buttons for categories like 'funny', 'sports', and 'movies'.",
    title: "GIF Freak - Giphy API Project",
    caption:
      "A web application that allows users to search, view, and share GIF memes using the Giphy API.",
    ariaLabel:
      "Screenshot of GIF Freak web application showing a grid of GIF memes with a search bar and category buttons.",
  },
  logo: {
    id: "smu_logo_img",
    src: smuLogo,
    alt: "SMU Logo",
    title: "SMU Logo",
    caption: "The official logo of Southern Methodist University.",
    ariaLabel: "Screenshot of the SMU Logo",
  },
  campus: {
    id: "smu_campus_img",
    src: smuCampus,
    alt: "SMU Campus Zoomed Out",
    title: "SMU Campus",
    caption: "A zoomed-out aerial view of the Southern Methodist University campus.",
    ariaLabel: "Aerial view of the Southern Methodist University campus",
  },
  stocks: {
    id: "smu_stock_memer_img",
    src: stockMeme,
    alt: "Stock Memer Application Screenshot",
    title: "Stock Memer",
    caption: "A web application that generates stock market memes based on real-time stock data.",
    ariaLabel: "Screenshot of the Stock Memer web application",
  },
};

export default imgObjs;
