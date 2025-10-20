import React, { Fragment, useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Graph from "./Graph";
import ExpenseModal from "./ExpenseModal";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";

const Home = () => {
  const [walletBalance, setWalletBalance] = useState(
    JSON.parse(localStorage.getItem("walletBalance")) || 5000
  );
  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  );
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [open, setOpen] = useState(false);

  const [categoryPercentages, setCategoryPercentages] = useState({});

  const handleOpen = () => {
    console.log("Opening modal");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const calculateCategoryPercentages = (expenses) => {
    if (!expenses?.length) {
      return { food: 0, travel: 0, entertainment: 0 };
    }

    const categoryCounts = { food: 0, travel: 0, entertainment: 0 };
    let totalCount = 0;

    // Single pass: count and track total
    for (const { category } of expenses) {
      if (categoryCounts.hasOwnProperty(category)) {
        categoryCounts[category]++;
        totalCount++;
      }
    }

    // Compute percentages in one more pass
    const factor = totalCount === 0 ? 0 : 100 / totalCount;
    for (const key in categoryCounts) {
      categoryCounts[key] = +(categoryCounts[key] * factor).toFixed(2);
    }

    return categoryCounts;
  };

  useEffect(() => {
    const total = expenses.reduce(
      (acc, expense) => acc + Number(expense.price),
      0
    );
    setExpenseTotal(total);
    setCategoryPercentages(calculateCategoryPercentages(expenses));
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Persist wallet balance to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("walletBalance", walletBalance.toString());
  }, [walletBalance]);

  // xs=12 applies at 0px–599px

  // sm=8/4 applies at ≥600px–899px

  // md=8/4 applies at ≥900px

  return (
    <>
      <h1>Expense Tracker</h1>
      <Grid
        container
        spacing={2}
        sx={{
          border: "1px solid black",
          m: 2,
          p: { xs: 1, md: 2 },
          backgroundColor: "#626262",
        }}
        alignItems="stretch"
      >
        <Grid item xs={12} sm={4} md={4} sx={{ display: "flex" }}>
          <Box
            sx={{
              border: "1px solid black",
              backgroundColor: "#9B9B9B",
              borderColor: "#9B9B9B",
              p: 2,
              borderRadius: "15px",
              boxShadow: "0px 4px 4px 0px #00000040",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h3>
              <span style={{ color: "#FFFFFF" }}>Wallet Balance: </span>
              <span style={{ color: "#9DFF5B" }}>₹{walletBalance}</span>
            </h3>
            <Button
              sx={{
                background: "linear-gradient(90deg, #B5DC52 0%, #89E148 100%)",
                borderRadius: "15px",
                fontSize: "16px",
                color: "white",
              }}
            >
              + Add Income
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={4} md={4} sx={{ display: "flex" }}>
          <Box
            sx={{
              border: "1px solid black",
              backgroundColor: "#9B9B9B",
              borderColor: "#9B9B9B",
              p: 2,
              borderRadius: "15px",
              boxShadow: "0px 4px 4px 0px #00000040",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h3>
              <span style={{ color: "#FFFFFF" }}>Expenses: </span>
              <span style={{ color: "#9DFF5B" }}>₹{expenseTotal}</span>
            </h3>
            <Button
              sx={{
                background: "linear-gradient(90deg, #B5DC52 0%, #89E148 100%)",
                borderRadius: "15px",
                fontSize: "16px",
                color: "white",
              }}
              onClick={handleOpen}
            >
              + Add Expense
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={4} md={4} sx={{ display: "flex" }}>
          <Box
            sx={{
              minHeight: "199px",
              width: "199px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Graph categoryPercentages={categoryPercentages} />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ m: 2, border: "1px solid black" }}>
        <Grid
          item
          size={{ xs: 12, sm: 8, md: 8 }}
          style={{
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box>Recent Transactions</Box>
          <Box>
            {expenses.map((expense, index) => (
              <Fragment key={index}>
                <Grid
                  container
                  spacing={0}
                  sx={{ alignItems: "center", mt: 2 }}
                >
                  <Grid item size={{ xs: 2, sm: 2, md: 2 }}>
                    <Box onClick={() => console.log("Icon clicked")}>
                      <LocalPizzaIcon />
                    </Box>
                  </Grid>
                  <Grid item size={{ xs: 4, sm: 4, md: 4 }}>
                    <Box>
                      <Grid container spacing={1}>
                        <Grid item size={{ xs: 12, sm: 12, md: 12 }}>
                          <Box>{expense.title}</Box>
                        </Grid>
                        <Grid item size={{ xs: 12, sm: 12, md: 12 }}>
                          <Box>{expense.date}</Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item size={{ xs: 2, sm: 2, md: 2 }}>
                    <Box>₹{expense.price}</Box>
                  </Grid>
                  <Grid item size={{ xs: 2, sm: 2, md: 2 }}>
                    <Box>
                      <CancelIcon sx={{ cursor: "pointer" }} />
                    </Box>
                  </Grid>
                  <Grid item size={{ xs: 2, sm: 2, md: 2 }}>
                    <Box>
                      <EditIcon sx={{ cursor: "pointer" }} />
                    </Box>
                  </Grid>
                </Grid>
                <hr width="90%" border="1px" />
              </Fragment>
            ))}
          </Box>
        </Grid>
        <Grid
          item
          size={{ xs: 12, sm: 4, md: 4 }}
          style={{
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>Top Expenses</Box>
          {/* {categoryCounts && ()} */}
          <Grid
            container
            spacing={2}
            sx={{ flexGrow: 1, alignItems: "center", width: "90%" }}
          >
            <Grid item size={{ xs: 12, sm: 12, md: 12 }}>
              <Grid container spacing={1}>
                <Grid
                  item
                  size={{ xs: 4, sm: 4, md: 4 }}
                  sx={{ textAlign: "right" }}
                >
                  Entertainment
                </Grid>
                <Grid item size={{ xs: 8, sm: 8, md: 8 }}>
                  <Box
                    sx={{
                      width: `${categoryPercentages.entertainment || "0"}%`,
                      backgroundColor: "#8784D2",
                      height: "100%",
                      borderBottomRightRadius: "20px",
                      borderTopRightRadius: "20px",
                    }}
                  ></Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item size={{ xs: 12, sm: 12, md: 12 }}>
              <Grid container spacing={1}>
                <Grid
                  item
                  size={{ xs: 4, sm: 4, md: 4 }}
                  sx={{ textAlign: "right" }}
                >
                  Food
                </Grid>
                <Grid item size={{ xs: 8, sm: 8, md: 8 }}>
                  <Box
                    sx={{
                      width: `${categoryPercentages.food || "0"}%`,
                      backgroundColor: "#8784D2",
                      height: "100%",
                      borderBottomRightRadius: "20px",
                      borderTopRightRadius: "20px",
                    }}
                  ></Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item size={{ xs: 12, sm: 12, md: 12 }}>
              <Grid container spacing={1}>
                <Grid
                  item
                  size={{ xs: 4, sm: 4, md: 4 }}
                  sx={{ textAlign: "right" }}
                >
                  Travel
                </Grid>
                <Grid item size={{ xs: 8, sm: 8, md: 8 }}>
                  <Box
                    sx={{
                      width: `${categoryPercentages.travel || "0"}%`,
                      backgroundColor: "#8784D2",
                      height: "100%",
                      borderBottomRightRadius: "20px",
                      borderTopRightRadius: "20px",
                    }}
                  ></Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <ExpenseModal
        open={open}
        handleClose={handleClose}
        setExpenses={setExpenses}
        setWalletBalance={setWalletBalance}
      />
    </>
  );
};

export default Home;
