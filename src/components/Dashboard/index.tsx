import { Summary } from '../summary'
import { TransactionTable } from '../TransactionsTable'
import { Container} from './styles'

export function Dashboard(){
    return(
        <Container>
            <Summary/>
            <TransactionTable/>
        </Container>
    );
}