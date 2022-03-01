const substBox = () => {
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

export default substBox