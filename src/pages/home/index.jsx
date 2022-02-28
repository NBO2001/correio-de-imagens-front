import { BodyPage, Conteinner, FormC } from './../../components'

import { InputBase, Button, TextField } from '@mui/material'

import { useState, useEffect } from 'react'

import { ToastContainer } from 'react-toastify'
import { notify } from '../../utils'

import api from './../../config'

const Home = () => {
    const [ contBoxs, setContBoxs ] = useState(0)
    const [ ultBox, setUltBox ] = useState("1.1")

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

    const subst = () => {
        const inputValue = document.querySelector("[id='boxnumber']")
        const values_spli = (inputValue.value).split('.')
        
        if(values_spli.length === 2){
            
            if (values_spli[1] > 1){
                
                const nextBox = parseInt(values_spli[1]) - 1
                inputValue.value = `${values_spli[0]}.${nextBox}`
            } 
            else if(values_spli[1] <= 1){

                const nextUep = parseInt(values_spli[0]) - 1
                inputValue.value = `${nextUep}.3`
            }
        }
    }
    const add = () => {
        
        const inputValue = document.querySelector("[id='boxnumber']")

        const values_spli = (inputValue.value).split('.')

        if(values_spli.length === 2){
            
            if(values_spli[1] >= 3){

                const nextUep = parseInt(values_spli[0]) + 1
                inputValue.value = `${nextUep}.1`
            }
            
            else if (values_spli[1] < 3){
                
                const nextBox = parseInt(values_spli[1]) + 1
                inputValue.value = `${values_spli[0]}.${nextBox}`
            }
        }

    }

    const sendBack = (e) => {
        e.preventDefault()
        const boxNumber = document.querySelector("[id='boxnumber']").value

        const formData = new FormData();
        
        formData.append('File', e.target.files[0]);
        formData.append('Path', boxNumber);
        
        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
       }

       api.post('/upimg', formData, headers)
        .then(({data}) => {
            
            if(!data.Error){
                notify('Success', "Imagem adicionada com sucesso!!")
                setContBoxs(data.boxs)
                setUltBox(data.endboxs)
            }else{
                notify('Error', "Imagem não adicionada com sucesso!!")
            }
        })
        .catch((err) => notify('Error', "Ocorreu um error inesperado"))
        
    }

    return (
        <BodyPage>
            <ToastContainer/>
            <Conteinner>
                <FormC fullWidth >
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
                    <TextField size={"medium"} fullWidth id="boxnumber" name="boxnumber" defaultValue={'1.1'} value={ultBox}  label="Box" variant="outlined" />
                    <InputBase size={"medium"} fullWidth type="file" name="boxs" accept="image/*" capture="camera" onChange={sendBack} />
                    <Button fullWidth size={"medium"} variant="contained" onClick={add}>Proxima Caixa</Button>
                    <Button fullWidth size={"medium"} variant="contained" onClick={subst}>Caixa Anterior</Button>
                </FormC>
            </Conteinner>
        </BodyPage>
    )
}

export default Home