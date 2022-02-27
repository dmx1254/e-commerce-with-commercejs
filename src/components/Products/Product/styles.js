import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    maxWidth: "100%",
    height: "350px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  desc:{
    width: "100%",
    fontSize: "12px"

  },
  productTitle:{
    fontSize: "20px",
  },
  symbol:{
    fontSize: "20px",
  }
}));
