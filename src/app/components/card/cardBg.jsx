import Image from "next/image";

function CardBg() {
  return (
    <figure className="relative">
      <Image src="https://assets.vercel.com/image/upload/v1649775681/docs-assets/static/guides/images/Dark.png" alt="DarkBg" fill style={{ objectFit: "cover" }} priority={false} />
    </figure>
  );
}

export default CardBg;
