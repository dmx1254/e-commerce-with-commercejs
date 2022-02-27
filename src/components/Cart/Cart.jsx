import React, { useState } from "react";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import useStyles from "./styles";
import { CircularProgress } from "@material-ui/core";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";

const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  // const [playOnce, setPlayOnce] = useState(false);
  // console.log(cart);
  const classes = useStyles();
  // const isEmpty =
  //   cart.line_items !== undefined || null || ""
  //     ? !cart.line_items.length
  //     : null;

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      Vous n'avez pas d'articles dans votre panier,
      <br />
      <Link to="/" className={classes.link}>
        Ajouter à votre panier
      </Link>
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              onUpdateCart={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Total: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            onClick={(handleEmptyCart)}
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
          >
            Vider le panier
          </Button>
          <Button
            component={Link}
            to="/checkout"
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Passer Commande
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toobar} />
      <Typography variant="h4" className={classes.title} gutterBottom>
        Ton Panier
      </Typography>

      {!cart.line_items ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
