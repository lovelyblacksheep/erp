import AddTpForm from "@/views/apps/member/bom/add/form";
import ModifyTpForm from "@/views/apps/contact/modify/form";
import FormLayoutsCollapsible from "@/views/forms/form-layouts/FormLayoutsCollapsible";
import { Grid, Typography } from "@mui/material";
import AddMOForm from "@/views/apps/member/mo/add/page";

const ModifyThirdpartyPage = () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Typography variant='h5'>Add Bill Of Material</Typography>
            </Grid>
            <Grid item xs={12}>
                {/* <AddTpForm /> */}
                <AddMOForm />
            </Grid>
        </Grid>
    );
}

export default ModifyThirdpartyPage;