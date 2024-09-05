"use client";

import ModifyTpForm from "@/views/apps/contact/modify/form";
import FormLayoutsCollapsible from "@/views/forms/form-layouts/FormLayoutsCollapsible";
import { useTheme } from "@emotion/react";
import { Grid, Typography } from "@mui/material";

const ModifyThirdpartyPage = () => {

    const theme = useTheme()

  const headingStyle = {
    display: 'flex',
    alignItems: 'center'
  }

  const iconStyle = {
    fontSize: 34, // Adjust size as needed
    marginRight: 16, // Margin between icon and text
    color: theme.palette.primary.main // Primary color for the icon
  }

  const textStyle = {
    fontWeight: 'bold',
    fontSize: '2rem', // Adjust size as needed
    color: theme.palette.primary.main // Primary color for the text
  }


    return (
        <Grid container spacing={6}>
            {/* <Grid item xs={12} display={"flex"}>
                <i style={{color: 'var(--mui-palette-primary-main)'}} className="ri-contacts-line" />
                <Typography variant='h4' style={{color: 'var(--mui-palette-primary-main)'}}>Modify contact</Typography>
            </Grid> */}
            <Grid item xs={12}>
          <div style={headingStyle}>
            <i className='ri-contacts-line' style={iconStyle}></i>
            <Typography style={textStyle}>Modify Contact</Typography>
          </div>
        </Grid>
            <Grid item xs={12}>
                <ModifyTpForm />
            </Grid>
        </Grid>
    );
}

export default ModifyThirdpartyPage;