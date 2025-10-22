import React, { useState, useEffect } from "react";
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

export default function ExpenseModal({
  expenseModalOpen,
  handleExpenseClose,
  setExpenses,
  setWalletBalance,
  expenseIndex,
  expenses,
}) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    if (expenseIndex !== null && expenseIndex !== undefined) {
      const expenseToEdit = expenses[expenseIndex];
      if (expenseToEdit) {
        setFormData({
          title: expenseToEdit.title || "",
          price: expenseToEdit.price || "",
          category: expenseToEdit.category || "",
          date: expenseToEdit.date || "",
        });
      }
    } else {
      clearForm();
    }
  }, [expenseIndex, expenses]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let temp = {};
    temp.title = formData.title ? "" : "This field is required.";
    temp.price = formData.price ? "" : "This field is required.";
    temp.category = formData.category ? "" : "This field is required.";
    temp.date = formData.date ? "" : "This field is required.";
    setErrors({ ...temp });
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
    if (!validateForm()) {
      console.log("Form not submitted");
      return;
    }

    if (expenseIndex !== null && expenseIndex !== undefined) {
      // Edit existing expense
      setExpenses((prevExpenses) => {
        const updatedExpenses = [...prevExpenses];
        updatedExpenses[expenseIndex] = formData;
        return updatedExpenses;
      });
      clearForm();
      handleExpenseClose();
      return;
    }

    // Add new expense
    setExpenses((prevExpenses) => [...prevExpenses, formData]);

    // Deduct from wallet balance
    setWalletBalance((prev) => prev - Number(formData.price));

    clearForm();
    handleExpenseClose();
  };

  return (
    <Modal
      open={expenseModalOpen}
      onClose={handleExpenseClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={style} component="form" autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label="Title"
              variant="filled"
              size="small"
              fullWidth
              name="title"
              value={formData.title}
              type="text"
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label="Price"
              variant="filled"
              size="small"
              fullWidth
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
              error={!!errors.price}
              helperText={errors.price}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label="Category"
              variant="filled"
              size="small"
              fullWidth
              name="category"
              value={formData.category}
              onChange={handleChange}
              type="text"
              error={!!errors.category}
              helperText={errors.category}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label="dd/mm/yyyy"
              variant="filled"
              size="small"
              fullWidth
              name="date"
              value={formData.date}
              onChange={handleChange}
              type="text"
              error={!!errors.date}
              helperText={errors.date}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ justifyContent: "space-around", mt: 2 }}>
          <Grid item xs={12} sm={6} md={6}>
            <Button
              fullWidth
              type="submit"
              sx={{
                backgroundColor: "#F4BB4A",
                color: "#FFFFFF",
                boxShadow: "0px 4px 4px 0px #00000040",
              }}
            >
              Add Expense
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Button
              fullWidth
              sx={{
                backgroundColor:
                  "linear-gradient(0deg, #D9D9D9, #D9D9D9), linear-gradient(0deg, #D9D9D9, #D9D9D9), linear-gradient(0deg, #E3E3E3, #E3E3E3)",
                color: "#000000",
                boxShadow: "0px 4px 4px 0px #00000040",
              }}
              onClick={handleExpenseClose}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
