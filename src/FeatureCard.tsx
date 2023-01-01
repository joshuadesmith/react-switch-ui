import { SteamGame } from './model/SteamGamesResponse';
import { getSteamImageUrl } from './utility/SteamUtil';

interface FeatureCardProps {
  game?: SteamGame;
}

export default function FeatureCard(props: FeatureCardProps) {
  const cardWrapperStyle: React.CSSProperties = {
    padding: '2px',
    aspectRatio: '1'
  };

  const imgUrl = props.game ? getSteamImageUrl(props.game.appid) : '';
  const cardStyle: React.CSSProperties = {
    backgroundImage: `url(${imgUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  const emptyCardStyle: React.CSSProperties = {
    border: '1px solid #e8e8e8',
    borderRadius: '2px'
  };

  return (
    <div className="mr-4 h-5/6 p-2" style={cardWrapperStyle}>
      {props.game ? (
        <div className="h-full" style={cardStyle}></div>
      ) : (
        <div className="flex h-full items-center justify-center" style={emptyCardStyle}>
          <div>No Recent Games Found</div>
        </div>
      )}
    </div>
  );
}
