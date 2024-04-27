export default function formatAmount(amount) {
    if (amount % 1 === 0) {
        return amount.toString();
    } else {
        return amount.toFixed(2); 
    }
}