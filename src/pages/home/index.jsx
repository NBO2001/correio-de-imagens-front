import { useState, useEffect } from 'react'

import { Button, TextField, Alert, CircularProgress, AlertTitle, Grid } from '@mui/material'

import { ToastContainer } from 'react-toastify'

import { BodyPage, Conteinner, FormC, Modal, DivAlert, InputFile } from './../../components'

import { notify, addBox, substBox } from '../../utils'

import api from './../../config'


const Home = () => {

    const [modalOpened, setModalOpened] = useState(false);
    const [ contBoxs, setContBoxs ] = useState(0)
    const [ ultBox, setUltBox ] = useState()

    useEffect( () => {
        
        api.get('/upimg')
        .then(({data}) => {
            
            if(!data.Error){
                setContBoxs(data.boxs)
                setUltBox(data.endboxs)
            }else{
                notify('Error', "Erro interno!")
            }
        })
        .catch((err) => notify('Error', "Ocorreu um error inesperado"))
    
    }, [] )
    

    const sendBack = (e) => {
        e.preventDefault()
        const boxNumber = document.querySelector("[id='boxnumber']").value

        const formData = new FormData();
        if (!((e.target.files[0]).length) && !(boxNumber.length)){
            return false
        }
        formData.append('File', e.target.files[0]);
        formData.append('Path', boxNumber);
        
        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
       }
       setModalOpened(true)
       api.post('/upimg', formData, headers)
        .then(({data}) => {
            
            if(!data.Error){
                setModalOpened(false)
                notify('Success', "Imagem adicionada com sucesso!!")
                setContBoxs(data.boxs)
                setUltBox(data.endboxs)
            }else{
                setModalOpened(false)
                notify('Error', "Imagem não adicionada com sucesso!!")
            }
        })
        .catch((err) => {
            setModalOpened(false)
            notify('Error', "Ocorreu um error inesperado")}
        )
        
    }

    return (
        <>
        <BodyPage>
            <ToastContainer/>
            <Conteinner>
                <FormC fullWidth >
                    <Grid container spacing={2} columns={16}>

                        <Grid item xs={8}>
                            
                            { ultBox && (
                            <TextField 
                            size={"medium"} 
                            fullWidth 
                            id="boxnumber" 
                            name="boxnumber" 
                            defaultValue={ultBox} 
                            label="Box" 
                            variant="outlined" 
                            />)}

                        </Grid>

                        <Grid item xs={8}>

                            <TextField
                            fullWidth
                            id="filled-read-only-input"
                            label="Quantidade de Caixas"
                            defaultValue="0"
                            value={contBoxs}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                            />

                        </Grid>
                        
                    </Grid>
         
                    <label htmlFor="contained-button-file">

                        <InputFile
                        accept="image/*" 
                        id="contained-button-file" 
                        capture="camera" 
                        type="file"
                        onChange={sendBack} />

                        <Button color={"warning"} size={"large"} variant="contained" fullWidth component="span" >
                            Capturar Imagen
                        </Button>
                    </label>
                    <Grid container spacing={2} columns={16}>
                        <Grid item xs={8}>
                            
                            <Button size={"medium"} variant="contained" fullWidth onClick={substBox}>Caixa Anterior</Button>
                            
                        </Grid>
                        <Grid item xs={8}>
                            
                            <Button size={"medium"} variant="contained" fullWidth onClick={addBox}>Proxima Caixa</Button>

                        </Grid>
                    </Grid>
                </FormC>
            </Conteinner>
        </BodyPage>

        <Modal open={modalOpened} onClose={() => setModalOpened(!modalOpened)}>
            <DivAlert>

                <Alert severity="warning">
                    <AlertTitle>Alerta</AlertTitle>
                    Enviando, aguarde ... <CircularProgress color="success" />
                </Alert>
                
            </DivAlert>
           
        </Modal>
        </>
    )
}

export default Home