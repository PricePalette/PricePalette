import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  ListItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircleOutline, ExpandMore } from "@mui/icons-material";
import { plansData } from "../../mockdata";

export default function ViewPlans() {
  const theme = useTheme();
  const handleCheckout = () =>{

  }
  return (
    <>
      <Header />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Grid item>
            <Typography sx={{fontSize:40}}>Choose the plan that is right for you</Typography>
            <Typography color="text.secondary" sx={{fontSize:20, textAlign:"center"}}>Grow with ease, Scale your solutions, Pay as you Progress</Typography>
          </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          sx={{ display: 'flex', flexDirection: 'row',         }}
        >
          {plansData.map((eachPlan) => (
              <Paper
                key={eachPlan.id}
                elevation={3}
                style={{borderRadius: 15,}}
                sx={{
                  width: 300, 
                  height:450,
                  transition: 'transform 0.5s ease',
                  cursor: 'pointer',
                  margin: 3,
                 
                  textAlign: 'center', 
                  '&:hover': {
                    transform: 'scale(1.15)',
                    boxShadow: '5px 5px 15px rgba(0,0,0,0.6)'
                  }
                }}
              >
                <Card sx={{height:"100%", borderRadius: 4}}>
                  <CardHeader
                    title={eachPlan.title}
                    subheader={eachPlan.subTitle}
                  />
                   <CardContent>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', fontSize: 30 }}>{eachPlan.price}</Typography>
                    </CardContent>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  style={{
                    borderRadius: 20,
                  }}
                  onClick={handleCheckout}
                >
                  One Time
                </Button>
                <CardContent>
                {eachPlan.features.map((eachFeature, index) => (
                    <ListItem key={index} disableGutters >
                    <ListItemIcon>
                        <CheckCircleOutline color="primary"/>
                    </ListItemIcon>
                    <Typography variant="body2" color="text.secondary">
                        {eachFeature}
                    </Typography>
                    </ListItem>
                ))}
                </CardContent>
                </Card>
              </Paper>
          ))}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
