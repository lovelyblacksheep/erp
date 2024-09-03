import AddTpForm from "@/views/apps/contact/add/form";
import ModifyTpForm from "@/views/apps/contact/modify/form";
import FormLayoutsCollapsible from "@/views/forms/form-layouts/FormLayoutsCollapsible";
import { Grid, Typography } from "@mui/material";

const ModifyThirdpartyPage = () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Typography variant='h5'>Add contact</Typography>
            </Grid>
            <Grid item xs={12}>
                <AddTpForm />
            </Grid>
        </Grid>
    );
}

export default ModifyThirdpartyPage;