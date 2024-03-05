import { CheckCircleOutline } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  ListItem,
  ListItemIcon,
  Paper,
  Typography,
} from "@mui/material";

export default function Template1() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div>
        <Typography
          sx={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}
        >
          Choose the plan that is right for you
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ fontSize: 20, textAlign: "center" }}
        >
          Grow with ease, Scale your solutions, Pay as you Progress
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {[1, 2, 3].map((id) => (
          <Paper
            key={id}
            style={{ borderRadius: 15 }}
            sx={{
              width: 250,
              cursor: "pointer",
              margin: 3,
              textAlign: "center",
            }}
          >
            <Card sx={{ height: "100%", borderRadius: 4 }}>
              <CardHeader title="Example title" subheader="Example subtitle" />
              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: "bold", fontSize: 30 }}
                >
                  20$
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                style={{
                  borderRadius: 20,
                }}
              >
                One Time
              </Button>
              <CardContent>
                {["Feature 1", "Feature 2", "Feature 3"].map(
                  (eachFeature, index) => (
                    <ListItem key={index} disableGutters>
                      <ListItemIcon>
                        <CheckCircleOutline color="primary" />
                      </ListItemIcon>
                      <Typography variant="body2" color="text.secondary">
                        {eachFeature}
                      </Typography>
                    </ListItem>
                  )
                )}
              </CardContent>
            </Card>
          </Paper>
        ))}
      </div>
    </div>
  );
}
