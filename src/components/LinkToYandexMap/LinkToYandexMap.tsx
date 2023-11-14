import './LinkToYandexMap.css'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';

interface ILinkToYandexMapProps {
	city: string;
	address: string;
}

const LinkToYandexMap: React.FC<ILinkToYandexMapProps> = ({
	city,
	address,
}) => {
	return (
		<a
			href={`https://yandex.ru/maps/?text=${city}, ${address}`}
			target="_blank"
			rel="noreferrer"
		>
			<div className="map-icon">
				<MapOutlinedIcon fontSize="medium" style={{ color: '#05887B' }} />
			</div>
		</a>
	);
};

export default LinkToYandexMap;
