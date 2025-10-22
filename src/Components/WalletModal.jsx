import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "50%", sm: "30%", md: "30%" },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function WalletModal({
  walletModalOpen,
  handleWalletClose,
  setWalletBalance,
}) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let temp = { ...errors };
    // temp.title = formData.title ? "" : "This field is required.";
    temp.price = formData.price ? "" : "This field is required.";
    // temp.category = formData.category ? "" : "This field is required.";
    // temp.date = formData.date ? "" : "This field is required.";
    setErrors({
      ...temp,
    });
    // Return true if no errors
    return Object.values(temp).every((x) => x === "");
  };

  const clearForm = () => {
    setFormData({
      title: "",
      price: "",
      category: "",
      date: "",
    });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted:", formData);

      // Add expense to the list
      //setExpenses((prevExpenses) => [...prevExpenses, formData]);

      // Add income to the wallet balance
      setWalletBalance((prev) => prev + Number(formData.price));
      clearForm();
      handleWalletClose();
    } else {
      console.log("Form not submitted");
    }
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={walletModalOpen}
        onClose={handleWalletClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={style} component="form" validate="true" autoComplete="off">
          <Grid container spacing={2}>
            <Grid item size={{ xs: 12, sm: 6, md: 6 }}>
              <TextField
                id="filled-basic"
                label="Price"
                variant="filled"
                size="small"
                name="price"
                fullWidth
                value={formData.price}
                onChange={handleChange}
                type="number"
                error={!!errors.price}
                helperText={errors.price}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 3, md: 3 }}>
              <Button
                fullWidth
                sx={{
                  backgroundColor: "#F4BB4A",
                  color: "#FFFFFF",
                  boxShadow: "0px 4px 4px 0px #00000040",
                }}
                type="submit"
                onClick={handleSubmit}
              >
                Add Balance
              </Button>
            </Grid>
            <Grid item size={{ xs: 12, sm: 3, md: 3 }}>
              <Button
                fullWidth
                sx={{
                  backgroundColor:
                    "linear-gradient(0deg, #D9D9D9, #D9D9D9), linear-gradient(0deg, #D9D9D9, #D9D9D9), linear-gradient(0deg, #E3E3E3, #E3E3E3)",
                  color: "#000000",
                  boxShadow: "0px 4px 4px 0px #00000040",
                }}
                onClick={handleWalletClose}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
