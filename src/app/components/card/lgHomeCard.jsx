import CardBg from "@/components/card/cardBg";

function LgHomeCard({ children, icon, title }) {
  const Icon = icon;

  return (
    <div className="card image-full bg-base-100 lg:w-96 w-full shadow-base-200 transition-shadow hover:shadow-base-300 shadow-2xl border border-base-content lg:h-auto flex flex-1 lg:flex-initial">
      <CardBg />
      <div className="card-body">
        <h2 className="card-title">
          <Icon size="25px" color="#eab308" /> {title}
        </h2>
        <div className="divider my-0"></div>
        {children}
      </div>
    </div>
  );
}

export default LgHomeCard;
