import Image from "next/image";

type GenericCardProps = {
  title: string;
  description: string;
  image: string;
  className?: string;
};

export default function GenericCard({
  title,
  description,
  image,
  className = "",
}: GenericCardProps) {
  return (
    <div
      className={`bg-white rounded-xl p-6 shadow hover:shadow-lg transition text-center flex flex-col items-center ${className}`}
    >
      <div className="relative w-20 h-20 mb-4">
        <Image
          src={image}
          alt={`${title} logo`}
          fill
          className="object-contain"
          sizes="80px"
          priority
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
