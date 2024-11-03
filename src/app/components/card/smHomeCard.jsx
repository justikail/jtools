function SmHomeCard({ icon, title, text, color }) {
  const Icon = icon;

  return (
    <div className="card bg-base-100 w-auto shadow-base-200 transition-shadow hover:shadow-base-300 shadow-2xl border border-base-content">
      <div className="flex justify-between items-center">
        <div className="card-body max-w-max">
          <h2 className="card-title text-md" style={{ color: color }}>
            {text}
          </h2>
          <p className="text-xs">{title}</p>
        </div>
        <div className="card-body h-full max-w-max">
          <Icon size="40px" color={color} />
        </div>
      </div>
    </div>
  );
}

export default SmHomeCard;
