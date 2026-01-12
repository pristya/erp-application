import { useState } from "react"

const TransactionPage = () => {

    interface transactionItem {
        id: number
        product_id: number
        transaction_id: number
        qty: number
        total: number
        biaya_admin: number
        created_at: Date
    }

    const [transaction, setTransaction] = useState<transactionItem[]>([]);
    const [loading, setLoading] = useState(true);

    
}

export default TransactionPage