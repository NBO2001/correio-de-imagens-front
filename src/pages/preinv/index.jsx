import { useState, useEffect } from 'react'

import { Button, TextField, Alert, CircularProgress, AlertTitle, Grid, CardMedia } from '@mui/material'

import { ToastContainer } from 'react-toastify'

import { BodyPage, Conteinner, FormC, Modal, DivAlert, ConteinnerPre, DivImg, DivForm } from './../../components'

import { notify, addBox, substBox } from '../../utils'

import api from './../../config'

const Preinv = () => {
    
    const [modalOpened, setModalOpened] = useState(false);
    const [ contBoxs, setContBoxs ] = useState(0)
    const [ idImg, setIdImg ] = useState(1)


    const get_box_info = (id_img) => {

       
       api.get('/imginfo/'+id_img)
        .then(({data}) => {
            
            if(!data.Error){
                setIdImg(id_img)
                setContBoxs(data.box)
                
            }else{
                setModalOpened(false)
                notify('Error', "Erro initerno")
            }
        })
        .catch((err) => {
            console.log(err)
        }
        )
        
    }
    const addV = () => {
        
        get_box_info(idImg + 1)
    }

    const rmV = () => {
        if ( idImg > 1) {
            
            get_box_info(idImg - 1)
        }
    }  
    return (
        <>
        <BodyPage>
            <ToastContainer/>
            <Conteinner>
                <FormC fullWidth >
                    <ConteinnerPre>
                        <DivImg srcs={process.env.REACT_APP_HOST + "/imgs/" + idImg} alt="" srcset="" />
                        <DivForm>
                            <Grid container spacing={2} columns={16}>
                                <Grid item xs={5}>
                                    <TextField 
                                    size={"medium"} 
                                    fullWidth 
                                    id="clien" 
                                    name="clien_nun" 
                                    label="Cliente" 
                                    variant="outlined" 
                                    />
                                </Grid>

                                <Grid item xs={5}>
                                    <TextField 
                                    size={"medium"} 
                                    fullWidth 
                                    id="setor" 
                                    name="setor_name" 
                                    label="Setor" 
                                    variant="outlined" 
                                    />
                                </Grid>

                                <Grid item xs={5}>
                                    { contBoxs && (
                                    <TextField 
                                    size={"medium"} 
                                    fullWidth 
                                    id="boxnumber" 
                                    name="boxnumber" 
                                    value={contBoxs} 
                                    label="Box" 
                                    variant="outlined" 
                                    />)}


                                </Grid>
                                
                            </Grid>

                            <Grid container spacing={0} columns={10}>
                                <TextField 
                                    size={"medium"} 
                                    fullWidth 
                                    id="describe" 
                                    name="describe_name" 
                                    label="Descrição" 
                                    variant="outlined" 
                                />
                            </Grid>

                            <Grid container spacing={2} columns={10}>
                                <Grid item xs={5}>
                                    <TextField 
                                        size={"medium"} 
                                        fullWidth 
                                        id="key_one" 
                                        name="key_one_name" 
                                        label="Chave A" 
                                        variant="outlined" 
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField 
                                            size={"medium"} 
                                            fullWidth 
                                            id="key_two" 
                                            name="key_two_name" 
                                            label="Chave B" 
                                            variant="outlined" 
                                        />
                                </Grid>
                            </Grid>
                            
                            <Grid container spacing={2} columns={10}>
                                <Grid item xs={5}>

                                    <TextField 
                                        size={"medium"} 
                                        fullWidth 
                                        id="data_val" 
                                        name="data_name" 
                                        label="Data" 
                                        variant="outlined" 
                                    />
                                </Grid>
                                <Grid item xs={5}></Grid>
                            </Grid>

                            <Grid container spacing={2} columns={10}>
                                <Grid item xs={5}>
                                
                                    <Button size={"small"} variant="contained" fullWidth>Adicionar Informações</Button>
                                    
                                </Grid>
                                <Grid item xs={5}>
                                
                                    <Button size={"small"} variant="contained" fullWidth color="success" >Gerar Excel</Button>
                                
                                </Grid>
                            </Grid>
                            
                        </DivForm>
                    </ConteinnerPre>
                  
                        
                    <Grid container spacing={3} columns={16}>
                       
                        <Grid item xs={6}>
                            
                            { idImg && (
                            <TextField 
                            size={"small"} 
                            fullWidth 
                            id="img_id" 
                            name="imgid" 
                            value={idImg} 
                            label="id imagen" 
                            variant="outlined" 
                            />)}

                        </Grid>
                        <Grid item xs={5}>
                            
                            <Button size={"medium"} variant="contained" fullWidth onClick={rmV}>Caixa Anterior</Button>
                            
                        </Grid>
                        <Grid item xs={5}>
                            
                            <Button size={"medium"} variant="contained" fullWidth onClick={addV}>Proxima Caixa</Button>

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

export default Preinv
