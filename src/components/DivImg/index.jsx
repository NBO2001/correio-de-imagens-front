import { AlertD } from './style'

const DivImg = ({srcs,children}) => {
    return(
        <AlertD src={srcs}>
            {children}
        </AlertD>
    )
}

export default DivImg