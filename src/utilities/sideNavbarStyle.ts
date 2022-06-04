import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export const styleItem = {
  cursor: "pointer",
  textTransform: "upperCase",
  width: "90%",
  padding: "10px",
  marginTop: "1px !important",
  border: "none 1important",
  borderRadius: "0px",
  color: "white",
  boxShadow: "0px 0px 0px",
  background: "transparent",
  position: "relative",
  zIndex: "5",
  "&:before": {
    content: `''`,
    position: "absolute",
    left: "0",
    backgroundColor: "primary.main",
    width: "0",
    top: "0",
    bottom: "0",
    transition: "2s ease-in-out all",
    opacity: ".4",
  },
  "&:hover:before": {
    width: "100%",
  },
};
export const styleLink: React.CSSProperties = {
  position: "relative",
  zIndex: 4,
  color: "white",
  fontSize: "1.4rem",
  fontWeight: "900",
  width: "100%",
};

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
