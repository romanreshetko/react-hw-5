import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Tooltip from '@mui/material/Tooltip';
import { Box } from '@mui/material';

export interface itemInterface {
    name: string;
    description: string;
    category: string;
    number: number;
    measure: string;
    picture?: string;
}

export interface itemIdInterface {
    id: number;
    name: string;
    description: string;
    category: string;
    number: number;
    measure: string;
    picture?: string;
}

export const Item : React.FC<itemIdInterface>= (props: itemIdInterface) => {

    return <Card sx={{maxWidth: 345,
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.1)'
                    }
    }}>
        <Tooltip title={props.description}>
        <CardActionArea>
        <CardContent>
        <Typography variant='h3' component='div'>{props.name}</Typography>
        <Typography variant='h4' component='div'>{props.category}</Typography>
        <Box sx={{width: '100%', display: 'flex', alignItems: 'center',
                justifyContent: 'center', overflow: 'hidden', marginBottom: '8px',
                borderRadius: '4px', backgroundColor: '#f0f0f0'
        }}>
            {props.picture ? (
                <CardMedia
                    component='img'
                    image={props.picture}
                    alt={props.name}
                />
            ) : (
                <Typography sx={{color: 'gray'}}>No picture</Typography>
            )}
        </Box>
        <Typography>Number: {props.number} {props.measure}</Typography>
        <Typography sx={{flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{props.description}</Typography>
        </CardContent>
        </CardActionArea>
        </Tooltip>
    </Card>
}