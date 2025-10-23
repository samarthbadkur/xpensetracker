import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

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

export default function WalletModal({ walletModalOpen, handleWalletClose, setWalletBalance }) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    price: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let temp = {};
    temp.price = formData.price ? "" : "This field is required.";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const clearForm = () => {
    setFormData({ price: "" });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setWalletBalance((prev) => prev + Number(formData.price));
      clearForm();
      handleWalletClose();
    }
  };

  return (
    <Modal
      open={walletModalOpen}
      onClose={handleWalletClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={style}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}       
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Income Amount"
              placeholder="Income Amount"
              variant="outlined"        
              size="small"
              name="price"
              fullWidth
              value={formData.price}
              onChange={handleChange}
              type="number"
              error={!!errors.price}
              helperText={errors.price}
              inputProps={{ 'data-cy': 'income-input' }}
            />
          </Grid>

          <Grid item xs={6}>
            <Button
              type="submit"
              fullWidth
              sx={{
                backgroundColor: "#F4BB4A",
                color: "#FFFFFF",
                boxShadow: "0px 4px 4px 0px #00000040",
              }}
            >
              Add Balance
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              fullWidth
              onClick={handleWalletClose}
              sx={{
                backgroundColor:
                  "linear-gradient(0deg, #D9D9D9, #D9D9D9), linear-gradient(0deg, #D9D9D9, #D9D9D9), linear-gradient(0deg, #E3E3E3, #E3E3E3)",
                color: "#000000",
                boxShadow: "0px 4px 4px 0px #00000040",
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
