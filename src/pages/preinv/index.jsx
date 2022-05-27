import { useState, useEffect } from 'react'

import { Button, TextField, Alert, CircularProgress, AlertTitle, Grid } from '@mui/material'

import { ToastContainer } from 'react-toastify'

import { BodyPage, Conteinner, FormC, Modal, DivAlert, ConteinnerPre, DivImg, DivForm } from './../../components'

import { notify } from '../../utils'

import api from './../../config'

const Preinv = () => {
    
    const [modalOpened, setModalOpened] = useState(false)
    const [previn, setPrevin ] = useState({})
    const [ contBoxs, setContBoxs ] = useState(0)
    const [ idImg, setIdImg ] = useState(1)

    useEffect( () => {
        get_box_info(1)
    }, [])

    const get_box_info = (id_img) => {

       
       api.get('/imginfo/'+id_img)
        .then(({data}) => {
            
            if(!data.Error){
                setIdImg(id_img)
                setPrevin({ ...previn, 'index': data.box })
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

    const addInfo = (e) => {
        e.preventDefault()
        
        setPrevin({ ...previn, [e.target.name]: e.target.value })
        
    }

    const addV = () => {
        
        get_box_info(idImg + 1)
    }

    const rmV = () => {
        if ( idImg > 1) {
            
            get_box_info(idImg - 1)
        }
    }  

    const gerarPlan = (e) => {

        e.preventDefault()
        api.get('/table')
        .then(({data}) => {
            
            if(!data.Error){
                
                notify('Success', "Planilha gerada com sucesso")
                
            }else{
                setModalOpened(false)
                notify('Error', "Erro interno")
            }
        })
        .catch((err) => {
            console.log(err)
        }
        )

    }

    const sendBack = (e) => {
        e.preventDefault()
        
        const formData = new FormData();
        
        const keys = Object.keys(previn);

        for (let i=0; i < keys.length; i++){
            formData.append(keys[i], previn[keys[i]]);
            
        }
        
        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
       }
       setModalOpened(true)
       api.post('/addinfobox', formData, headers)
        .then(({data}) => {
            
            if(!data.Error){
                setModalOpened(false)
                notify('Success', "Linha adicionada!!")
               
            }else{
                setModalOpened(false)
                notify('Error', "Linha NÂO adicionada!!")
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
                    <ConteinnerPre>
                        <DivImg srcs={process.env.REACT_APP_HOST + "/imgs/" + idImg} alt="" srcset="" />
                        <DivForm>
                            <Grid container spacing={2} columns={16}>
                                <Grid item xs={5}>
                                    <TextField 
                                    size={"medium"} 
                                    fullWidth 
                                    onChange={addInfo}
                                    id="clien" 
                                    name="cliente" 
                                    label="Cliente" 
                                    variant="outlined" 
                                    />
                                </Grid>

                                <Grid item xs={5}>
                                    <TextField 
                                    size={"medium"} 
                                    fullWidth 
                                    id="setorid"
                                    onChange={addInfo} 
                                    name="setor" 
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
                                    id="describeid" 
                                    name="descricao" 
                                    onChange={addInfo}
                                    label="Descrição" 
                                    variant="outlined" 
                                />
                            </Grid>

                            <Grid container spacing={2} columns={10}>
                                <Grid item xs={5}>
                                    <TextField 
                                        size={"medium"} 
                                        fullWidth 
                                        id="key_oneid" 
                                        name="key_one" 
                                        onChange={addInfo}
                                        label="Chave A" 
                                        variant="outlined" 
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField 
                                            size={"medium"} 
                                            fullWidth 
                                            id="key_twoid" 
                                            name="key_two" 
                                            onChange={addInfo}
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
                                        name="data" 
                                        onChange={addInfo}
                                        label="Data" 
                                        variant="outlined" 
                                    />
                                </Grid>
                                <Grid item xs={5}></Grid>
                            </Grid>

                            <Grid container spacing={2} columns={10}>
                                <Grid item xs={5}>
                                
                                    <Button size={"small"} variant="contained" onClick={sendBack} fullWidth>Adicionar Informações</Button>
                                    
                                </Grid>
                                <Grid item xs={5}>
                                
                                    <Button size={"small"} variant="contained" onClick={gerarPlan} fullWidth color="success" >Gerar Excel</Button>
                                
                                </Grid>
                            </Grid>
                            
                        </DivForm>
                    </ConteinnerPre>
                  
                        
                    <Grid container spacing={3} columns={16}>
                       
                        <Grid item xs={4}>
                            
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
                        <Grid item xs={6}>
                            
                            <Button size={"medium"} variant="contained" fullWidth onClick={rmV}>Caixa Anterior</Button>
                            
                        </Grid>
                        <Grid item xs={6}>
                            
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
