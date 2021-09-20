import React from 'react';
import {Card,CardContent,Typography} from '@material-ui/core'



export default function InfoBox({cases,title,total,...props}){

       return(
          <Card className="InfoBox" onClick={props.onClick} >
            <CardContent className="content_setup">
               <Typography className="InfoBox__title" color="textSecondary" p="2">{title}</Typography>
                <h3 className="InfoBox__cases">{cases}</h3>
                <Typography className="InfoBox__total" color="textSecondary">{total} Total</Typography>
            </CardContent>
          </Card>
       )

}