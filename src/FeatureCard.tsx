interface FeatureCardProps {
  title: string;
  color: string;
}

export default function FeatureCard(props: FeatureCardProps) {
  const cardWrapperStyle: React.CSSProperties = {
    padding: '2px',
    aspectRatio: '1'
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: props.color
  };

  return (
    <div className="mr-4 h-5/6 p-2" style={cardWrapperStyle}>
      <div className="h-full" style={cardStyle}></div>
    </div>
  );
}
