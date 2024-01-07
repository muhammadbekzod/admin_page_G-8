import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { Input } from "@mui/joy";
import Snackbar from "@mui/joy/Snackbar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const BASEURL = "http://localhost:5050/api/v1";

export default function MotorComponent() {
  const [allData, setAllData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [cost, setCost] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASEURL}/motors/allMotors`);
        const data = await response.json();
        setAllData(data.data);
      } catch (error) {
        console.log("Motor data is wrong:", error);
      }
    };
    fetchData();
  }, []);

  const handleClick = async () => {
    try {
      const response = await fetch(`${BASEURL}/motors/createMotor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          brand: brand,
          desc: desc,
          cost: cost,
        }),
      });
      await response.json();
      if (response.ok) {
        setOpen(true);
      }
    } catch (error) {
      console.log("Add motor data is wrong:", error);
    }
  };
  console.log("data:", allData);
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />

        <Button
          variant="contained"
          color="success"
          onClick={() => setOpen(true)}
        >
          Add
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
              <Input
                color="primary"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                color="primary"
                placeholder="brand"
                onChange={(e) => setBrand(e.target.value)}
              />
              <Input
                color="primary"
                placeholder="cost"
                onChange={(e) => setCost(e.target.value)}
              />
              <Input
                color="primary"
                placeholder="desc"
                onChange={(e) => setDesc(e.target.value)}
              />
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{ display: "flex", justifyContent: "right" }}
            >
              <Button variant="solid" color="success" onClick={handleClick}>
                Qo'shish
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setOpen(false)}
              >
                Bekor qilish
              </Button>
            </Stack>
          </div>
        </Snackbar>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Brand</StyledTableCell>
              <StyledTableCell>Company</StyledTableCell>
              <StyledTableCell>Licence</StyledTableCell>
              <StyledTableCell>Cost</StyledTableCell>
              <StyledTableCell>People</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell align="right">Tools</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allData.map((data) => (
              <StyledTableRow key={data.name}>
                <StyledTableCell>{data.name || "No Data"}</StyledTableCell>
                <StyledTableCell>{data.brand || "No Data"}</StyledTableCell>
                <StyledTableCell>{data.cost || "No Data"}</StyledTableCell>
                <StyledTableCell>{data.desc || "No Data"}</StyledTableCell>
                <StyledTableCell>{data.cost || "No Data"}</StyledTableCell>
                <StyledTableCell>{data.carbs || "No Data"}</StyledTableCell>
                <StyledTableCell>{data.protein || "No Data"}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    style={{ marginLeft: 10 }}
                  >
                    Edit
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
