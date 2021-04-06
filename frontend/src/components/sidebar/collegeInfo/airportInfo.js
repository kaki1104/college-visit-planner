import React, { useState } from 'react'
import './index.css'
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';


const useStyles = makeStyles((theme) => ({
    textFieldRoot: {
        width: '100%',
        margin: '20px 0 0 0',
    },
    cardRoot: {
        minWidth: 275,
        margin: '10px 20px 15px 0',
        width: '100%',
    },
    cardContentRoot: {
        backgroundColor: '#fffefc',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

const AirportInfo = (props) => {
    const { airport } = props;
    const [expanded, setExpanded] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card classes={{ root: classes.cardRoot }}>
            <div className="collegeSearchResultInnerContainer">
            <CardContent
                classes={{ root: classes.cardContentRoot }}>
                <Typography variant="h6" component="h2">
                    {airport.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {airport.city}, {airport.state}
                </Typography>
            </CardContent>
            <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </IconButton>
            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {/* <Typography paragraph>{college.description}</Typography> */}
                    <Button size="small" href={airport.website} target="_blank">Learn More</Button>
                </CardContent>
            </Collapse>
        </Card>
    )
}


const mapStateToProps = ({ rMap: { clickedMarker } }) => ({ clickedMarker });

export default connect(mapStateToProps)(AirportInfo);