import React, { useState } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import commerce from "../../../lib/commerce";
import useStyles from "./styles";
import AdressForm from "../AdressForm";
import PaymentForm from "../PaymentForm";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const steps = ["Adresse de livraison", "Details de payments"];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();
  console.log(checkoutToken);

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });

        setCheckoutToken(token);
      } catch (error) {}
    };
    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  let Confirmation = () => order.customer ? (
    <>
      <div>
        <Typography variant="h5">
          Merci beaucoup pour votre achat, {order.customer.firstname} {order.customer.lastname}
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Ref commande: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} to="/" variant="outined" type="button">Retour à l'accueil</Button>
    </>
  ):(
      <div className={classes.spinner}>
          <CircularProgress />
      </div>
  );
  if(error) {
     return  <>
      <Typography variant="h5">Erreur: {error}</Typography>
      <br />
      <Button component={Link} to="/" variant="outined" type="button">Retour à l'accueil</Button>
      </>
  }

  

  const Form = () =>
    activeStep === 0 ? (
      <AdressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        nextStep={nextStep}
      />
    );

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Passer commande
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : checkoutToken ? (
            <Form />
          ) : (
            <CircularProgress />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
