import { BodyPage, Conteinner, FormC } from './../../components'

import { InputBase, Button, TextField } from '@mui/material';
const Home = () => {

    return (
        <BodyPage>
            <Conteinner>
                <FormC fullWidth >
                    <TextField
                    fullWidth
                    id="filled-read-only-input"
                    label="Quantidade de Caixas"
                    defaultValue="2541"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    />
                    <TextField size={"medium"} fullWidth id="box" label="Box" variant="outlined" />
                    <InputBase size={"medium"} fullWidth type="file" name="boxs" accept="image/*" capture="camera"  />
                    <Button fullWidth size={"medium"} variant="contained">Proxima caixa</Button>
                </FormC>
            </Conteinner>
        </BodyPage>
    )
}

export default Home