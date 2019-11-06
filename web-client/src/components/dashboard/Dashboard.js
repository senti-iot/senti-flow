import React from "react";
import Grid from "@material-ui/core/Grid";

export default function Dashboard() {
  return (
    <Grid container xl={12}>
      <Grid Item style={{ background: "#CCC" }} xl={7}>
        Map
        <br />
        asdasd
      </Grid>
      <Grid Item style={{ background: "red" }} xl={2}>
        Filter
      </Grid>
      <Grid Item style={{ background: "green" }} xl={3}>
        Status
      </Grid>
    </Grid>
  );
}
