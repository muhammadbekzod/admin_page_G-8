import * as React from "react";
import Snackbar from "@mui/joy/Snackbar";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { Input } from "@mui/joy";

export default function AddMotor() {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Ma'lumot Qo'shish
      </Button>
      <Snackbar
        autoHideDuration={5000}
        variant="solid"
        color="primary"
        size="lg"
        invertedColors
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={(theme) => ({
          background: `linear-gradient(45deg, ${theme.palette.primary[600]} 30%, ${theme.palette.primary[500]} 90%})`,
          maxWidth: 360,
        })}
      >
        <div>
          <Typography level="title-lg" sx={{ textAlign: "center" }}>
            Malumot Qo'shish
          </Typography>
          <Typography sx={{ mt: 1, mb: 2 }}>
            <Input color="primary" placeholder="brand" />
            <Input color="primary" placeholder="brand" />
            <Input color="primary" placeholder="brand" />
            <Input color="primary" placeholder="brand" />
            <Input color="primary" placeholder="brand" />
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: "flex", justifyContent: "right" }}
          >
            <Button
              variant="solid"
              color="primary"
              onClick={() => setOpen(false)}
            >
              Qo'shish
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setOpen(false)}
            >
              Bekor qilish
            </Button>
          </Stack>
        </div>
      </Snackbar>
    </React.Fragment>
  );
}
