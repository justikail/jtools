import BreadCrumbs from "../templates/breadCrumbs";
import CardBg from "./cardBg";
import * as Uil from "@iconscout/react-unicons";
import CardRecommendation from "./cardRecommendation";

function CardTools({ children, title, description }) {
  return (
    <main className="max-w-7xl mx-auto px-4">
      <BreadCrumbs />

      <div className="mb-6 mt-4 flex flex-col gap-12">
        <div className="card image-full bg-base-100 shadow-base-200 transition-shadow hover:shadow-base-300 shadow-2xl border border-base-content w-full">
          <CardBg />

          <div className="card-body">
            <div className="flex flex-col gap-4 w-full">
              <h2 className="card-title uppercase text-base md:font-extrabold md:text-lg">
                <Uil.UilLabelAlt size="20px" color="#eab308" />
                {title}
              </h2>
              <p className="text-xs md:text-sm text-base-content/70">{description}</p>
            </div>
            <div className="divider my-0"></div>
            {children}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="card image-full bg-base-100 transition-shadow border border-base-content w-full rounded-b-none">
            <CardBg />
            <div className="card-body gap-4 py-4">
              <div className="text-center font-bold text-xl">
                <h1>Recommendation Tools</h1>
              </div>
            </div>
          </div>
          <CardRecommendation />
        </div>
      </div>
    </main>
  );
}

export default CardTools;
