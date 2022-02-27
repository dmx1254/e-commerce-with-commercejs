import React, { useEffect, useState } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

import commerce from "../../lib/commerce";

import FormInput from "./CustomTextField";

const AdressForm = ({ checkoutToken, next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const methods = useForm();
  //   const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}))
  const subdivisions = Object.entries(
    shippingSubdivisions
  ).map(([code, name]) => ({ id: code, label: name }));

  const options = shippingOptions.map((sO) => ({
    id: sO.id,
    label: `${sO.description} - ${sO.price.formatted_with_symbol}`,
  }));
  console.log(shippingOptions);

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    console.log(countries);
    setShippingCountries(
      Object.keys(countries).map((i) => ({ id: i, country: countries[i] }))
    );
    setShippingCountry(Object.keys(countries)[6]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );
    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Adresse de livraison
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) =>next({ ...data, shippingSubdivision, shippingCountry, shippingOption}))}>
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="Prenom" />
            <FormInput required name="lastName" label="Nom" />
            <FormInput required name="adress1" label="Adresse" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="Ville" />
            <FormInput name="zip" label="Code postal" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Pays de d'éxpédition</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {shippingCountries.map(({ id, country }) => (
                  <MenuItem key={id} value={id}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Ville d'éxpédition</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Prix de livraison</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{display: "flex", justifyContent: "space-between"}}>
                <Button component={Link} to="/cart" variant="outlined">Retour au panier</Button>
                <Button type="submit" variant="contained" color="primary">Suivant</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AdressForm;
