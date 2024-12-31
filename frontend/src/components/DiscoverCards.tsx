import { Cards } from "./Cards";

export const DiscoverCards = () => {
  const cards = [
    {
      text: "Suggest 5 plants that can live indoors and are low maintenance",
      imgSrc: "/Cards/coffee.jpg",
    },
    {
      text: "Suggest 5 plants that can live indoors and are low maintenance",
      imgSrc: "/Cards/coffee.jpg",
    },
    {
      text: "Suggest 5 plants that can live indoors and are low maintenance",
      imgSrc: "/Cards/coffee.jpg",
    },
  ];
  return (
    <div>
      <div className="text-[#D0CDE4] block sm:hidden  text-[38px] text-center py-[28px]">
        What i can Help you with today
      </div>
      <div className="hidden sm:flex  gap-[28px] ">
        {cards.map((value, index) => {
          return <Cards key={index} text={value.text} imgSrc={value.imgSrc} />;
        })}
      </div>
    </div>
  );
};
