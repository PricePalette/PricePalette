import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme'; // Adjust the path accordingly
import Header from '@/components/Header';


export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header/>
        <Container sx={{ marginTop: 4, textAlign: 'center' }}>
          <div>
            <Typography variant="h4" gutterBottom>
              Price Pallette
            </Typography>
            <Typography variant="body1" gutterBottom>
              Customize price pages
            </Typography>
            <Button variant="contained" color="primary" size="large">
              Get Started
            </Button>
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );}
