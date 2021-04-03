import './index.css'
import React, { useState } from "react";
import { connect, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PopDialog from "./popDialog/index";
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { routeActions } from '../../../actions/routeActions'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: '10px 20px 15px 0',
    },
    cardRoot: {
        backgroundColor: '#fffefc',
    },
});

const MyColleges = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    // const [dialogOpen, setDialogOpen] = useState(false);

    // const handleClickOpen = () => {
    //     setDialogOpen(true);
    // };

    // const handleClose = () => {
    //     setDialogOpen(false);
    // };

    const handleClickAdd = () => {
        dispatch(routeActions.navigatePopDialog('searchCollege'));
    }

    const handleClose = () => {
        dispatch(routeActions.navigatePopDialog(''));
    }

    const colleges = [{ name: "Brown University", city: "Providence", state: "Rhode Island" },
    { name: "University of California, Los Angeles", city: "Los Angeles", state: "California" },
    { name: "Brown University", city: "Providence", state: "Rhode Island" },
    { name: "Brown University", city: "Providence", state: "Rhode Island" },
    { name: "Brown University", city: "Providence", state: "Rhode Island" },
    { name: "Brown University", city: "Providence", state: "Rhode Island" },
    { name: "Brown University", city: "Providence", state: "Rhode Island" }]

    // const colleges = [];

    return (
    <div className="leftPadd">
        <div className="myCollegeHeader">
            <h1>My Colleges</h1>
            <IconButton onClick={handleClickAdd}>
                <AddIcon fontSize="large"/>
            </IconButton>
        </div>

        <div className="collegeList">
            {Object.values(props.user.colleges).map(c =>
                <Card
                    classes={{ root: classes.root }}>
                    <CardContent
                        classes={{ root: classes.cardRoot }}>
                        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                 Word of the Day
               </Typography> */}
                        <Typography variant="h6" component="h2">
                            {c.name}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {c.city}, {c.state}
                        </Typography>
                        <Button size="small" href={c.url} target="_blank">Learn More</Button>
                    </CardContent>
                </Card>
                // <div className="college">
                //     <h3 className="collegeName">{c.name}</h3>
                //     <h3 className="collegeLocation">{c.city}</h3>
                // </div>
            )}
        </div>


        {Object.values(props.user.colleges).length === 0 && (
            <div className="noCollege">
                No college to visit yet 😞 <br />
                Click add to start planning your trip!
            </div>
        )}

        <PopDialog open={props.popDialog !== ''} handleClose={handleClose}>

        </PopDialog>
    </div>)
}

const mapStateToProps = ({ rUser: { user }, rRoute: { popDialog } }) => ({ user, popDialog });

export default connect(mapStateToProps)(MyColleges);
