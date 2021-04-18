import React from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';

const Boxed = withStyles({
    root: {
        margin: "8px 0 10px 0"
    },
})(Box);

const BoxedSpaceAfter = withStyles({
    root: {
        margin: "0 0 10px 0"
    },
})(Box);

const BoxedSpaceBefore = withStyles({
    root: {
        margin: "10px 0 0 0"
    },
})(Box);

const Terms = () => {
    return(
        <Typography>
            <BoxedSpaceAfter>
                Hi, welcome to College Trip Planner! ✈️
            </BoxedSpaceAfter>

            <Boxed>
                This website is created as the term project for Brown University's CS32 course. 
                Because we are collecting your information as you sign up, we would like you to understand the data usage involved in this website before you proceed. 🧐
            </Boxed>

            <Boxed>
                If you sign up, you are providing us with the consent to collect and store your personal identification information and your travel information.
            </Boxed>

            <Boxed>
                Whenever you add or delete a college, your data is immediately stored into our encrypted database. 
                We process the colleges you enter using our algorithms to help you design your college trip. 
                Since the only purpose of this website is to generate optimized trips, you cannot restrict or 
                object data processing.
            </Boxed>
            
            <Boxed>
                After you sign up, you will be able to erase your entire account, 
                or erase all your trip information without removing the account. 
                You can find detailed instructions in Settings after you log in.
            </Boxed>

            <Boxed>
                With that being said, let's sign up and start exploring! 👻
            </Boxed>

</Typography>
)}

export default Terms;
