import { Form } from "./style";

const FormC = ({children, ...props}) => {

    return(
        <Form {...props}>
            {children}
        </Form>
    )
}

export default FormC